const fs = require('fs').promises;
const path = require('path');
const rootdir = require('../utils/path');
const { json } = require('stream/consumers');
const { log } = require('console');

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
        //this.id = Date.now().toString();
        this.id = Math.ceil(Math.random()*100);
       console.log('id of house is',this.id)
        const registeredhouse = await Home.fetchAll();
        registeredhouse.push(this);
// mkdir is used to ,if folder not exist then first create then write/read
        await fs.mkdir(path.dirname(homeDatapath), { recursive: true });
        await fs.writeFile(homeDatapath, JSON.stringify(registeredhouse, null, 2));
    }

    static async fetchAll() {
        try {
            const data = await fs.readFile(homeDatapath, 'utf-8');
            return JSON.parse(data);
        } catch (err) {
            return [];
        }
    }

    static async findbyId(homeId){
        try{
            const homes=await Home.fetchAll();
      
    const  house =homes.find((home)=>home.id===homeId) //it returns all the house in the house array whose id match with this HomeId
          return house;
        } 
        catch(err){
           return null;
        }
        
    }

    static async updatebyId(updatedHome){
        const homes=await Home.fetchAll();
     //   const index=homes.findIndex(home => home.id===updatedHome.id);
      const index = homes.findIndex(home => home.id === updatedHome.id);  
     if(index==-1) return false;
        homes[index]=updatedHome;
    
      await fs.writeFile(homeDatapath, JSON.stringify(homes, null, 2));
      return true;   
}
   static async popfromList(homeId){
    const homes=await Home.fetchAll();
    const newhouses=homes.filter(home=>home.id!=homeId)
      await fs.writeFile(homeDatapath, JSON.stringify(newhouses, null, 2));
      return newhouses;
   }
};
    // static async getFavouriteIds() {
    //     try {
    //         const data = await fs.readFile(favouriteDatapath, 'utf-8');
    //         return JSON.parse(data);
    //     } catch (err) {
    //         return [];
    //     }
    // }

    // static async addToFavourites(homeId) {
    //     const house = await Home.findbyId(homeId);
    //     if (!house) {
    //         return false;
    //     }

    //     const favouriteIds = await Home.getFavouriteIds();
    //     if (!favouriteIds.includes(homeId)) {
    //         favouriteIds.push(homeId);
    //         await fs.mkdir(path.dirname(favouriteDatapath), { recursive: true });
    //         await fs.writeFile(favouriteDatapath, JSON.stringify(favouriteIds, null, 2));
    //     }

    //     return true;
    // }

    // static async getFavourites() {
    //     const homes = await Home.fetchAll();
    //     const favouriteIds = await Home.getFavouriteIds();

    //     return homes.filter((home) => favouriteIds.includes(home.id));
    // }

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

