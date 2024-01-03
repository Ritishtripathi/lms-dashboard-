import React from 'react';
import Style from './Style.css';
import Login from './Pages/Login';
import Dashbord from './Pages/Dashbord';
import { BrowserRouter as Router, Routes ,Route} from 'react-router-dom';
import Header from './Pages/Header';
import Sidebar from './Pages/Sidebar';
import Forget from './Pages/Forget';
import Thank from './Pages/Thank';
import Employee from './Pages/Employee';
import Adduser from './Pages/Adduser';
import Leave from './Pages/Leave';
import TableList from './Pages/TableList';
import Signup from './Pages/Signup';
import Department from './Pages/Department';
import Holiday from './Pages/Holiday';
import Leavesdata from './Pages/Leavesdata';
import Departmentdata from './Pages/Departmentdata';
import Holidaydata from './Pages/Holidaydata';
import Clients from './Pages/Clients';
import Clientdata from './Pages/Clientdata';
function App() {
  return (
    <Router>
       <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path="/Header" element={<Header/>}/>
        <Route path='/Dashbord' element={<Dashbord/>}/>
        <Route path='/Sidebar' element={<Sidebar/>}/>
        <Route path='/Forget' element={<Forget/>}/>
        <Route path='/Thank' element={<Thank/>}/>
        <Route path='/Employee' element={<Employee/>}/>
        <Route path='/Adduser' element={<Adduser/>}/>
        <Route path='/Leave' element={<Leave/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path="/TableList" element={<TableList/>}/>
        <Route path='/Department' element={<Department/>}/>
        <Route path='/Holiday' element={<Holiday/>}/>
        <Route path='/Leavesdata' element={<Leavesdata/>}/>
        <Route path=' Departmentdata' element={< Departmentdata/>}/>
        <Route path='/Holidaydata' element={<Holidaydata/>}/>
        <Route path='/clients' element={<Clients/>}/>
        <Route path='/Clientdata' element={<Clientdata/>}/>

       </Routes>
    </Router>
  );
}

export default App;
