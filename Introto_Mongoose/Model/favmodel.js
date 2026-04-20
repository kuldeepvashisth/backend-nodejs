const fs = require('fs').promises;
const path = require('path');
const rootdir = require('../utils/path');
const { json } = require('stream/consumers');

const Home = require("../Model/modelsHome");
const { getDB } = require('../utils/database');
const { ObjectId } = require('mongodb');

//const homeDatapath = path.join(rootdir, 'data', 'homes.json');
const favouriteDatapath = path.join(rootdir, 'data', 'favourites.json');

const mongoose=require('mongoose')



const favouriteSchema=mongoose.Schema({
    homeId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Home',
        unique:'true'
    }
});

favouriteSchema.statics.getFavourite=async function(){
    return this.find();
}

favouriteSchema.statics.addfavourite=async function(){
    
}

module.exports=mongoose.model('Favourite',favouriteSchema)