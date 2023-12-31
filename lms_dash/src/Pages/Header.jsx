import React from "react";
import logo from '../Images/logo.jpg';
import profile from '../Images/user.jpg';
import { Link } from "react-router-dom";
import ReplayIcon from '@mui/icons-material/Replay';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
function Header(){

  const storedata =  localStorage.getItem('data');
  const data=storedata ? JSON.parse(storedata): null;
  console.log("GETDATA BY LOCALSTORAGE",data);
  const name=data.name;
  return(
  <div>
    
  <Navbar bg="light" data-bs-theme="light" fixed="top" style={{height:'10vh'}}>
  <img src={logo} className="header-logo"/>
      <Container>
      <Nav>
            <Nav.Link href="/Dashbord"  className="header-item"><ReplayIcon/></Nav.Link>
            <Nav.Link href="/Dashbord" className="header-item2" >refresh</Nav.Link>
            <Nav.Link href="/Dashbord" className="header-item"><NotificationsIcon/></Nav.Link>
            <Nav.Link><span style={{fontSize:'30px'}}>|</span></Nav.Link>
            <Nav.Link>Welcome <br/><p style={{color:'black'}}>{name}</p></Nav.Link>
            <Nav.Link><img src={profile} className="p-header-icon"/></Nav.Link>
          </Nav>
      </Container>
    </Navbar>
   
  </div>
  )
}
export default Header;