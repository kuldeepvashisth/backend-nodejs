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
    const houses=await Home.fetchAll();
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
}


  exports.editedHome=async(req,res,next) => {
    const { id, houseName, price, location,  image } = req.body;
    await Home.updatebyId(id, {
    houseName,
    price,
    location,
    image
  })
  // const isupdate=await Home.updatebyId(updatedHome);
  // if(!isupdate){
  //   return res.status(404).send('home not found')
  // }
  res.redirect('/host-homelist');
  }


  exports.popeditHome=async(req,res,next)=>{

    const homeid=req.body.id
   await Home.popfromList(homeid);
   const newlist=await Home.fetchAll();
   res.render('admin/Register-homelist',{pageTitle:'newhouses',
    registeredHouse:newlist});
  }
