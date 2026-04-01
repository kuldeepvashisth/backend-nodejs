//Core Modules
const http =require('http')
//External Modules
const express = require('express');
const app = express();
const requesthandler=require('./parsing_request')

app.use("/",(req,res,next)=>{
    console.log("first middleware",req.url,req.method);
     // res.send("<p>home middleware</p>")
   next();
});

app.use("/submit-details2",(req,res,next)=>{
    console.log("second middleware",req.url,req.method);
    res.send("<p>welcome page to express</p>")
    next();
});

app.use((req,res,next)=>{
    console.log("third middleware",req.url,req.method);
    next();
});

app.use(requesthandler);

const server =http.createServer(app);




const port=3002;
server.listen(port,()=>{
console.log("server start listening via port number");

});
