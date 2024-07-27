import express, { ErrorRequestHandler, RequestHandler } from 'express'
import { createPostController, listPostsContoller } from './controllers/postController';
import asyncHandler from 'express-async-handler'
import { initDb } from './datastore';

(async ()=>{
    await initDb();
})()
const app = express();
app.use(express.json())


const loggerMidderlware : RequestHandler = (request,response, next) =>{
    console.log("Date : ",Date.now(),"New request : ", request.path, '---body :', request.body, '---Method : ', request.method);
    next();
}

const errorHandler : ErrorRequestHandler = (error, request, response, next) =>{
    console.error("Uncaught exceptions", error)
    response.status(500).send('Oops, error occuerd')
}

app.use(loggerMidderlware)

app.get("/v1/posts" , (listPostsContoller))

app.post("/v1/posts", (createPostController))


app.use(errorHandler)
app.listen(3000);