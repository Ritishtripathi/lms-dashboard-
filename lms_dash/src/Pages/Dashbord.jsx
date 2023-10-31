import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import HomeIcon from '@mui/icons-material/Home';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
function Dashbord(){
    return(
    <div>
             <Header/>
              <Sidebar/>
               <div className='main-container'>
           <h4>Dashbord</h4>

           {/*card of dashbord */}

           <div className='card-of-dashbord'>
           <div className='card-dashbord'>
           <span className="icon-dashbord">
          <PermIdentityIcon style={{fontSize:'6vh'}}/></span>
          <span className='card-text-dashbord'>9<br/>Empolyee</span>
         </div>

          {/*card of dashbord */}

         <div className='card-dashbord'>
           <span className="icon-dashbord">
          <HomeIcon style={{fontSize:'6vh'}}/></span>
          <span className='card-text-dashbord'>1<br/>Departments</span>
         </div>

           {/*card of dashbord */}

           <div className='card-dashbord'>
           <span className="icon-dashbord">
          <EditCalendarIcon style={{fontSize:'6vh'}}/></span>
          <span className='card-text-dashbord'>20<br/>Leaves</span>
         </div>

           {/*card of dashbord */}

           <div className='card-dashbord'>
           <span className="icon-dashbord">
          <PersonRemoveIcon style={{fontSize:'6vh'}}/></span>
          <span className='card-text-dashbord'>0<br/>On leave today</span>
         </div>

         </div>

               
        </div>


    </div>
    );
}
export default Dashbord;