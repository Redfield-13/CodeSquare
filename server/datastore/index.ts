import { CommentDao } from "./dao/CommentDao";
import { LikeDao } from "./dao/LikeDao";
import { UserDao } from "./dao/UserDao";
import { PostDao } from "./dao/PostDao"
import { InMemoryDataStore } from "./MemoryDb";
import { SqlDataStore } from "./sql";

export interface DataStore extends UserDao, PostDao, CommentDao, LikeDao {}

export let db : DataStore;

export async function initDb() {
    // db = new InMemoryDataStore();
    db = await new SqlDataStore().openDb();
}