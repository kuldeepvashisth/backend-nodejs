const express=require('express');
const userRouter=express.Router();
const homecontroller=require('../controller/usercontroller')



userRouter.get("/user/addHome",homecontroller.getAddhome)    
   
userRouter.post("/user/addHome",homecontroller.postAddhome)  


 userRouter.get("/booking",homecontroller.booking) 
  userRouter.get("/favlist",homecontroller.favlist) 
exports.userRouter=userRouter;
