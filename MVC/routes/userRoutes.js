const express=require('express');
const userRouter=express.Router();
const homecontroller=require('../controller/home')



userRouter.get("/user/addHome",homecontroller.getAddhome)    



userRouter.post("/user/addHome",homecontroller.postAddhome)  

exports.userRouter=userRouter;
