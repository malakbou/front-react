import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, IconButton } from '@material-ui/core';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@material-ui/core';
import './EmployeeList.css';


import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import axios from 'axios';
import EditEmployee from './EditEmployee';
import DeleteEmployee from './DeleteEmployee';

const EmployeeList = ({ refreshEmployees }) => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false); 
    const [selectedEmployeeDetails, setSelectedEmployeeDetails] = useState(null);


    useEffect(() => {
        fetchEmployees();
    });

  //   useEffect(() => {
  //     if (selectedEmployee && employees) {
  //         const employeeDetails = employees.find(employee => employee.id === selectedEmployee);
  //         setSelectedEmployeeDetails(employeeDetails);
  //         console.log(selectedEmployee);
  //     }
  // }, [selectedEmployee, employees]);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/employes').then((response)=> {
            setEmployees(response.data.employes);
            // console.log('Employes:',response.data.employes);
            // refreshEmployees();

            }).catch((error)=>{
              console.log('error =', error);
            });


        } catch (error) {
            console.error('Erreur lors de la récupération des employés :', error);
        }
    };

    
    const onEdit = (employeeId) => {
        // Code pour gérer l'édition de l'employé avec l'ID employeeId
        handleEdit(employeeId); // Appeler la fonction handleEdit avec l'ID de l'employé
    };
    
    const onDelete = (employeeId) => {
        // Code pour gérer la suppression de l'employé avec l'ID employeeId
        handleOpenDeleteDialog(employeeId); // Appeler la fonction handleOpenDeleteDialog avec l'ID de l'employé
    };
    

    const updateEmployeeInList = (updatedEmployee) => {
        const updatedEmployees = employees.map((employee) =>
            employee.id === updatedEmployee.id ? updatedEmployee : employee
        );
        setEmployees(updatedEmployees);
    };

    const handleUpdateEmployee = async (updatedEmployee) => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/employes/${updatedEmployee.id}`, updatedEmployee);
            updateEmployeeInList(updatedEmployee);
            refreshEmployees();
            handleCloseEditDialog();
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'employé :', error);
        }
    };


    const handleEdit = (employeeId) => {
        setSelectedEmployee(employeeId);
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setSelectedEmployee(null);
    };


    const handleOpenDeleteDialog = (employeeId) => {
        setSelectedEmployee(employeeId);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setSelectedEmployee(null);
    };



    return (
    <Paper style={{ margin: '16px 0', width: '100%' }}>
            <Typography variant="h6" style={{ padding: '16px' }}>Liste des Employés</Typography>
            <TableContainer component={Paper} style={{ width: '100%' }}>
      <Table style={{ width: '100%' }}>
        <TableHead>
          <TableRow>
            <TableCell > <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Nom</Typography></TableCell>
            <TableCell> <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}> Prénom</Typography></TableCell>
            <TableCell> <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Date de naissance</Typography></TableCell>
            <TableCell> <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Email</Typography> </TableCell>
            <TableCell> <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Adresse</Typography> </TableCell>
            <TableCell> <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Telephone</Typography> </TableCell>
            <TableCell> <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Département</Typography> </TableCell>
            <TableCell> <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Rôle</Typography> </TableCell>
            <TableCell> <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Action</Typography> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.nom}</TableCell>
              <TableCell>{employee.prenom}</TableCell>
              <TableCell>{employee.date_naissance}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.adresse}</TableCell>
              <TableCell>{employee.telephone}</TableCell>
              <TableCell>{employee.departementN}</TableCell> 
              <TableCell>{employee.role}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => onEdit(employee.id)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="secondary" onClick={() => onDelete(employee.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
     </TableContainer>
    
            <EditEmployee
                open={openEditDialog}
                handleClose={handleCloseEditDialog}
                employeeId={selectedEmployee}
                // Utiliser fetchEmployees pour rafraîchir la liste
                updateEmployeeInList={updateEmployeeInList} // Passer la fonction updateEmployeeInList comme prop
                handleUpdateEmployee={handleUpdateEmployee} // Passer la fonction handleUpdateEmployee
                refreshEmployees={fetchEmployees} 
                // employeeDetails={selectedEmployeeDetails}
             />


            <DeleteEmployee
                open={openDeleteDialog}
                handleClose={handleCloseDeleteDialog}
                employeeId={selectedEmployee}
                refreshEmployees={fetchEmployees} // Utiliser fetchEmployees pour rafraîchir la liste
            />
   </Paper>
    );
}


export default EmployeeList;

