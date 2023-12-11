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

// create model for leave
const leave=mongoose.model('leave',{
    leavetype:String,
    leavedays:String,
    fromdate:String,
    todate:String,
    leavedur:String,
    leavemark:String,
    leavestatus:String,
    leavenote:String
})

//model of holiday

const holiday = mongoose.model('holiday',{
  name:String,
  fromdate:String,
  todate:String,
  remark:String
})

//model of department

const department = mongoose.model('department',{
    departmentname:String,
    manager:String,
    description:String
});
//employee api
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
res.status(500).json({message:'Interval server error'});
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
// 

// get employee api 
app.get('/employee/data',async(req,res)=>{
    try{
// fetch all employee from the database 
const employees =await employee.find();
// send the lisst of employess as a json response 
res.json({employees});
    }
    catch (error){
console.error('Error during employee getting',error);
res.status(500).json({message:'Interval server error'});
    }
})

// leave api 

app.post('/leave',async(req,res)=>{
const{leavetype,leavedays,fromdate,todate,leavedur,leavemark,leavestatus,leavenote}=req.body;

try{
    const Leave=new leave({leavetype,leavedays,fromdate,todate,leavedur,leavemark,leavestatus,leavenote});
    await Leave.save();
    res.json({message:'Signup successFull'});
        }
        catch (error){
    console.error('Error during Signup',error);
    res.status(500).json({message:'Interval server error '});
        }
});


/// DELETE API FOR EMPLOYEE 
app.delete('/employee/data/:id',async (req,res)=>{
    try
    {
        const employeeid=req.params.id;
        if(!mongoose.Types.ObjectId.isValid(employeeid)){
            return res.status(400).json({message:'Invalid id'});
        }
        const deleteemployee=await employee.findByIdAndDelete(employeeid);
        if (!deleteemployee){
return res.status(404).json({message:'Employee not found'});
        }
        res.json({message:'Employee deleted successfully'});

    }
    catch (error){
         console.error(error);
    }
});

//Delete api of Department data

app.delete('/department/data/:id', async(req,res)=>{
      try{
        const departmentid=req.params.id;
        if(!mongoose.Types.ObjectId.isValid(departmentid)){
            return res.status(400).json({message:'Invalid id'});
        }
        const deletedepartment=await department.findByIdAndDelete(departmentid);
        if(!deletedepartment){
           return res.status(404).json({message:'department not found'});
        }
        res.json({message:'Employee delete success'});
      }
      catch(error){
         console.error(error);
         res.status(500).json({message:'interwal error!'});
      }
});


//get data of leave

app.get('/leave/data',async(req,res)=>{
    try{
     const leaves=await leave.find();
     res.json({leaves});
    }
    catch(error){
        console.error('error during fetch data',error);
        res.status(500).json({message:'innterwal  error'});
    }
});

 //Holiday data code 
 app.get('/holiday/data',async (req,res)=>{
    try{
      const holidays=await holiday.find();
      res.json({holidays});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:'interwal error!'});
    }
 })

//post data of Holiday (api)

app.post('/holiday',async(req,res)=>{
    const {name,fromdate,todate,remark}=req.body;
    try{
       const Holiday=new holiday ({name,fromdate,todate,remark});
       await Holiday.save();
       res.json({message:'holiday added successfully'});
    }
    catch(error){
         console.error('error during save',error);
         res.status(500).json({message:'feild saved!'});
    }
});



//api of department 

app.post('/department',async(req,res)=>{
    const {departmentname,manager,description}=req.body;
    try{
      const Department=new department({departmentname,manager,description});
       await Department.save();
       res.json('department added success');
    }
    catch(error){
     console.error('error during save ',error);
     res.status(500).json({message:'interwal error'});
    }
});


//department data get api

app.get('/department/data',async(req,res)=>{
   
    try{
        const departments=await department.find();
        res.json({departments});
    }
    catch(error){
     console.error('fetching data error',error);
     res.status(500).json({message:'interwal error'});
    }
});
