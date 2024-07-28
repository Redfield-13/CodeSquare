import { Post, User } from "./types"

// Post APIs
export interface ListPostRequest {}
export interface ListPostResponse {
    posts : Post[];
}
export type CreatePostRequest = Pick <Post, 'title' | 'url' | 'userId'>
export interface CreatePostResponse {

}

export interface GetPostRequest{}
export interface GetPostResponse {
    post : Post;
}

// Comments APIs

// Like APIs

// Users APIs
export type SignUpRequest = Pick<User, 'firstName'|'lastName' | 'username' | 'password' | 'email'>
export interface SignUpResponse {
   jwt: string,
   message?: string
}


export interface SignInRequest {
    login : string; 
    password : string;
}
export type SignInResponse ={
    user:Pick<User, 'firstName'|'lastName' | 'username'  | 'email' | 'id'>,
    jwt: string,
    message?: string
}
