import { Post } from "./types"

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

