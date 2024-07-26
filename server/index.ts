import express, { RequestHandler } from 'express'


const app = express();
app.use(express.json())

const posts :any[] = [];

const loggerMidderlware : RequestHandler = (request,response, next) =>{
    console.log("Date : ",Date.now(),"New request : ", request.path, '---body :', request.body, '---Method : ', request.method);
    next();
}

app.use(loggerMidderlware)

app.get("/posts" ,(request,response) => {

    console.log("Code Square Posts");    
    response.send({posts})

})

app.post("/posts", (request,response) =>{
    const post = request.body
    posts.push(post)
    response.sendStatus(200);
    
})

app.listen(3000);