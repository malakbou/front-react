import React, { useState, useEffect } from 'react';
import { Container, Button } from '@material-ui/core';
import AddEmployeeForm from '../components/employees/AddEmployeeForm';
import EmployeeList from '../components/employees/EmployeeList';
import axios from 'axios';

const EmployeeManagementPage = () => {
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [employees, setEmployees] = useState([]);

    const fetchEmployees = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/employes');
        setEmployees(response.data.employes);
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <Container maxWidth="md">
            <Button variant="contained" color="primary" onClick={() => setOpenAddDialog(true)}>
                Ajouter un Employé
            </Button>
            <AddEmployeeForm open={openAddDialog} handleClose={() => setOpenAddDialog(false)} refreshEmployees={fetchEmployees} />
            <EmployeeList employees={employees} refreshEmployees={fetchEmployees} />
        </Container>
    );
};

export default EmployeeManagementPage;
