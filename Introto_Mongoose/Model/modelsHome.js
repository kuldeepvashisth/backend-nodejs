
const { default: mongoose } = require('mongoose');



const homeSchema=mongoose.Schema({
    houseName:{
        type:String,
        required:true
    },
    
    price:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },

    image:{
      type:String
    }

});
 homeSchema.statics.fetchAll= function () {
            return this.find();
    }
  

 homeSchema.statics.findbyId=function(id){
//    return this.findById(id);
   return  this.findOne({ _id: id })
}

/*
Internal working : 
   Home.findOne({ _id: id })
*/


homeSchema.statics.popfromList=async function(homeId){
   
//    this.deleteOne({_id:homeId})

    try{
        await this.deleteById(homeId)
    }
    catch(err){
           console.log("Error while deleting home:", err);
    }
           
/*
Here this means Home model, because you will call it like:

Home.deleteById(homeId);


M2.Direct 
      try {
  await this.findByIdAndDelete(homeId);
  console.log("Home deleted successfully");
} catch (err) {
  console.log("Error while deleting home:", err);
} 
*/

}



module.exports=mongoose.model('Home',homeSchema)
/*

   Mongoose model name ko:

lowercase karta hai
plural bana deta hai
 so in db 
 in airbnb the DB name is :-homes
*/