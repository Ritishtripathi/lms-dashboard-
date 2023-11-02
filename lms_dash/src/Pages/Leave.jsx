import React from "react"
import Sidebar from "./Sidebar";
import Header from "./Header";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Adduser from "../Pages/Adduser";

function Leave(){
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    return(
<div>
            <Header/>
              <Sidebar/>
               <div className='main-container'>
                <div style={{display:"flex"}} >
                <h4>Applied Leave</h4>
                <select className="search-bar-leave">
                    <option>--select--< /option>
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
        <Modal.Header closeButton >
          <span>Apply Leave</span>
        </Modal.Header>
        <Modal.Body>
            Leave type
                    <select className="select-apply-leave">
                        <option>Annual_Leave</option>
                        <option>Week_Leave</option>
                        <option>Day_Leave</option>
                    </select>
             
                <input type="radio" className="apply-leave-radio"/>Single Day<input type="radio" className="apply-leave-radio"/>Multi Day<input type="radio" className="apply-leave-radio"/>Half Day<br/><br/>
                <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
         From Date
          <Form.Control type="date"/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          To Date
          <Form.Control type="date"/>
        </Form.Group>
      </Row><br/>
      <Row>
      <Form.Group>
          Leave Duration
          <input type="text" className="select-apply-leave"/>
        </Form.Group>
      </Row><br/>
      <Row>
      <Form.Group>
         Remark (optional)
          <textarea className="text-area"/>
        </Form.Group>
      </Row><br/>
      <Row>
      <Form.Group>
      Leave Status
      <select className="select-apply-leave">
                        <option>Approved</option>
                        <option>Pending</option>
                        <option>Cancel</option>
                    </select>
        </Form.Group>
      </Row><br/>
      <Row>
      <Form.Group>
      Admin note
          <textarea className="text-area"/>
        </Form.Group>
      </Row><br/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    
               </div><br/><br/>
               < Adduser/>
           </div> 
          
    </div>
    )
}
export default Leave;
