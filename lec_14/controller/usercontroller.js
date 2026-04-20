const Home = require("../Model/modelsHome");
const Favourite = require("../Model/favmodel");
exports.getAddhome = (req, res, next) => {
    //  res.render('useraddhome');
         res.render('admin/useraddhome');
};

exports.postAddhome = async (req, res, next) => {
  const { houseName, price, location, pernight, image } = req.body;
  const home = new Home(houseName, price, location, pernight, image);
  await home.save();

  res.redirect('/');
};


exports.booking = (req, res, next) => {
    res.render('store/booking', { pageTitle: 'Booking' });
};




exports.homelist = async (req, res, next) => {
      const homes=await Home.fetchAll();
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
          const favhome=await Favourite.addfavourite(req.params.homeId);
          // houses.push(favhome);
           res.redirect('/home-list');
    };
      exports.getfavourites=async (req,res,next)=>{
        const favhouses =await Favourite.getFavourite();
              res.render('store/favlist',
                {homes:favhouses}
              );
      };

      exports.removefavourites=async (req,res,next)=>{
        const favhouses=await Favourite.removefavourite(req.params.homeId);
        res.render('store/favlist',{
          homes:favhouses
        })
      }


//exports.registeredhouse=registeredhouse;
//controller ka kaam hai sirf model ko bolna ki data save kro 

//static : jo obj se related na ho class se related ho & hme use use ksis or function mai obj mai use krna hai
