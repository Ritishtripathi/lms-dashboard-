const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');


const app=express();
const port=3001;

app.use(cors());
app.use(bodyParser.json());

/// database connection 
mongoose.connect('mongodb://127.0.0.1:27017/Newlms')
.then(()=>{
console.log('database is connect');
app.listen(port,()=>{
    console.log(`Server is running on port${port}`);
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
/// employee model
const employee=mongoose.model('employee',{
    firstname:String,
    lastname:String,
    email:String,
    password:String,
    emptype:String,
    owntype:String,
    contact:String,
    gender:String,

});

app.post('/employee',async(req,res)=>{
    const{firstname,lastname,email,password,emptype,owntype,contact,gender}=req.body;
    try{
     const  newEmployee=new employee({firstname,lastname,email,password,emptype,owntype,contact,gender});
     await newEmployee.save();
     res.json({message:'employee added success'});
    }
    catch(error){
     console.error('error duringg add employees',error);
     res.json(500).json({message:'interwalserver error'});
    }
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

// Login Api 

app.post('/login',async(req,res)=>{
const {email,password}=req.body;
try{
  const user=await User.findOne({email});
  if(!user || user.password!==password){
    return res.status(401).json({message:
   'invalid email or password' });
  }

res.json({message:'Login successfull',user})

}
catch (error){
console.error('Error duringg LOgin',error);
res.status(500).json({message:'Interval server erro'});
}
});

