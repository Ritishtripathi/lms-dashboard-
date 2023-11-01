import React from "react"
import Sidebar from "./Sidebar";
import Header from "./Header";
function Leave(){
   
    return(
<div>
            <Header/>
              <Sidebar/>
               <div className='main-container'>
                <div style={{display:"flex"}} >
                <h4>Applied Leave</h4>
                <select className="search-bar-leave">
                    <option>..select..</option>
                    <option>Rejected</option>
                    <option>Pending</option>
                    <option>Approved</option>
                </select>
                <input className="search-bar-leave1" type="search" placeholder="Search..."/>
                </div>
               <div>
                <button className="pdf-btn">Export to PDF</button>
                <button className="pdf-btn1">Export to XI</button>
               </div>
           </div> 
    </div>
    )
}
export default Leave;
