import React from "react";
import Header from './Header';
import Sidebar from './Sidebar';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Swal from "sweetalert2";
import axios from "axios";
import Clientdata from "./Clientdata";
const Clients=()=>{
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [Data,setData]=useState({
    firstname:'',
    lastname:'',
    email:'',
    password:'',
    contact:'',
    gender:''
  });
  const adduser=(e)=>{
    const {name,value}=e.target;
    
      setData({...Data,[name]:value});
    
  }
  
  const employee=async (e)=>{
        e.preventDefault();
        try{
  //call application programming interface
  const response= await axios.post('http://localhost:3001/client',Data);
  if(response && response.data){
    console.log(response.data);
    Swal.fire({
        icon:'Success',
        title:'Signup Succesfully',
        text:'Welcome back'
    })
  }
  else{
    console.error('Inavlid response data ',response);
  }
        }
        catch(error){
          console.error('error durinng signnup',error);
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
       
         <div className="main-container">
            <div style={{display:'flex'}}>
            <h2>Client</h2>
            <select className="search-bar-leave">
                    <option>Employee</option>
                    <option>HR Admin</option>
                    <option>Admin for Test</option>
                    <option>Test</option>
                </select>
            <input className="search-user-emp" type="search" placeholder="Search..."/>
            </div>
            <div>
      <Button variant="primary" onClick={handleShow} className="add-employee-btn">
        Add Client
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Client</Modal.Title>
        </Modal.Header>
       
        <Form onSubmit={employee}>

        <Modal.Body>
        <Row className="mb-3">
        
        <Form.Group as={Col} controlId="formGridEmail">
       First Name*
          <Form.Control type="text" name="firstname" onChange={adduser} value={Data.firstname} placeholder="First Name" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          Last Name*
          <Form.Control type="text" placeholder="Last Name" name='lastname' onChange={adduser} value={Data.lastname}/>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        
        <Form.Group as={Col} controlId="formGridEmail">
         Email*
          <Form.Control type="email" placeholder="Enter email" name='email'  onChange={adduser} value={Data.email}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          Password*
          <Form.Control type="password" placeholder="Password" name='password' onChange={adduser} value={Data.password}/>
        </Form.Group>
      </Row>

     
      <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridEmail">
          Country code*
      <Form.Control type="text" placeholder="+91" style={{width:'4vw'}}/>
         </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
         Mobile*
          <Form.Control type="text" placeholder="Enter Contact"name="contact" onChange={adduser} value={Data.contact}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          Gender*<br/>
          <input type="radio" name='gender' onChange={adduser} value={Data.gender}/> Male <input type="radio" name='gender' onChange={adduser} value={Data.gender}/> Female
        </Form.Group>
      </Row>
    
   
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
      </div><br/>
      <div>
        <Clientdata/>
      </div>
         </div>
         </div>
    )
}
export default Clients;