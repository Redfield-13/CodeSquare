import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from "../api";
import { db } from "../datastore";
import { User } from "../types";
import { ExpressHandler } from "./postController";
import crypto from 'crypto';

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

    const user: User = {
        id: crypto.randomUUID(),
        firstName,
        lastName,
        username,
        password,
        email
    }
    await db.createUser(user);
    
    return res.status(201).json({ user });
}

export const signinController: ExpressHandler<SignInRequest, SignInResponse> = async (req, res) => {
    const { login, password } = req.body;
    
    if(!login || !password) {
        return res.sendStatus(400)
    }
    const user = await db.getUserByUsername(login) || await db.getUserByEmail(login);
    if(!user) {
        return res.sendStatus(400)
    }
    if(user.password !== password) {
        return res.sendStatus(401)
    }
    return res.status(200).json({ 
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        id: user.id
     });
}