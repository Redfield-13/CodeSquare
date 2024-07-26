import { Post } from "../types";

export interface PostDao {
    listPosts(): Post[]; 
    cratePost(post : Post): void;
    getPost(id:string): Post | undefined;
    deletePost(id:string):void;
}