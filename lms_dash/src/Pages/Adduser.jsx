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
  { id: 'image', label: 'Image', minWidth: 100 },
  { id: 'firstname', label: 'Employee Name', minWidth: 150 },
  { id: 'email', label: 'Email', minWidth: 130 },
  { id: 'password', label: 'Password', minWidth: 120 },
  { id: 'action', label: 'Action', minWidth: 1 },
];

export default function Adduser() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    // Fetch image URLs from your API
    fetch('http://localhost:3001/employee/images')
      .then((response) => response.json())
      .then((data) => setImageUrls(data.imageUrls))
      .catch((error) => console.error('Error fetching image URLs:', error));

    // Fetch employee data
    fetch('http://localhost:3001/employee/data')
      .then((response) => response.json())
      .then((data) => {
        const employeeArray = Array.isArray(data) ? data : data.employees || [];
        setRows(
          employeeArray.map((employee, index) => ({
            ...employee,
            id: employee._id,
            imageUrl: imageUrls[index],
          }))
        );
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [imageUrls]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = async (index, employeeid) => {
    try {
      // ... (previous code for delete)
    } catch (error) {
      console.error('failed to delete employee', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'failed to delete',
      });
    }
  };

  const handleUpdate = (index) => {
    console.log('Update employee at index:', index);
    // Implement the logic for updating employee data
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
                      {column.id === 'image' ? (
                        <img
                          src={row.imageUrl} // Use the fetched image URL for each employee
                          alt="Employee"
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                      ) : (
                        row[column.id]
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    <EditIcon onClick={() => handleUpdate(index)} />
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
  );
}
