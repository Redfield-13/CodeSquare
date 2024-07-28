import express, { ErrorRequestHandler, RequestHandler } from 'express'
import { createPostController, listPostsContoller } from './controllers/postController';
import asyncHandler from 'express-async-handler'
import { initDb } from './datastore';
import { signUpController, signinController } from './controllers/userController';
import dotenv from 'dotenv';
import { authMiddleware } from './middleware/authMiddleware';



(async ()=>{
    await initDb();
})()
const app = express();
app.use(express.json())
dotenv.config();

const loggerMidderlware : RequestHandler = (request,response, next) =>{
    console.log("Date : ",Date.now(),"New request : ", request.path, '---body :', request.body, '---Method : ', request.method);
    next();
}

const errorHandler : ErrorRequestHandler = (error, request, response, next) =>{
    console.error("Uncaught exceptions", error)
    response.status(500).send('Oops, error occuerd')
}

app.use(loggerMidderlware)
// Public endpoints
app.post("/v1/signup", (signUpController))
app.post("/v1/signin", (signinController))



// Protected endpoints
app.use(authMiddleware)

app.get("/v1/posts" , (listPostsContoller))
app.post("/v1/posts", (createPostController))


app.use(errorHandler)
app.listen(3000);