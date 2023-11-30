const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const { Co2Sharp } = require('@mui/icons-material');

const app=express();
const port=3001;

app.use(cors());
app.use(bodyParser.json());

/// database connection 
mongoose.connect('mongodb://127.0.0.1:27017/Newlms')
.then(()=>{
console.log('database is connect');
app.listen(port,()=>{
    console.log(`Server is running on port${port} `);
});
})
.catch( (error)=>{
console.error('Databse is not connected ',error);
})


app.use(bodyParser.json());

// create model 

const User=mongoose.model('User',{
    name:String,
    email:String,
    date:String,
    address:String,
    password:String

});
// signup api 

app.post('/signup',async(req,res)=>{
    const {name,email,date,address,password}=req.body;
    try{
const newUser=new User({name,email,date,address,password});
await newUser.save();
res.json({message:'Signup successFull'});
    }
    catch (error){
console.error('Error during Signup',error);
res.status(500).json({message:'Interval server error '});
    }
});

