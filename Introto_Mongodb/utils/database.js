const { localsName } = require('ejs');
const mongo=require('mongodb')

const MongoClient=mongo.MongoClient;

const Mongourl='mongodb+srv://root:abc9818@cluster0.ogkhgbq.mongodb.net/?appName=Cluster0'

let db;

const mongoConnect= async () => {
    try{
        const client=await MongoClient.connect(Mongourl);
         db=client.db('airbnb')
        console.log('Mongodb connected')
        return db;
    }
    catch (error){
        console.log('error occured',error);
        
    }
}

  const getDB=()=>{
        if(!db) throw new Error('Db not connect')
            return db;
    }
module.exports ={mongoConnect,getDB}