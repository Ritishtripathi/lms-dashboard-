import React from 'react';
import pagepic from '../Images/page.jpg';
import logo from '../Images/logo.jpg';
import { useState } from 'react';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import {Link, useNavigate } from "react-router-dom";

import axios from 'axios';
import Swal from 'sweetalert2';
const  Login=()=>{
  //login field require
    const [FormData,setFormtData]=
    useState({
      email:'',
      password:''
    })
  const Navigate=useNavigate();
   const Change=(e)=>{
    const {name,value}=e.target;
    setFormtData({...FormData,[name]:value});
   }
// call api 

const Loginsubmit=async (e)=>{
  e.preventDefault();
  try{
const response =await axios.post('http://localhost:3001/login',FormData);
if(response && response.data){
  console.log("reasponse data",response);
  Swal.fire({
    icon:'success',
    titel:'success',
    text:'Welcome in LMS!'
    })
  Navigate('/Dashbord');
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
                <span className="heding">Login to your dashboard</span>
                <form className="loginform" onSubmit={Loginsubmit}>
                    <label>Email</label>
                    <label><input type="email"  placeholder='enter email'  className="inputlogin" name='email' value={FormData.email} onChange={Change}/></label>
                    <label>Password</label>
                    <label><input type="password" placeholder='enter password' className="inputlogin" name='password' value={FormData.password} onChange={Change}/>
                    </label><br/>
                    
                    <label><button className="buttonlogin" type='submit'>Login </button></label><br/>
                    <label ><input className="remeder" type="checkbox"/> Remendar me
                    <LockOpenIcon  style={{marginLeft:'6vw'}}/><Link to="/Forget"  style={{textDecoration:'none'}}>Forget <p style={{marginLeft:'15vw'}}> Password?</p></Link>
                    </label>
                    <label><b>New User ? </b><Link to="/Signup"  style={{textDecoration:'none'}}>
                      Register here</Link></label>
                </form><br></br><br></br>
                <span className="copyright">Copyright @ 2023 by Ritish Tripathi.</span>
            </div>
           </div>
    );
}
export default Login;