const express = require('express')
const cors = require('cors');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion } = require('mongodb');

//middleware
app.use(cors());
app.use(express.json())


//vIguEMDXiP3GEI4G
//assignment10
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5fch5ts.mongodb.net/?appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
app.get('/', (req, res) => {
  res.send('Hello server!')
})


async function run() {
  try {
    await client.connect();

    const db = client.db('assign_ten');
    const allAiCollection = db.collection("allAiCollection")
  //post all ai data
   app.post("/allai",async(req,res) =>{
    const newAi = req.body;
    const result = await allAiCollection.insertOne(newAi);
    res.send(result);
   })


  //get home data from mongo db
  app.get("/allai",async(req,res)=>{
    const cursor = allAiCollection.find().sort({createdAt:-1}).limit(12);
    const result = await cursor.toArray();
    res.send(result);
  })



  //GEt all modals

  app.get("/allmodals",async(req,res)=>{
    const cursor = allAiCollection.find();
    const result = await cursor.toArray();
    res.send(result);
  })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
   
  }
}
run().catch(console.dir);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})