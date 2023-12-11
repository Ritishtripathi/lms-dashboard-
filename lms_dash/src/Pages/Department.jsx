import React from "react";
import Header from "./Header";
import Sidebar from './Sidebar';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Swal from "sweetalert2";
import axios from "axios";
import Departmentdata from "./Departmentdata";
const Department=()=>{

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

const [data,setdata]=useState({
departmentname:'',
manager:'',
description:''
});

const handleDep =(e)=>{
    const {name,value}=e.target;
    setdata({...data,[name]:value});
}

const Department=async (e)=>{
   e.preventDefault();
   try{
      const response=await axios.post('http://localhost:3001/department',data);
      if(response && response.data){
        console.log(response.data);
        Swal.fire({
          icon:'success',
          titel:'success',
          text:'department added success'
          })
      }
   }
   catch(error){
    console.error('error durinng holiday',error);
    if(error.response && error.response.data){
        console.error('Error details:',error.response.data);
    }
    else{
       console.log('Unexpecte error'); 
    }
     }
}
    return(
          <div>
               <Header/>
               <Sidebar/>
               <div className='main-container'>
                <div  style={{display:"flex",gap:'35vw'}}>
                <h4>Department</h4>
               <input className="search-bar-leave1" type="search" placeholder="Search..."/>
                </div><br/>
                <div>
                <Button variant="primary" onClick={handleShow} style={{marginLeft:'67vw'}}>
        Add Department
      </Button>

      <Modal show={show} onHide={handleClose} animation={false} size="lg">
      <form onSubmit={Department}>
        <Modal.Header closeButton>
          <Modal.Title> Add Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
            <Row>
      <Form.Group>
         Department Name:
          <input type='text' className="select-apply-leave" name="departmentname" value={data.departmentname} onChange={handleDep}/>
        </Form.Group>
      </Row>
        
      <Row>
      <Form.Group>
      Manager
      <select className="select-apply-leave" name="manager"value={data.manager} onChange={handleDep} >
                        <option>HR Admin</option>
                        <option>Manager</option>
                        <option>CEO</option>
                        <option>CTO</option>
                    </select>
        </Form.Group>
      </Row><br/>
      <Row>
      <Form.Group>
      Description
          <textarea className="text-area" name="description" value={data.description} onChange={handleDep}/>
        </Form.Group>
      </Row><br/>
             
            

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type='submit'>
            Save
          </Button>
        </Modal.Footer>
        </form>

      </Modal>
                </div>
<Departmentdata/>

               </div>
          </div>
    );
}
export default Department;