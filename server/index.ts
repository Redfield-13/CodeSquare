import express, { RequestHandler } from 'express'
import { createPostController, listPostsContoller } from './controllers/postController';


const app = express();
app.use(express.json())


const loggerMidderlware : RequestHandler = (request,response, next) =>{
    console.log("Date : ",Date.now(),"New request : ", request.path, '---body :', request.body, '---Method : ', request.method);
    next();
}

app.use(loggerMidderlware)

app.get("/posts" , listPostsContoller)

app.post("/posts", createPostController)

app.listen(3000);