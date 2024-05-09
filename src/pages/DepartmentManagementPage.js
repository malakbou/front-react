import React, { useState, useEffect } from 'react';
import { Container, Button } from '@material-ui/core';
import AddDepartmentForm from '../components/departments/AddDepartmentForm';
import DepartmentList from '../components/departments/DepartmentList';
import axios from 'axios';


const DepartmentManagementPage = () => {
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [departments, setDepartments] = useState([]);

    const fetchDepartments = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/departements');
        setDepartments(response.data.departements);
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    return (
        <div> 
        <Container maxWidth="md">
        <div style={{ marginBottom: "170px", BackgroundColor: "red" }}>
            <Button variant="contained" color="primary" onClick={() => setOpenAddDialog(true)}>
                Ajouter un Département
            </Button>
        </div>
            <AddDepartmentForm open={openAddDialog} handleClose={() => setOpenAddDialog(false)} refreshDepartments={fetchDepartments} />
            <DepartmentList departments={departments} refreshDepartments={fetchDepartments} />
        </Container>
        </div>
    );
};

export default DepartmentManagementPage;
