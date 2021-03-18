const Mongoclient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbuser:passworduser@cluster0.vui1u.mongodb.net/dbuser?retryWrites=true&w=majority"
const client = new Mongoclient(uri, {
    reconnectInterval: 1000,
    reconnectTries: Number.MAX_VALUE,
});

async function main(){
    try {
        await client.connect();
        console.log("Connected to Databas!");
        databasesList = await client.db().admin().listDatabases();
    
        console.log("Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    }catch (error) {
        console.log(error);
    }
}


module.exports = {instance : client, main};