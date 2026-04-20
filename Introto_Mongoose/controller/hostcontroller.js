const Home = require('../Model/modelsHome');

exports.hostaddhome=(req,res,next)=>{
res.render('admin/hostaddhome',{pageTitle:'airbnb',editing:false})
} 

exports.hosthomeadded=async (req,res,next)=>{
     const { houseName, price, location, pernight, image } = req.body;
     const home = new Home(houseName, price, location, pernight, image);
     await home.save();
    res.redirect('/')
}
exports.hosthomelist= async (req,res,next)=>{
    const houses=await Home.find();
    res.render('admin/Register-homelist',{
        pageTitle:'hostlist',
        registeredHouse:houses,
       
    })
}
exports.editHome=async(req,res,next)=>{
    const homeid=req.params.homesId;
    const editing=req.query.editing==='true'; //===true we are converting this string to boolean
   const house=await Home.findbyId(homeid);
   if(!house){
    res.redirect('host-homelist')
   }
   else{
       res.render('admin/edit-home',{pageTitle:'airbnb',
        editing:true,
      home:house
    });

   }
}//set ke saath sif whi fied update hoti haijo 


  exports.editedHome=async(req,res,next) => {
    const { id, houseName, price, location,  image } = req.body;
    /*
      <input type="hidden" name="id" value="<%= home._id %>" />
      Ab req.body.id mein MongoDB ka _id value aa jayega.
    */
  
       const home=await Home.findbyId(id);
   if(!home){
    res.redirect('host-homelist')
   }
   home.houseName=houseName;
   home.price=price;
   home.location=location;
   home.image=image;
   await home.save();

 
  res.redirect('/host-homelist');
 /*
 M2:- home.findByIdAndUpdate(id,{houseName,price,locatio,image},{new;true});
    
   await Home.findByIdAndUpdate(id,{houseName,price,location,image},{new:true});
 */

  }


  exports.popeditHome=async(req,res,next)=>{

    const homeid=req.body.id
   await Home.popfromList(homeid);
   const newlist=await Home.find();
   res.render('admin/Register-homelist',{pageTitle:'newhouses',
    registeredHouse:newlist});
  }
