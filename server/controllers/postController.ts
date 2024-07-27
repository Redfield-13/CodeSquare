import { RequestHandler } from 'express';
import {db} from '../datastore'
import { Post } from '../types';
import crypto from 'crypto'
import { CreatePostRequest, CreatePostResponse } from '../api';


export type ExpressHandler<Req, Res> = RequestHandler<
string,
Partial<Res>,
Partial<Req>,
any
>;

export const listPostsContoller: ExpressHandler <{},{}> = (request,response) => {
    response.send({posts : db.listPosts()})
}



export const createPostController: ExpressHandler<CreatePostRequest,CreatePostResponse> = (request,response) =>{
    const body  = request.body
    if(!request.body.title){
        return response.status(400).send("Title field is requires but empty")
    }
    if(!body || !body.url || !body.title){
        response.sendStatus(400)
    }
    const post : Post = {
        id:crypto.randomUUID(),
        postedAt: Date.now(),
        title: request.body.title as string,
        url: body.url as string,
        userId: body.userId as string

    }
    db.cratePost(post)
    response.sendStatus(200);    
}