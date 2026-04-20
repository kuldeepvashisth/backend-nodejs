const express=require('express');

const userRouter=express.Router();

/*
it returns a specific fuction from hostcontroller whose name is hostcontroller
const {homecontroller}=require('../controller/usercontroller')
*/
const homecontroller=require('../controller/usercontroller')



userRouter.get("/user/addHome",homecontroller.getAddhome)    
   
userRouter.post("/user/addHome",homecontroller.postAddhome)  


 userRouter.get("/booking",homecontroller.booking) 
 // userRouter.get("/favlist",homecontroller.favlist)
    userRouter.get("/home-list",homecontroller.homelist) 
    userRouter.get("/home-list/:homeId",homecontroller.homeDetails);
    userRouter.post("/fav-list/:homeId",homecontroller.addfavourites);
    userRouter.get("/fav-list",homecontroller.getfavourites);
 userRouter.delete("/fav-list/:homeId",homecontroller.removefavourites);    
exports.userRouter=userRouter;
