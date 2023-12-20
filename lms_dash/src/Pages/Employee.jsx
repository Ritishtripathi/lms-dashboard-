import React, { useState, useEffect } from 'react';
import Header from './Header';
import Adduser from './Adduser';
import Sidebar from './Sidebar';
import { Button, Modal, Col, Form, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';

const Employee = () => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [Data, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    emptype: '',
    owntype: '',
    profileImage: null,
    contact: '',
    gender: '',
  });
  const [rows, setRows] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const resetForm = () => {
    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      emptype: '',
      owntype: '',
      profileImage: null,
      contact: '',
      gender: '',
    });
  };

  const adduser = (e) => {
    const { name, value, files, type } = e.target;
    if (type === 'file') {
      setFormData({ ...Data, [name]: files[0] });
    } else {
      setFormData({ ...Data, [name]: value });
    }
  };

  const fetchData = () => {
    fetch('http://localhost:3001/employee/data')
      .then((response) => response.json())
      .then((data) => {
        const employeeArray = Array.isArray(data) ? data : data.employees || [];
        setRows(employeeArray.map((employee) => ({ ...employee, id: employee._id })));
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on component mount

  const employee = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const DataForApi = new FormData();
      for (const key in Data) {
        DataForApi.append(key, Data[key]);
      }

      const response = await axios.post('http://localhost:3001/employee', DataForApi);
      if (response && response.data) {
        console.log(response.data);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Employee added successfully',
        });

        // Close the modal
        handleClose();

        // Fetch updated data and refresh the model
        fetchData();

        // Reset the form fields
        resetForm();
      } else {
        console.error('Invalid response data ', response);
      }
    } catch (error) {
      console.error('Error during signup', error);
      if (error.response && error.response.data) {
        console.error('Error details:', error.response.data);
      } else {
        console.log('Unexpected error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <Sidebar />

      <div className="main-container">
        <div style={{ display: 'flex' }}>
          <h2>Users</h2>
          <select className="search-bar-leave">
            <option>Employee</option>
            <option>HR Admin</option>
            <option>Admin for Test</option>
            <option>Test </option>
          </select>
          <input className="search-user-emp" type="search" placeholder="Search..." />
        </div>
        <div>
          <Button variant="primary" onClick={handleShow} className="add-employee-btn">
            Add Employee
          </Button>

          <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Add Employee</Modal.Title>
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
                    <Form.Control type="text" placeholder="Last Name" name="lastname" onChange={adduser} value={Data.lastname} />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    Email*
                    <Form.Control type="email" placeholder="Enter email" name="email" onChange={adduser} value={Data.email} />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    Password*
                    <Form.Control type="password" placeholder="Password" name="password" onChange={adduser} value={Data.password} />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridState">
                    User Type*
                    <Form.Select defaultValue="Choose..." name="emptype" onChange={adduser} value={Data.emptype}>
                      <option>Employee</option>
                      <option>HR</option>
                      <option>Other</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                    Manager
                    <Form.Select defaultValue="Choose..." name="owntype" onChange={adduser} value={Data.owntype}>
                      <option>Testing Enginner</option>
                      <option>SE</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    Image*
                    <Form.Control type="file" name="profileImage" onChange={adduser} accept="image/*" />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridEmail">
                    Mobile*
                    <Form.Control type="text" placeholder="Enter Contact" name="contact" onChange={adduser} value={Data.contact} />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridPassword">
                    Gender*<br />
                    <input type="radio" name="gender" onChange={adduser} value={Data.gender} /> Male{' '}
                    <input type="radio" name="gender" onChange={adduser} value={Data.gender} /> Female
                  </Form.Group>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  {isLoading ? 'Saving...' : 'Save'}
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </div>
        <br />
        <div>
          <Adduser rows={rows} setRows={setRows} />
        </div>
      </div>

    
    </div>
  );
};

export default Employee;
