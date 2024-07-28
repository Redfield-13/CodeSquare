import { verifyJwt } from "../auth";
import { ExpressHandler } from "../controllers/postController";
import { db } from "../datastore";


export const authMiddleware: ExpressHandler  <any,any> = async (req, res, next) => {
    const jwt = req.headers.authorization?.split(' ')[1];
    if(!jwt) {
        return res.sendStatus(401).send({message: "Unauthorized"});
    }
    

    try{
        const payload = verifyJwt(jwt);
        const user = await db.getUserById(payload.userId);
        if(!user) {
            return res.sendStatus(401).send({message: "Unauthorized"});
        }
        next();
    } catch{
        return res.sendStatus(401).send({message: "Bad Token"});
    }
}