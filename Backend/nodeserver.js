const express=require('express');
const app=express();
const cors=require("cors");
const mongodb=require("./config/database");
app.use(express.json());
app.use(cors());
const Client=require("./model/client");
const Jobseeker=require("./model/jobseeker")

const PORT2 = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send("✅ Database API server is running successfully!");
});

// Sample POST Route to Save Client
app.post('/api/project', async (req, res) => {
  try {
    const {service, name, phone,email,   descript,budget } = req.body;

    const client = new Client({
      service,
      name,
      phone,
      email,
      descript,
      budget
    });

    await client.save();
    res.status(201).json({ message: 'Client saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save client', details: err.message });
  }
});


app.post('/api/job', async (req, res) => {
  try {
    const {service, name, phone,email } = req.body;

    const jobseeker = new Jobseeker({
      service,
      name,
      phone,
      email
    });

    await jobseeker.save();
    res.status(201).json({ message: 'Client saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save client', details: err.message });
  }
});


// TO GET ALL DATA FROM CLIENT DATABASE

app.get("/api/clientdata",async (req,res)=>{
   try{
         const clientdata=await Client.find();
         res.send(clientdata)
   }
   catch(err){
       res.send("Something Problem..")
   }
})


// TO GET ALL DATA FROM Jobseeker DATABASE

app.get("/api/jobseeker",async (req,res)=>{
  try{
        const clientdata=await Jobseeker.find();
        res.send(clientdata)
  }
  catch(err){
      res.send("Something Problem..")
  }
})

// SERVER STARTING 

app.listen(PORT2,()=>{
  console.log(`✅ Database API server running on http://localhost:${PORT2}`);
})

mongodb().then(()=>{
      console.log("database connected");
})
.catch(er=>{
  console.log("database not connect");
  console.error("Connection error details:", er);
})
