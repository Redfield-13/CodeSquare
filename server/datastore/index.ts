import { CommentDao } from "./CommentDao";
import { LikeDao } from "./LikeDao";
import { UserDao } from "./UserDao";
import { PostDao } from "./PostDao"
import { InMemoryDataStore } from "./MemoryDb";

export interface DataStore extends UserDao, PostDao, CommentDao, LikeDao {}

export const db = new InMemoryDataStore