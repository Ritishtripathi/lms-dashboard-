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
const columns = [
  { id: 'firstname', label: 'Employee Name', minWidth: 150 },
  { id: 'email', label: 'Email', minWidth: 130 },

  { id: 'password', label: 'Password', minWidth: 120 },
  { id: 'action', label: 'Action', minWidth: 1 },
];

// function createData(name, email, dob, password){
//   return { name, email, dob, password };
// }

export default function Adduser() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/employee/data')
      .then((response) => response.json())
      .then((data) => {
        // Check if data is an array or if it's an object with an array property
        const employeeArray = Array.isArray(data) ? data : data.employees || [];
        setRows(employeeArray.map((employee)=>({...employee,id:employee._id})));
        // setRows(employeeArray.map((employee) => createData(employee.firstname, employee.email, employee.dob, employee.password)));
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

   const handleDelete = async (index,employeeid)=>{

    try{
console.log("here is id of delete",employeeid);

// validate if employee is a non-empty string 
if(!employeeid || typeof employeeid!=='string'){
  console.error('Invalid id');
  Swal.fire({
    icon:'error',
    title:'Error',
    text:'Inavalid employee_Id',
  });
  return;
}

/// deleting data 
const response =await fetch(`http://localhost:3001/employee/data/${employeeid}`,{method:'DELETE',});
if(!response.ok){
  const data =await response.json();
  Swal.fire({
    icon:'error',
    title:'Error',
    text:data.message || 'Failed to delete data '
  });
}
// if succesfull delete 
const updatedRows=[...rows];
updatedRows.splice(page * rowsPerPage+ index,1);
setRows(updatedRows);
Swal.fire({
icon:'success',
titel:'success',
texT:'Employee delete success'
})

    }
    catch (error){
console.error('failed to delete employee',error);
Swal.fire({
  icon:'error',
  title:'Error',
  text:'failed to delete'
});
    }

   };
  const handleUpdate = (index) => {
    // Here you can implement the logic to update the employee data
    // For example, you can show a modal for editing or send a request to the server
    console.log('Update employee at index:', index);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="left" // Change alignment as needed
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
                    <EditIcon onClick={() => handleUpdate(index)} />
                  </TableCell>
                  <TableCell>
                    <DeleteIcon onClick={() =>handleDelete(index,row._id)}/>
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
  );
}