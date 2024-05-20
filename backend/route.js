const express = require('express')
const db = require('../model/model')
const { ObjectId } = require('mongodb');
const router = express.Router()
router.use(express.json())

router.post('/login', async (req, res) => {
    try {
      
    
        const database = await db();
        const collection = database.collection('users');
        const {username, password} = req.body;
        const message = await collection.findOne({"username": username})

        console.log(message);
        
        if(message.password === password)
            {
                return res.status(200).json({ message: 'OK' });
            }

        return res.status(404).json({ message: "Invalid Username / Password" });
        
      
      
    } catch (e) {
        console.error('Error during login:', e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});



router.post('/addscore', async (req, res) => {
    try {
      
        const {username, score} = req.body
        const database = await db();
        const collection = database.collection('scores');
        const {acknowledged} = await collection.insertOne({username: username, score: score})
        return res.json({ message: acknowledged ? "OK" : "Error" });
        
      
      
    } catch (e) {
        console.error('Error during login:', e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/scores', async (req, res) => {
    try {
      
       
        const database = await db();
        const collection = database.collection('scores');
        const re = await collection.find({ }).toArray();
     
        
        console.log(re)
        return res.json({ message: re });

       
      
      
    } catch (e) {
        console.error('Error during login:', e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post('/signup', async (req, res) => {
    try {
      
        const {username, password} = req.body
        const database = await db();
        const collection = database.collection('users');
        const {acknowledged} = await collection.insertOne({username: username, password: password})
        return res.json({ message: acknowledged ? "OK" : "Error" });
        
      
      
    } catch (e) {
        console.error('Error during login:', e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});




router.get('/getQuestions', async (req, res) => {
    try {
      
    
        const database = await db();
        const collection = database.collection('questions');
        const question = await collection.find({}).toArray(function(err, result) {
         
          });
        console.log(question);
        return res.json({ message: question });
        
      
      
    } catch (e) {
        console.error('Error during login:', e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});



module.exports = router;
