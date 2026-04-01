const express=require('express');
const path=require('path')
const rootdir=require('../utils/path')
const userRouter=express.Router();



userRouter.get("/user/addHome",(req,res,next)=>{
       console.log(rootdir);
     res.sendFile(path.join(rootdir,'views','useraddhome.html'))
})    

const registeredhouse=[];

userRouter.post("/user/addHome",(req,res,next)=>{
  console.log('home registered succesfully for ',req.body);
  registeredhouse.push({houseName:req.body.homename,price:req.body.price,location:req.body.location,pernight:req.body.pernight});
  console.log('in user',registeredhouse);
  
  
    res.render('userhomeadded');
})  

exports.userRouter=userRouter;
exports.registeredhouse=registeredhouse;
