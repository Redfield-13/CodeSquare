import express, { RequestHandler } from 'express'

import {db} from './datastore'


const app = express();
app.use(express.json())


const loggerMidderlware : RequestHandler = (request,response, next) =>{
    console.log("Date : ",Date.now(),"New request : ", request.path, '---body :', request.body, '---Method : ', request.method);
    next();
}

app.use(loggerMidderlware)

app.get("/posts" ,(request,response) => {

    console.log("Code Square Posts");    
    response.send({posts : db.listPosts()})

})

app.post("/posts", (request,response) =>{
    const post = request.body
    db.cratePost(post)
    response.sendStatus(200);
    
})

app.listen(3000);