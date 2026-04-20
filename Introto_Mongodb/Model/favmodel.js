const fs = require('fs').promises;
const path = require('path');
const rootdir = require('../utils/path');
const { json } = require('stream/consumers');

const Home = require("../Model/modelsHome");
const { getDB } = require('../utils/database');
const { ObjectId } = require('mongodb');

//const homeDatapath = path.join(rootdir, 'data', 'homes.json');
const favouriteDatapath = path.join(rootdir, 'data', 'favourites.json');




module.exports=class Favourite{
 
 
 
 
    static async getFavouriteIds(){
        try{
            const db=getDB();
            const data= await db.collection('favourites')
            .find().toArray();
         return data.map(fav => fav.homeId);
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

       const db=getDB();
      const existing= await db.collection('favourites').findOne({homeId:house._id})
      if(existing){
       console.log('house already in favourites');
        return true;
      }
      return db.collection('favourites').insertOne({homeId:house._id});
    }


    
    static async getFavourite(){
   
         const db=getDB();
        const homes= await Home.fetchAll();
         const favids=await Favourite.getFavouriteIds();
   return homes.filter(home => favids.some(fav => fav.toString() === home._id.toString()))
    }


    static async removefavourite(homeId){
        const db=getDB();
       return db.collection('favourites').deleteOne({homeId :new ObjectId( homeId)})
    }

}


/*
const favids=await Favourite.getFavouriteIds();
      const houses=await Home.fetchAll();
      const favhouseids=favids.filter((favhouseid)=> favhouseid !== homeId)
              await fs.writeFile(favouriteDatapath,JSON.stringify(favhouseids),null,2);
     const newfavhouses=houses.filter((homes)=>favhouseids.includes(homes.id));
    return newfavhouses;

*/
