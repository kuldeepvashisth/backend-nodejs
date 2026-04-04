const Home = require("../Model/modelsHome");

exports.getAddhome = (req, res, next) => {
    //  res.render('useraddhome');
         res.render('host/useraddhome');
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


exports.favlist = async (req, res, next) => {
      const homes=await Home.fetchAll();
        res.render('store/favourite', {
    pageTitle: 'Favourite Homes',
    homes: homes})
    };


//exports.registeredhouse=registeredhouse;
//controller ka kaam hai sirf model ko bolna ki data save kro 

//static : jo obj se related na ho class se related ho & hme use use ksis or function mai obj mai use krna hai
