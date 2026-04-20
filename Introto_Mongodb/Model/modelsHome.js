const fs = require('fs').promises;
const path = require('path');
const rootdir = require('../utils/path');
const { json } = require('stream/consumers');
const {getDB}=require('../utils/database');
const { get } = require('http');
const { ObjectId } = require('mongodb');
/*
why import objectId  bcoz 
database has some like this
{ _id: ObjectId('69df0dfa3b63c8045196318c') }
  means in database id is an object not just a string and we are comparing a string with a object
    therefore we have to make the type of both as same thn only it can compares 

    ObjectId is not a separate npm package here
it comes from the mongodb module
it converts your id string into Mongo’s id type

*/

const homeDatapath = path.join(rootdir, 'data', 'homes.json');
const favouriteDatapath = path.join(rootdir, 'data', 'favourites.json');

module.exports = class Home {
    constructor(houseName, price, location, pernight, image) {
        this.houseName = houseName;
        this.price = price;
        this.location = location;
        this.pernight = pernight;
        this.image = image;
    }
    async save() {
       const db=getDB();
    return db.collection('homes').insertOne(this);
    }

    static async fetchAll() {
        const db=getDB();
       return db.collection('homes').find().toArray();
    }

    static async findbyId(homeId){
        console.log(homeId);
        
       const db=getDB();
        /*
       bcoz in db atlas creates its own id as '_id'
        _id:homeId --> match _id with homId
      
       find --> returns a cursor means a pointer
       .

       const cursor = db.collection('homes').find()
                                    ↑
                              ABHI DATA NAHI AAYA!
                              sirf pointer mila hai

// AB data lo — jab zarurat ho
await cursor.toArray()    // sab ek saath lo
await cursor.next()       // ek ek karke lo
await cursor.limit(10)    // sirf 10 lo
       */

       return db.collection('homes') //db mai is name ke collection se find kro
       .find({_id:new ObjectId( homeId)}) //is basis pr kro
       .next() // ek -ek krke lao
    }

    static async updatebyId(id,updatedHome){
       
        const db=getDB();
       return  await db.collection('homes')
        .updateOne({_id:new ObjectId(id)},{$set :updatedHome})
   }
   static async popfromList(homeId){
    const db=getDB();
   return db.collection('homes')
    .deleteOne({_id: new ObjectId(homeId)});    
   }
};
   
  /*  static async getFavouriteIds(){
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

        const favids=await Home.getFavouriteIds();
        if(!favids.includes(homeId)){
            favids.push(homeId);
          await fs.writeFile(favouriteDatapath,JSON.stringify(favids,null,2));
        }
        return true;
    }

    static async getFavourite(){
        const homes=await Home.fetchAll();
        const favids=await Home.getFavouriteIds();
        const house=homes.filter((home)=>favids.includes(home.id));
        return house;
    }


*/

