import React, { useState } from 'react';
import pagepic from '../Images/page.jpg';
import logo from '../Images/logo.jpg';
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
    password:'',
    Active:'false'
    
});
const Navigate=useNavigate();

const  hanlechange=(e)=>{
const {name,value}=e.target;
setFormtData({...formData,[name]:value})

};
const signupsubmit=async (e)=>{
    e.preventDefault();
    try{
// api call 
const response = await axios.post('http://localhost:3001/signup',formData);
if(response && response.data){
    console.log(response.data);
    Swal.fire({
        icon:'success',
        titel:'success',
        text:'Reggistration successfully!'
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
                <img src={logo} className="logoimg" /><br/>
                <span className="heding-signup">Signup here if you're new? user</span>
                <form className="sign-form" onSubmit={signupsubmit} >
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
                    {/* <label>
                        RoleTypes
                    </label>
                    <select  name='RoleType' value={formData.RoleType} onChange={hanlechange} >
                        <option value="1" >Admin</option>
                        <option value="0" >Super Admin</option>
                    </select>
                    
                    <label>Profile Image</label>
                    <label>
                        <input  type='file' name="profileImage"
                        onChange={hanlechange} accept='image/*' className='inpulogin'  />
                    </label> */}
                   
                    <label><button type='submit' className="buttonlogin">Signup</button></label><br/>
                </form><br></br>
                <span className="copyright">Copyright @ 2023 by Ritish Tripathi.</span>
            </div>
           </div>
    );
}
export default Signup;