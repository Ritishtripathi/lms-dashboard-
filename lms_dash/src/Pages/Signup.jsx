import React, { useState } from 'react';
import pagepic from '../Images/page.jpg';
import logo from '../Images/logo.jpg';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';


const  Signup=()=>{
  
    const [formData,setFormtData]=
useState({
    name:'',
    email:'',
    date:'',
    address:'',
    password:''
});
const Navigate=useNavigate();

const  hanlechange=(e)=>{
const {name,value}=e.target;
setFormtData({...formData,[name]:value});
};
const signupsubmit=async (e)=>{
    e.preventDefault();
    try{
// api call 
const response = await axios.post('http://localhost:3001/signup',formData);
if(response && response.data){
    console.log(response.data);
    Swal.fire({
        icon:'Success',
        title:'Signup Succesfully',
        text:'Welcome back'
    })
    Navigate('/Login');
    
}
else{
    console.error('Inavlid response data ',response);
}
    }
    catch (error){
console.error('error durinng signnup',error);
if(error.response && error.response.data){
    console.error('Error details:',error.response.data);
}
else{
   console.log('Unexpecte error'); 
}
    }
};
   
    return(
           <div className="container">
            <div className='main'>
                <img src={pagepic} className="pageimg"/>
            </div>
            <div className='second'>
                <img src={logo} className="logoimg"/><br/>
                <span className="heding">Signup here</span>
                <form className="loginform" onSubmit={signupsubmit}>
                <label>Name</label>
                    <label><input type="text" name='name' value={formData.name} onChange={hanlechange} placeholder='enter your name' className="inputlogin" /></label>
                    <label>Email</label>
                    <label><input type="email" name='email' value={formData.email} onChange={hanlechange} placeholder='enter email' className="inputlogin" /></label>
                    <label>DOB</label>
                    <label><input type="date" name='date' value={formData.date} onChange={hanlechange} className="inputlogin" /></label>
                    <label>Address</label>
                    <label><input type="text" name='address' value={formData.address} onChange={hanlechange} placeholder='enter ur address' className="inputlogin" /></label>
                    
                    <label>Password</label>
                    <label><input type="password" name='password'value={formData.password} onChange={hanlechange} placeholder='enter password' className="inputlogin" />
                    </label><br/>
                    
                    <label><button type='submit' className="buttonlogin">Signup</button></label><br/>
                    <label ><input className="remeder" type="checkbox"/> Remendar me
                    <LockOpenIcon  style={{marginLeft:'6vw'}}/><Link to="/Forget"  style={{textDecoration:'none'}}>Forget <p style={{marginLeft:'15vw'}}> Password?</p></Link>
                    
                  
                    </label>
                </form><br></br><br></br>
                <span className="copyright">Copyright @ 2023 by Ritish Tripathi.</span>
            </div>
           </div>
    );
}
export default Signup;