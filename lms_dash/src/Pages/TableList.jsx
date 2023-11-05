import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import Table from 'react-bootstrap/Table';
function TableList(){
    return(
        <div>
            
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
                    <th width={250}>Employee Name</th>
                    <th width={250}>Email</th>
                    <th width={250}>DOB</th>
                    <th width={200}>Password</th>
                    <th width={200}>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
        <td>Rtish</td>
                    <td>ritish@gmail.com</td>
                    <td>05-05-2002</td>
                    <td>12345</td>
                    <td><DeleteIcon style={{fontSize:'5vh',background:'red',color:'white'}}/><CheckIcon style={{fontSize:'5vh',background:'blue',color:'white',marginLeft:'1vw'}}/></td>
        </tr>
      </tbody>
    </Table>
        </div>
    )
}
export default TableList;