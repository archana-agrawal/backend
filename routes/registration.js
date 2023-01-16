const express = require('express');
const app = express();
const client = require('../database/db');
//const router = require('./login');

const router = express.Router();


async function savedUser(newUser, client){
    try{
        await client.instance.db().collection("newUser").insertOne(newUser);
        console.log("Inserted New User!");
    }catch(error){
        console.log(error);
    }
}

router.post('/registration', async (req, res) => {
    try{
        const newUser = {
            firstName: req.body.firstName,
            secondName: req.body.secondName,
            gender: req.body.gender,
            dateOfBirth: req.body.dateOfBirth,
            phoneNo: req.body.phoneNo,
            cookies: req.body.cookies,
        }
        header.parse(req.body.cookies);
        await savedUser(newUser, client);
        console.log("Saved Successfully!");
        res.status(200).send();
    }catch (error) {
        console.log(error);
        res.status(201).send(error);
    }
    
});

router.get('/', (req, res) => {
    try {
        
    } catch (error) {
        
    }
});

module.exports = router;
