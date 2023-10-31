import React from "react";
import logo from '../Images/logo.jpg';
import profile from '../Images/user.jpg';
import { Link } from "react-router-dom";
import ReplayIcon from '@mui/icons-material/Replay';
import NotificationsIcon from '@mui/icons-material/Notifications';
function Header(){
  return(
  <div className="header-container">
    <img src={logo} className="header-logo"/>
    <ul className="header-ul">
      <li><ReplayIcon/></li>
      <li><Link to="/Dashbord" className="link-header"> refresh</Link></li>
      
      <li className="header-mr"><NotificationsIcon/> |<br/> </li>
      <li>Welcome</li>
      <li><img src={profile} className="p-header-icon"/></li>
    </ul>
  
  </div>
  )
}
export default Header;