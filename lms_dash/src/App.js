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
       </Routes>
    </Router>
  );
}

export default App;
