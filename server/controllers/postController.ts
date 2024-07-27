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

export const listPostsContoller: ExpressHandler <{},{}> = async (request,response) => {
    response.send({posts :await db.listPosts()})
}



export const createPostController: ExpressHandler<CreatePostRequest,CreatePostResponse> = async (request,response) =>{
    const body  = request.body
    // TODO: Validate user exists
    // TODO: Get user Id from session
    // TODO: Validate title and url are non-empty
    // TODO: Validate url is new, otherwise add +1 to exisitng post.
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
    await db.cratePost(post)
    response.sendStatus(200);    
}