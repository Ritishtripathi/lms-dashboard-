import React from 'react';
import pagepic from '../Images/page.jpg';
import logo from '../Images/logo.jpg';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Link} from "react-router-dom";

function Signup(){
  
    
   
    return(
           <div className="container">
            <div className='main'>
                <img src={pagepic} className="pageimg"/>
            </div>
            <div className='second'>
                <img src={logo} className="logoimg"/><br/>
                <span className="heding">Signup here</span>
                <form className="loginform">
                <label>Name</label>
                    <label><input type="text" placeholder='enter your name' className="inputlogin" /></label>
                    <label>Email</label>
                    <label><input type="email" placeholder='enter email' className="inputlogin" /></label>
                    <label>DOB</label>
                    <label><input type="date"className="inputlogin" /></label>
                    <label>Address</label>
                    <label><input type="text" placeholder='enter ur address' className="inputlogin" /></label>
                    
                    <label>Password</label>
                    <label><input type="password" placeholder='enter password' className="inputlogin" />
                    </label><br/>
                    
                    <label><button className="buttonlogin">Signup</button></label><br/>
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