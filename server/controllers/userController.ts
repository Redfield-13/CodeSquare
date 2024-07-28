import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from "../api";
import { signJwt } from "../auth";
import { db } from "../datastore";
import { User } from "../types";
import { ExpressHandler } from "./postController";
import crypto from 'crypto';

const salt = process.env.PASSWORD_SALT!

export const signUpController: ExpressHandler<SignUpRequest, SignUpResponse> = async (req, res) => {
    const { firstName, lastName, username, password, email } = req.body;
    console.log(req.body);
    if(!username || !password || !email || !firstName || !lastName) {
        
        return res.status(400).json({ message: 'Username, password and email are required' });
    }
    const existing = await db.getUserByEmail(email) || await db.getUserByUsername(username);
    if(existing) {
        
        return res.status(400).json({ message: 'User already exists' });
    }
    
    const passwordHash = crypto.pbkdf2Sync(password, salt, 42, 64, 'sha512').toString('hex');

    const user: User = {
        id: crypto.randomUUID(),
        firstName,
        lastName,
        username,
        password: passwordHash,
        email
    }
    await db.createUser(user);
    
    return res.status(201).json({  jwt: signJwt({userId: user.id}) });
}

export const signinController: ExpressHandler<SignInRequest, SignInResponse> = async (req, res) => {
    const { login, password } = req.body;
   
    if(!login || !password) {
        return res.sendStatus(400).send({message:"Username and password are required"})
    }
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 42, 64, 'sha512').toString('hex');
    const existing = await db.getUserByUsername(login) || await db.getUserByEmail(login);
    if(!existing) {
        return res.sendStatus(400).send({message:"User not found"})
    }
    if(existing.password !== hashedPassword) {
        return res.sendStatus(401).send({message:"Invalid password"})
    }
    return res.status(200).json({ 
       user: { firstName: existing.firstName,
        lastName: existing.lastName,
        username: existing.username,
        email: existing.email,
        id: existing.id
    },
        jwt: signJwt({userId: existing.id})
     });
}