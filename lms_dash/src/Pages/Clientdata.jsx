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
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Swal from 'sweetalert2';

const columns = [
  { id: 'firstname' ,label: 'Name', minWidth: 150 },
  { id: 'email', label: 'Email', minWidth: 130 },
  { id: 'contact', label: 'Contact', minWidth: 130 },
  { id: 'action', label: 'Action', minWidth: 1 },
  { id: 'whatsapp', label: 'WhatsApp', minWidth: 1 },
];

export default function Clientdata() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/client/data')
      .then((response) => response.json())
      .then((data) => {
        const clientArray = Array.isArray(data) ? data : data.clients || [];
        setRows(clientArray.map((client) => ({ ...client, id: client._id })));
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

  const handleUpdate = (index, clientId) => {
    console.log('Update at index:', index);
  };

  const handleDelete = async (index, clientId) => {
    try {
      console.log(clientId);
               
      // if (!clientId || typeof clientId !== 'string') {
      //   console.error('Invalid  ID:', clientId);
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Error',
      //     text: 'Invalid ID',
      //   });
      //   return;
      // }

      const response = await fetch(`http://localhost:3001/client/data/${clientId}`, { method: 'DELETE',
      });

      // if (!response.ok) {
      //   const data = await response.json();
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Error',
      //     text: data.message || 'Failed to delete',
      //   });
      //   return;
      // }

      const updatedRows = [...rows];
      updatedRows.splice(page * rowsPerPage + index, 1);
      setRows(updatedRows);

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'deleted successfully',
      });
    } 
    catch (error) {
      console.error('Failed to delete', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete',
      });
    }
  };

  const handleWhatsApp = (contact) => {
    const whatsappURL = `https://wa.me/${contact}`;
    window.open(whatsappURL);
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
                      {column.id === 'action' ? (
                        <>
                          <EditIcon onClick={() => handleUpdate(index, row._id)} />
                          <DeleteIcon onClick={() => handleDelete(index, row._id)} />
                        </>
                      ) : column.id === 'whatsapp' ? (
                        <WhatsAppIcon onClick={() => handleWhatsApp(row.contact)} style={{color:'green'}}/>
                      ) : (
                        row[column.id]
                      )}
                    </TableCell>
                  ))}
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