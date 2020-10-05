const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
console.log(process.env.DB_PASS)


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7rp0m.mongodb.net/volunteerNetwork?retryWrites=true&w=majority`;


const port = 5000




const app = express()

app.use(cors());
app.use(bodyParser.json());



const pass = 'volunteer123456';






const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const registerCollection = client.db("volunteerNetwork").collection("datas");
  
  

  app.post('/addRegister', (req, res) => {
    const newRegister = req.body;
    registerCollection.insertOne(newRegister)
    .then(result => {
        res.send(result.insertedCount > 0);
    })
    console.log(newRegister);
})




app.get('/registers', (req, res) => {
    // console.log(req.query.email);
    registerCollection.find({email: req.query.email})
    .toArray((err, documents) => {
      res.send(documents);
    })
})




app.get('/register', (req, res) => {
    
    registerCollection.find({})
    .toArray((err, documents) => {
      res.send(documents);
    })
})




});






app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port);