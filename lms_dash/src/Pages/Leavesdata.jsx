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

const columns = [
  { id: 'leave', label: 'Leave-type', minWidth: 150 },
  { id: 'from', label: 'From-date', minWidth: 130 },

  { id: 'to', label: 'To-date', minWidth: 120 },
  { id: 'status', label: 'Status', minWidth: 1 },
];

function createData(leave,from,to,status){
  return { leave,from,to,status };
}

export default function Leavesdata() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/leave/data')
      .then((response) => response.json())
      .then((data) => {
        // Check if data is an array or if it's an object with an array property
        const leaveArray = Array.isArray(data) ? data : data.leaves || [];
        setRows(leaveArray.map((leave) => createData(leave.leavetype, leave.fromdate,leave.todate, leave.leavestatus)));
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