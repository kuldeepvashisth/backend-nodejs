const express=require('express');
const bodyparser=require('body-parser');
const app=express();

app.use((req,res,next)=>{
    console.log("1st middleware",req.path,req.method);
    next();
    
})

app.use((req,res,next)=>{
    console.log("2nd middleware",req.path,req.method);
    next();
    
})

app.use((req,res,next)=>{
    console.log("3rd middleware",req.path,req.method);
   // res.send("<h3>res send</h3>");
   next();
 
})

//home middleware
app.get("/",(req,res,next)=>{
    console.log("home middleware");
       res.send(`
    
 <form action="/contact" method="get">

    <button type="submit">submit </button>      
    </form>
    `)
    
})

app.get("/contact",(req,res,next)=>{
    console.log("contact us  middleware");
   res.send(`
    
 <form action="/contact" method="POST">
        <input type="number" name="age" id="age">
        <label for="age">enter age number</label>

        <input type="text" name="username" id="username">
        <label for="username">enter username</label>
        <button type="submit">submit </button>  
    </form>
    `)
})

app.use(bodyparser.urlencoded());

app.post("/contact",(req,res,next)=>{
    console.log("contact us post middleware",req.body);
   res.send("<h3>final page</h3>")
})



const port=3004;
app.listen(port,()=>{
    console.log("app start listening");
})