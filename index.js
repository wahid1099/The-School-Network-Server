const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const fileUpload = require("express-fileupload");

const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

// import route

const student = require("./routes/student.js");

// ---
connectDB();

//middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// ------ Routes
app.use("/", student);

// ------

app.get("/", (res, req) => {
  res.send("School Network Server is Connected");
});
app.listen(port, (res, req) => {
  console.log("School Network Port Is", port);
});

// ----------------------------------------------------------------

// const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@cluster0.vsy2x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// async function run() {
//     try{
//         await client.connect();

//         const database = client.db('TheSchoolNetworkDB');
//         const UserCollection = database.collection('UserCollection');
// // -----------Shared Api Start------------------//
//         //addin user to data base in user collection
//         app.post('/userAdd', async (req, res) => {
//             const data = req.body;
//             console.log('hitted')
//             const result = await UserCollection.insertOne(data)
//             res.send(result)
//         })
//         // checking user role
//         app.get('/checkuser', async (req, res) => {
//             const email = req.query.email;
//             const query = {email: email};
//             const user = await UserCollection.findOne(query);

//             if(user.role)
//             {
//                 res.send({userrole: user.role})
//             }
//             else{
//                 res.send({none: 'norole'})
//             }
//         })

// // -------------Shared Api End------------------

//     }
//     finally{

//     }
// }
// run().catch(console.dir)

//done
