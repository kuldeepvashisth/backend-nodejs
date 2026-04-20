const fs = require('fs').promises;
const path = require('path');
const rootdir = require('../utils/path');
const { json } = require('stream/consumers');

const Home = require("../Model/modelsHome");

//const homeDatapath = path.join(rootdir, 'data', 'homes.json');
const favouriteDatapath = path.join(rootdir, 'data', 'favourites.json');


module.exports=class Favourite{
      static async getFavouriteIds(){
        try{
            const data= await fs.readFile(favouriteDatapath,'utf-8');
        return JSON.parse(data);
        }
        catch(err){
            return [];
        }
    }

    static async addfavourite(homeId){
        const house=await Home.findbyId(homeId);
        if(!house){
            return false;
        }

        const favids=await Favourite.getFavouriteIds();
        if(!favids.includes(homeId)){
            favids.push(homeId);
          await fs.writeFile(favouriteDatapath,JSON.stringify(favids,null,2));
        }
        return true;
    }

    static async getFavourite(){
        const homes=await Home.fetchAll();
        const favids=await Favourite.getFavouriteIds();
        const house=homes.filter((home)=>favids.includes(home.id));
        return house;
    }
    static async removefavourite(homeId){
        const favids=await Favourite.getFavouriteIds();
      const houses=await Home.fetchAll();
      const favhouseids=favids.filter((favhouseid)=> favhouseid !== homeId)
              await fs.writeFile(favouriteDatapath,JSON.stringify(favhouseids),null,2);
     const newfavhouses=houses.filter((homes)=>favhouseids.includes(homes.id));
    return newfavhouses;
    }

}
