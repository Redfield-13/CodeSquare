import {open, Database} from 'sqlite'
import sqlite3 from 'sqlite3';
import path from 'path';

import { DataStore } from "..";
import { User, Post, Comment, Like } from "../../types";

export class SqlDataStore implements DataStore {
    

    private db!: Database<sqlite3.Database, sqlite3.Statement>;

    public async openDb(){
        // open the database
        console.log("frthjrtrt");
        
        this.db = await open({
            filename:path.join(__dirname,'codesquare.sqlite'),
            driver: sqlite3.Database,
        })
        
        this.db.run('PRAGMA foreign_keys = ON');
        await this.db.migrate(
            {
                migrationsPath: path.join(__dirname,'migrations')
            }
        )
        return this;
    }
    async createUser(user: User): Promise<void> {
        await this.db.run('INSERT INTO users (id, firstName, lastName, username, password, email) VALUES (?, ?, ?, ?, ?, ?)', user.id, user.firstName, user.lastName, user.username, user.password, user.email);
    }
    async getUserByEmail(email: string): Promise<User | undefined> {
        return await this.db.get<User | undefined>('SELECT * FROM users WHERE email = ?', email);
    }
    async getUserByUsername(username: string): Promise<User | undefined> {
        return await this.db.get<User | undefined>('SELECT * FROM users WHERE username = ?', username);    }
    async listPosts(): Promise<Post[]> {
        console.log(this.db);
        
        return await this.db.all<Post[]>('SELECT * FROM posts');
    }
    async cratePost(post: Post): Promise<void> {
        await this.db.run('INSERT INTO posts (id, title, url, postedAt, userId) VALUES (?, ?, ?, ?, ?)', post.id, post.title, post.url, post.postedAt, post.userId);
    }
    getPost(id: string): Promise<Post | undefined> {
        throw new Error("Method not implemented.");
    }
    deletePost(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createComment(comment: Comment): Promise<void> {
        throw new Error("Method not implemented.");
    }
    listComments(postId: string): Promise<Comment[]> {
        throw new Error("Method not implemented.");
    }
    deleteComment(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createLike(like: Like): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async getUserById(id: string): Promise<User | undefined> {
        return await this.db.get<User | undefined>('SELECT * FROM users WHERE id = ?', id);
    }
    
}