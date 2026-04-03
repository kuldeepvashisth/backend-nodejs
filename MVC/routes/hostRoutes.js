const express=require('express');
const hostrouter=express.Router();
const Home=require('../Model/modelsHome');

hostrouter.use((req,res,next)=>{
    console.log(req.url,req.method);
    next();
})

//hostrouter.use(express.urlencoded())



// hostrouter.get("/host/home",(req,res,next)=>{
//        res.render("home", { registeredhouse:registeredhouse,pageTitle: "Home" });

// })
     
hostrouter.get("/host/addHome",(req,res,next)=>{
    
res.render('hostaddhome',{pageTitle:'airbnb'})
})  
hostrouter.post("/host/addHome",async (req,res,next)=>{
     const { houseName, price, location, pernight } = req.body;
     const home = new Home(houseName, price, location, pernight);
     await home.save();
    res.redirect('/')
})  

 module.exports=hostrouter
