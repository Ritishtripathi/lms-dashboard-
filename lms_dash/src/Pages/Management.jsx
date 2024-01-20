import React from "react";
import Sidebar from './Sidebar';
import Header from './Header';
import UsersData from "./UsersData";
function Management(){
    return(
          <div>
            <div>
                <Header/>
                 <Sidebar/>
            </div>
            <div className="main-container">
                <h3>Admin Management!</h3><br/><br/>
                <div style={{width:'75vw'}}>
                <UsersData/>
                </div>
            </div>
          </div>
    )
}
export default Management;