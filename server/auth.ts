import { JwtObject } from "./types";
import jwt from "jsonwebtoken";

export function signJwt(obj: JwtObject): string{
    const secret = getJwtSecret()
    return jwt.sign(obj,secret,{
        expiresIn: "3000ms",
    });
}

export function verifyJwt(token: string): JwtObject{
    const secret = getJwtSecret()
    return jwt.verify(token,secret) as JwtObject
}

function getJwtSecret(): string{
    const secret = process.env.JWT_SECRET
    if(!secret){
        console.error("JWT_SECRET is not set")
        process.exit(1)
    }
    return secret
}