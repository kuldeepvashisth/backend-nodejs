const Home = require("../Model/modelsHome");

exports.getAddhome = (req, res, next) => {
     res.render('useraddhome');
};

exports.postAddhome = async (req, res, next) => {
  const { houseName, price, location, pernight } = req.body;
  const home = new Home(houseName, price, location, pernight);
  await home.save();

  res.redirect('/');
};

//exports.registeredhouse=registeredhouse;
//controller ka kaam hai sirf model ko bolna ki data save kro 

//static : jo obj se related na ho class se related ho & hme use use ksis or function mai obj mai use krna hai
