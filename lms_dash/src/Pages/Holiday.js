import React from "react";
import Header from "./Header";
import Sidebar from './Sidebar';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import Swal from "sweetalert2";
const Holiday=()=>{

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const[Data,setData]=useState({
    name:'',
    fromdate:'',
    todate:'',
    remark:''
  });
  //onchange data setup
  const holiday=(e)=>{
     const {name,value}=e.target;
     setData({...Data,[name]:value});
  }
//onsumit handle

const holidaysumit=async(e)=>{
    e.preventDefault();
    try{
        const response=await axios.post('http://localhost:3001/holiday',Data);
        if(response && response.data){
            console.log(response.data);
            Swal.fire({
                icon:'Success',
                title:'holiday added Succesfully',
                text:'Welcome back'
            })
        }
        else{
            console.error('error during',response);
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
                <h4>Holiday</h4>
               <input className="search-bar-leave1" type="search" placeholder="Search..."/>
                </div><br/>
                <div>
                <Button variant="primary" onClick={handleShow} style={{marginLeft:'67vw'}}>
        Add Holiday
      </Button>

      <Modal show={show} onHide={handleClose} animation={false} size="lg">
      <form onSubmit={holidaysumit}>
        <Modal.Header closeButton>
          <Modal.Title> Add Holiday</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           
            <Row>
      <Form.Group>
         Name:
          <input type='text' className="select-apply-leave" name='name' value={Data.name} onChange={holiday}/>
        </Form.Group>
      </Row><br/>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
         From Date
          <Form.Control type="date" name="fromdate" value={Data.fromdate} onChange={holiday}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          To Date
          <Form.Control type="date" name="todate" value={Data.todate} onChange={holiday} />
        </Form.Group>
      </Row><br/>
      <Row>
      <Form.Group>
      Remark
          <textarea className="text-area" name="remark" value={Data.remark} onChange={holiday}/>
        </Form.Group>
      </Row><br/>
             
           


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Modal.Footer>
        </form>
      </Modal>
                </div>
               </div>
          </div>
    );
}
export default Holiday;