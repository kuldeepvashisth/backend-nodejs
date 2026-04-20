const express=require('express');
const hostrouter=express.Router();
const Home=require('../Model/modelsHome');
const hostcontroller=require('../controller/hostcontroller');
hostrouter.use((req,res,next)=>{
    console.log(req.url,req.method);
    next();
})

//hostrouter.use(express.urlencoded())



// hostrouter.get("/host/home",(req,res,next)=>{
//        res.render("home", { registeredhouse:registeredhouse,pageTitle: "Home" });

// })
     
hostrouter.get('/host/addhome',hostcontroller.hostaddhome);  
hostrouter.post("/host/addHome",hostcontroller.hosthomeadded);  
hostrouter.get('/host-homelist',hostcontroller.hosthomelist);
hostrouter.get('/host/editDetails/:homesId',hostcontroller.editHome);
hostrouter.post('/host/editedHome',hostcontroller.editedHome);
hostrouter.post('/host-homelist',hostcontroller.popeditHome)
 module.exports=hostrouter
