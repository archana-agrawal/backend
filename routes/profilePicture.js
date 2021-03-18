const express = require('express');
const app = express();
const client = require('../database/db');
const router = express.Router();

async function savedImage(newImage, client){
    try{
        await client.instance.db().collection('profilePicture').insertOne(newImage);
    }catch(error){
        console.log(error);
    }
}

router.post('/profilePicture', async(req,res)=> {
    try{
        console.log(req.body.imageName)
        const path = './profilePicture/'+ Date.now()+req.body.imageName;
        fs.writeFile(path,req.body.imageData,'base64',function(err){
            if(err) {console.log(err);}
        })
        await savedImage({imageName: req.body.imageName, imageData: path},client)
        res.status(200).send({message: "Saved!"});
    }catch(error){
        console.log(error)
        console.log("Archana Agrawal");
        res.status(201).send(error);
    }
});

module.exports = router;