const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const multer =require('multer');
const path =require ('path');

// set up  uploaded images
const storage = multer.diskStorage({
    destination:'./uploads/',
 filename:function(req,file,cb){
    cb(null,file.filename+'-'+Date.now()+  path.extname(file.originalname));
 }
});

const upload=multer({storage:storage});



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

//get dir name of pic
// app.use('/uploads',express.static(path.join(__dirname,'uploads')));
// create model 

const User=mongoose.model('User',{
    name:String,
    email:String,
    date:String,
    address:String,
    password:String,
    profileImage:String
  
});
/// employee model
const employee=mongoose.model('employee',{
    firstname:String,
    lastname:String,
    email:String,
    password:String,
    emptype:String,
    owntype:String,
    profileImage:String,
    contact:String,
    gender:String,
    
});

//client model 
const client=mongoose.model('client',{
    firstname:String,
    lastname:String,
    email:String,
    password:String,
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
app.post('/employee',upload.single('profileImage'),async(req,res)=>{
    const{firstname,lastname,email,password,emptype,owntype,contact,gender}=req.body;
    try{
        const imagepath=req.file?req.file.path:'';
     const  newEmployee=new employee({firstname,lastname,email,password,emptype,owntype,contact,gender,profileImage:imagepath});
     await newEmployee.save();
     res.json({message:'employee added success'});
    }
    catch(error){
     console.error('error duringg add employees',error);
     res.json(500).json({message:'interwalserver error'});
    }
});


//clieent post api

app.post('/client',async(req,res)=>{
    const{firstname,lastname,email,password,contact,gender}=req.body;
    try{
     const  clients=new client({firstname,lastname,email,password,contact,gender});
     await clients.save();
     res.json({message:'added success'});
    }
    catch(error){
     console.error('error duringg add',error);
     res.json(500).json({message:'interwalserver error'});
    }
});


// signup api

app.post('/signup', upload.single('profileImage'),async(req,res)=>{
    const {name,email,date,address,password}=req.body;
    try{
        const profileImagepath=req.file?req.file.path:'';

const newUser=new User({name,email,date,address,password,
    profileImage:profileImagepath});
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

//client data get api

app.get('/client/data',async(req,res)=>{
    try{
     const clients=await client.find();
     res.json({clients});
    }
    catch(error){
        console.error('error during fetch data',error);
        res.status(500).json({message:'innterwal  error'});
    }
});


 //Holiday data code get
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

//show data of users

app.get('/user/data',async(req,res)=>{
    try{
       const users=await User.find();
       res.json({users});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:'interwal error!'});

    }
})

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

//delete api of client data

app.delete('/client/data/:id',async (req,res)=>{
    try
    {
        const clientid=req.params.id;
        if(!mongoose.Types.ObjectId.isValid(clientid)){
            return res.status(400).json({message:'Invalid id'});
        }
        const deleteclient=await employee.findByIdAndDelete(clientid);
        if (!deleteclient){
         return res.status(404).json({message:'  not found'});
        }
        res.json({message:'deleted successfully'});

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

//delete api of holiday
app.delete('/holiday/data/:id', async(req,res)=>{
    try{
      const holidayid=req.params.id;
      if(!mongoose.Types.ObjectId.isValid(holidayid)){
          return res.status(400).json({message:'Invalid id'});
      }
      const deleteholiday=await holiday.findByIdAndDelete(holidayid);
      if(!deleteholiday){
         return res.status(404).json({message:'holiday not found'});
      }
      res.json({message:'Holiday delete success'});
    }
    catch(error){
       console.error(error);
       res.status(500).json({message:'interwal error!'});
    }
});

//delete api of leave

app.delete('/leave/data/:id',async(req,res)=>{
    try{
        const leaveid=req.params.id;
        if(!mongoose.Types.ObjectId.isValid(leaveid)){
            return res.status(400).json({message:'Invalid id'});
        }
        const deleteleave=await leave.findByIdAndDelete(leaveid);
        if(!deleteleave){
           return res.status(404).json({message:'holiday not found'});
        }
        res.json({message:'Leave delete success'});
    }
    catch(error){
     console.error(error);
     res.status(500).json({message:'error  during delete data'});
    }
});
