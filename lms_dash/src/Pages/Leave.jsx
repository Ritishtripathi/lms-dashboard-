import React from "react"
import Sidebar from "./Sidebar";
import Header from "./Header";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import Leavesdata from "./Leavesdata";
import Swal from "sweetalert2";
import axios from "axios";
function Leave(){
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [formdata,setformdata]=useState({
    leavetype:'',
    leavedays:'',
    fromdate:'',
    todate:'',
    leavedur:'',
    leavemark:'',
    leavestatus:'',
    leavenote:''
  });
  const leavehandle=(e)=>{
    const {name,value}=e.target;
    setformdata({...formdata,[name]:value});
  }
  
  const leavesubmit=async (e)=>{
        e.preventDefault();
        try{
  //call application programming interface
  const response= await axios.post('http://localhost:3001/leave',formdata);
  if(response && response.data){
    console.log(response.data);
    Swal.fire({
      icon:'success',
      titel:'success',
      text:'leave added success'
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
               <div className='main-container'>
                <div style={{display:"flex"}} >
                <h4>Applied Leave</h4>
                <select className="search-bar-leave">
                    <option>--select-- </option>
                    <option>Rejected</option>
                    <option>Pending</option>
                    <option>Approved</option>
                </select>
                <input className="search-bar-leave1" type="search" placeholder="Search..."/>
                </div>
               <div>
                <button className="pdf-btn1">Export to PDF</button>
                <button className="pdf-btn">Export to XI</button>
                <button className="pdf-btn" onClick={handleShow}>
                Apply for leave
                </button>
               
      <Modal show={show} onHide={handleClose} animation={false} size="lg">

        <form onSubmit={leavesubmit}>

      
        <Modal.Header closeButton >
          <span>Apply Leave</span>
        </Modal.Header>
        <Modal.Body>
            Leave type
                    <select className="select-apply-leave" name='leavetype' value={formdata.leavetype} onChange={leavehandle}>
                        <option>Annual_Leave</option>
                        <option>Week_Leave</option>
                        <option>Day_Leave</option>
                    </select>
             
                <input type="radio" className="apply-leave-radio" name='leavedays' value={formdata.leavedays} onChange={leavehandle}/>Single Day<input type="radio" className="apply-leave-radio" name='leavedays' value={formdata.leavedays} onChange={leavehandle}/>Multi Day<input type="radio" className="apply-leave-radio" name='leavedays' value={formdata.leavedays} onChange={leavehandle}/>Half Day<br/><br/>
                <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
         From Date
          <Form.Control type="date" name='fromdate' value={formdata.fromdate} onChange={leavehandle}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          To Date
          <Form.Control type="date" name='todate' value={formdata.todate} onChange={leavehandle}/>
        </Form.Group>
      </Row><br/>
      <Row>
      <Form.Group>
          Leave Duration
          <input type="text" className="select-apply-leave" name='leavedur' value={formdata.leavedur} onChange={leavehandle}/>
        </Form.Group>
      </Row><br/>
      <Row>
      <Form.Group>
         Remark (optional)
          <textarea className="text-area" name='leavemark' value={formdata.leavemark} onChange={leavehandle}/>
        </Form.Group>
      </Row><br/>
      <Row>
      <Form.Group>
      Leave Status
      <select className="select-apply-leave" name='leavestatus' value={formdata.leavestatus} onChange={leavehandle}>
                        <option>Approved</option>
                        <option>Pending</option>
                        <option>Cancel</option>
                    </select>
        </Form.Group>
      </Row><br/>
      <Row>
      <Form.Group>
      Admin note
          <textarea className="text-area" name='leavenote' value={formdata.leavenote} onChange={leavehandle}/>
        </Form.Group>
      </Row><br/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary"type='submit'>
            Submit
          </Button>
        </Modal.Footer>
        </form>
      </Modal>
    
               </div><br/><br/>
               <Leavesdata/>
           </div> 
          
    </div>
    )
}
export default Leave;
