
import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import { Button, Modal, Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';

const columns = [
  { id: 'firstname', label: 'Employee Name', minWidth: 150 },
  { id: 'email', label: 'Email', minWidth: 130 },
  { id: 'password', label: 'Password', minWidth: 120 },
  { id: 'action', label: 'Action', minWidth: 1 }
];

export default function Adduser() {
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [id, setId] = useState();
  const [contact, setContact] = useState();
  const [email, setEmail] = useState();
  const [emptype, setEmptype] = useState();
  const [firstname, setFirstname] = useState();
  const [gender, setGender] = useState();
  const [lastname, setLastname] = useState();
  const [owntype, setOwntype] = useState();
  const [password, setPassword] = useState();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = async (index, employeeid) => {
    try {
      const response = await fetch(`http://localhost:3001/employee/data/${employeeid}`, { method: 'DELETE' });

      if (!response.ok) {
        const data = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message || 'Failed to delete data'
        });
      }

      const updatedRows = [...rows];
      updatedRows.splice(page * rowsPerPage + index, 1);
      setRows(updatedRows);

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Delete success'
      });
    } catch (error) {
      console.error('Failed to delete ', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete'
      });
    }
  };

  const handleUpdate = (index, userId) => {
    setId(userId);
    fetchData(userId);
    handleShow();
  };

  const fetchData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3001/oneuser/${userId}`);
      const userData = response.data.data;

      if (!response.data) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch user details'
        });
        return;
      }

      const { firstname, lastname, email, password, emptype, owntype, profileImage, contact, gender } = userData;

      setId(userId);
      setFirstname(firstname);
      setLastname(lastname);
      setEmail(email);
      setPassword(password);
      setEmptype(emptype);
      setOwntype(owntype);
      setContact(contact);
      setGender(gender);
      // Set other state variables accordingly...
    } catch (error) {
      console.error('Failed to fetch user details', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch user details'
      });
    }
  };

  const handelUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:3001/oneuser/${id}`, {
        firstname,
        lastname,
        email,
        password,
        emptype,
        owntype,
        contact,
        gender
        // Add other fields here...
      });

      if (res.data) {
        handleClose();
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Update successful'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update user'
        });
      }
    } catch (error) {
      console.error('Failed to update user', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update user'
      });
    }
  };

  useEffect(() => {
    fetch('http://localhost:3001/employee/data')
      .then((response) => response.json())
      .then((data) => {
        const employeeArray = Array.isArray(data) ? data : data.employees || [];
        setRows(employeeArray.map((employee) => ({ ...employee, id: employee._id })));
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="left"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => (
                      <TableCell key={column.id} align="left">
                        {row[column.id]}
                      </TableCell>
                    ))}
                    <TableCell>
                      <EditIcon onClick={() => handleUpdate(index, row._id)} />
                    </TableCell>
                    <TableCell>
                      <DeleteIcon onClick={() => handleDelete(index, row._id)} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>

        <Form>
          <Modal.Body>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                First Name*
                <Form.Control
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                Last Name*
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  name="lastname"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                Email*
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                Password*
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                User Type*
                <Form.Select
                  defaultValue="Choose..."
                  name="emptype"
                  value={emptype}
                  onChange={(e) => setEmptype(e.target.value)}
                >
                  <option>Employee</option>
                  <option>HR</option>
                  <option>Other</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                Manager
                <Form.Select
                  defaultValue="Choose..."
                  name="owntype"
                  value={owntype}
                  onChange={(e) => setOwntype(e.target.value)}
                >
                  <option>Testing Engineer</option>
                  <option>SE</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                Contact*
                <Form.Control
                  type="text"
                  placeholder="Enter Contact"
                  name="contact"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                Gender*<br />
                <input
                  type="radio"
                  name="gender"
                  checked={gender === 'Male'}
                  onChange={() => setGender('Male')}
                />{' '}
                Male{' '}
                <input
                  type="radio"
                  name="gender"
                  checked={gender === 'Female'}
                  onChange={() => setGender('Female')}
                />{' '}
                Female
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" onClick={handelUpdate}>
              Update
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}