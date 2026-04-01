const express=require('express');
const hostrouter=express.Router();
const rootdir=require('../utils/path')
const path=require('path');
const {registeredhouse}=require('./userRoutes')
hostrouter.use((req,res,next)=>{
    console.log(req.url,req.method);
    next();
})

//hostrouter.use(express.urlencoded())



// hostrouter.get("/host/home",(req,res,next)=>{
//        res.render("home", { registeredhouse:registeredhouse,pageTitle: "Home" });

// })
     
hostrouter.get("/host/addHome",(req,res,next)=>{
    
res.render('hostaddhome',{pageTitle:'hostaddhome'})
})  

hostrouter.post("/host/addHome",(req,res,next)=>{
     console.log(req.body);
      registeredhouse.push({houseName:req.body.homename,price:req.body.price});
    res.sendFile(path.join(rootdir,'views','hosthomeadded.html'))
})  

 module.exports=hostrouter