const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express();
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const fileUpload = require('express-fileupload');
const port = process.env.PORT || 5000;

//middleware 
app.use(cors());
app.use(express.json());
app.use(fileUpload()); 
const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@cluster0.vsy2x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try{
        await client.connect();   

        const database = client.db('TheSchoolNetworkDB');
        const UserCollection = database.collection('UserCollection');

// -------------Shared Api End------------------
  
    }
    finally{   

    }
}
run().catch(console.dir)

app.get('/', (res, req) => {
    res.send('School Network Server is Connected')
})
app.listen(port, (res, req) => {
    console.log('School Network Port Is', port)
})