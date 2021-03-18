const express = require('express');
const app = express(); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const client = require('../database/db');
const ACCESS_SECRET_TOKEN = 'adkkmhlkg;ewkrqwoejwt';

const router = express.Router();

async function checkUser(user, client){
    const findUser = await client.instance.db().collection('addNewUser').findOne({email: user.email});
    if(!findUser){
        console.log("User not existed!");
        return;
    }

    if(await bcrypt.compare(user.password, findUser.password)){
        const payload = {email: findUser.email};
        console.log("Successful !");
        const options = {expiresIn: '24h', issuer: "https//scotch.io"};
        const token = jwt.sign(payload,ACCESS_SECRET_TOKEN, options); 
        return token;
    }

    console.log("Wrong Password");
}

router.post('/login', async (req, res) => {
    console.log("Aniket");
    //console.log(req);
    try{
        const user = {
            email: req.body.email,
            password: req.body.password,
        }
        const token = await checkUser(user, client);
        if(token == null){
            res.status(201).send();
        }
        console.log("Archana");
        res.status(200).send(token);
    }catch(error){
        console.log(error);
        res.status(201).send();
    }
});

router.get('/', async (req, res) => {
    try{
        const findUser = await client.db().collection() 
    }catch(error){

    }
});

module.exports = router;


