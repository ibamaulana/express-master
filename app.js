const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL = "mongodb+srv://ibam:cahsmaga@cluster0-szn5c.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "backenginer_ibamaulana";

const product = require('./routes/produk.route');
const varian = require('./routes/varian.route'); 
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/produk', product);
app.use('/varian', varian);
// Configuring the database
const mongoose = require('mongoose');

// Set up mongoose connection
const mongoDB = process.env.MONGODB_URI || CONNECTION_URL;
mongoose.connect(mongoDB,{
    useNewUrlParser: true,
    useUnifiedTopology: true ,
    dbName: DATABASE_NAME
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// const MongoClient = require('mongodb').MongoClient;

// replace the uri string with your connection string.
// const uri = "mongodb+srv://ibam:cahsmaga@cluster0-szn5c.mongodb.net/test"
// MongoClient.connect(uri, function(err, client) {
//    if(err) {
//         console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
//    }
//    console.log('Connected...');
//    const collection = client.db("test").collection("devices");
//    // perform actions on the collection object
//    client.close();
// });
var database, collection;

app.listen(3000, () => {
    // MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true,useUnifiedTopology: true }, (error, client) => {
    //     if(error) {
    //         throw error;
    //     }
    //     database = client.db(DATABASE_NAME);
    //     produk = database.collection("produk");
    //     console.log("Connected to `" + DATABASE_NAME + "`!");
    // });
    console.log("Connected to `" + DATABASE_NAME + "`!");
});

// app.post("/produk", (request, response) => {
//     produk.insert(request.body, (error, result) => {
//         if(error) {
//             return response.status(500).send(error);
//         }
//         response.send(result.result);
//     });
// });

// app.get("/produk", (request, response) => {
//     produk.find({}).toArray((error, result) => {
//         if(error) {
//             return response.status(500).send(error);
//         }
//         response.send(result);
//     });
// });

app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
})