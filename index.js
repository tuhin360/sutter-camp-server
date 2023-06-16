const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port =  process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.weuf9zh.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    

    const popularClassCollection = client.db("sutterDb").collection("popularClass");
    const popularInstructorCollection = client.db("sutterDb").collection("popularInstructor");
    const  allClassCollection = client.db("sutterDb").collection("allClass");
    const  selectClassCollection = client.db("sutterDb").collection("selectClasses");

    // popular class
    app.get('/popularClass', async (req, res) => {
        const result = await popularClassCollection.find().toArray();
        res.send(result);
    });

    // popular instructor
    app.get('/popularInstructor', async (req, res) => {
      const result = await popularInstructorCollection.find().toArray();
      res.send(result);
  });

    // all class
    app.get('/allClass', async (req, res) => {
      const result = await allClassCollection.find().toArray();
      res.send(result);
  })


  // select class collection
  app.post('/selectClasses', async(req, res) =>{
    const item = req.body;
    console.log(item);
    const result = await selectClassCollection.insertOne(item);
    res.send(result);
  })






    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);






app.get('/', (req, res) => {
    res.send('Sutter Camp server is running')
  })
  
  app.listen(port, () => {
    console.log(`Sutter Camp server is running ${port}`)
  })