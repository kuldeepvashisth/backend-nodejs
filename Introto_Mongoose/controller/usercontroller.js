const Home = require("../Model/modelsHome");
const Favourite = require("../Model/favmodel");


exports.getAddhome = (req, res, next) => {
    //  res.render('useraddhome');
         res.render('admin/useraddhome');
};

exports.postAddhome = async (req, res, next) => {
  const { houseName, price, location, pernight, image } = req.body;
  const home = new Home({houseName, price, location, image});
  await home.save();

  res.redirect('/');
};


exports.booking = (req, res, next) => {
    res.render('store/booking', { pageTitle: 'Booking' });
};




exports.homelist = async (req, res, next) => {
      const homes=await Home.find();
        res.render('store/home-list', {
    pageTitle: 'Favourite Homes',
    registeredHouse: homes})
    };


    exports.homeDetails = async (req, res, next) => {
      const house=await Home.findbyId(req.params.homeId);
      if(!house) {
        res.redirect('/');
      } 
      res.render('store/home-detail', {
    pageTitle: 'Favourite Homes',
    details: house})
    };

     //const houses=[];
    exports.addfavourites=async (req,res,next)=>{
          const homeId=req.params.homeId;
          const favid =new Favourite({homeId});
         await favid.save(); 
          
           // houses.push(favhome);
          
           res.redirect('/home-list');
    };
      exports.getfavourites=async (req,res,next)=>{
        const favourites =await Favourite.find().populate('homeId');
        /*
           This gets all favourite records and 
           replaces each homeId with the full Home document.
        */


         const favhouses=favourites.map(fav => fav.homeId)
         /*
                Go through every item inside favourites, take its homeId value, 
                and make a new array from those homeId values.
         */

        res.render('store/favlist',
                {homes:favhouses}
              );
      };

      exports.removefavourites=async (req,res,next)=>{
       await Favourite.findByIdAndDelete(req.params.homeId);
      const favhouses= await Favourite.find();
       res.render('store/favlist',{
          homes:favhouses
        })
      }


//exports.registeredhouse=registeredhouse;
//controller ka kaam hai sirf model ko bolna ki data save kro 

//static : jo obj se related na ho class se related ho & hme use use ksis or function mai obj mai use krna hai
