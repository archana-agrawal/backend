const express = require('express');
const router = express.Router();
const client = require('../database/db');
const bcrypt = require('bcrypt');

async function addUser(user, client){
    try {
        await client.instance.db().collection('addNewUser').insertOne(user);
        console.log("Saved New User Successfully!");
    } catch (error) {
        console.log(error);
    }
}

router.post('/', async(req, res) =>{
    try{
        const hassedPassword = await bcrypt.hash(req.body.password, 10);
        const user = {
            email: req.body.email,
            password: hassedPassword,
        }
        await addUser(user, client);
        res.status(200).send();
    }catch (error) {
        console.log(error);
        res.status(201).json({message: error});
    }
});

module.exports = router;