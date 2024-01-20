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
            <Nav.Link ><img src={profile} className="p-header-icon"/></Nav.Link>
          </Nav>
      </Container>
    </Navbar>
   
  </div>
  )
}
export default Header;

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Avatar from '@mui/material/Avatar';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Tooltip from '@mui/material/Tooltip';
// import PersonAdd from '@mui/icons-material/PersonAdd';
// import Settings from '@mui/icons-material/Settings';
// import Logout from '@mui/icons-material/Logout';

// export default function Header() {
//   const storedata =  localStorage.getItem('data');
//     const data=storedata ? JSON.parse(storedata): null;
//     console.log("GETDATA BY LOCALSTORAGE",data);
//     const name=data.name;
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   return (
//     <React.Fragment>
//       <Box sx={{ display: 'flex', alignItems: 'center' ,background:'whitesmoke'}}>
         
//         <Typography><img src={logo} className="header-logo"/></Typography>
//         <Typography style={{marginLeft:'2vw'}}  > <ReplayIcon/> </Typography>
//         <Typography style={{marginLeft:'1vw'}}  >  refresh</Typography>
//         <Typography>  <span style={{fontSize:'30px',marginLeft:'60vw'}}>|</span></Typography>
//         <Typography style={{marginLeft:'1vw',paddingTop:'1vh'}} ><p style={{color:'black',fontSize:'13px'}}> Welcome <br/>{name}</p></Typography>
//         <Tooltip title="Account settings">
//           <IconButton
//             onClick={handleClick}
//             size="small"
//             sx={{ ml: 2 }}
//             aria-controls={open ? 'account-menu' : undefined}
//             aria-haspopup="true"
//             aria-expanded={open ? 'true' : undefined}
//           >
//             <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
//           </IconButton>
//         </Tooltip>
//       </Box>
//       <Menu
//         anchorEl={anchorEl}
//         id="account-menu"
//         open={open}
//         onClose={handleClose}
//         onClick={handleClose}
//         PaperProps={{
//           elevation: 0,
//           sx: {
//             overflow: 'visible',
//             filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
//             mt: 1.5,
//             '& .MuiAvatar-root': {
//               width: 32,
//               height: 32,
//               ml: -0.5,
//               mr: 1,
//             },
//             '&::before': {
//               content: '""',
//               display: 'block',
//               position: 'absolute',
//               top: 0,
//               right: 14,
//               width: 10,
//               height: 10,
//               bgcolor: 'background.paper',
//               transform: 'translateY(-50%) rotate(45deg)',
//               zIndex: 0,
//             },
//           },
//         }}
//         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//       >
//         <MenuItem onClick={handleClose}>
//           <Avatar /> Profile
//         </MenuItem>
//         <Divider />
//         <MenuItem onClick={handleClose}>
//           <ListItemIcon>
//             <Settings fontSize="small" />
//           </ListItemIcon>
//           Settings
//         </MenuItem>
//         <MenuItem onClick={handleClose}>
//           <ListItemIcon>
//             <Logout fontSize="small" />
//           </ListItemIcon>
//           Logout
//         </MenuItem>
//       </Menu>
//     </React.Fragment>
//   );
// }