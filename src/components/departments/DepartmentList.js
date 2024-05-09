
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import EditDepartmentForm from './EditDepartmentForm';
import axios from 'axios';

const DepartmentList = ({ refreshDepartments }) => {
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

    // Afficher tous les departements
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/departements')
            .then(response => {
                setDepartments(response.data.departements);
            })
            .catch(error => console.error('There was an error!', error));
    }, [refreshDepartments]);

    const handleOpenUpdateDialog = (department) => {
        setSelectedDepartment(department);
        setOpenUpdateDialog(true);
    };

    return (
        <Paper style={{ margin: '16px 0' }}>
            <Typography variant="h6" style={{ padding: '16px', fontWeight: 'bold'  }}>Liste des Départements</Typography>
            <TableContainer>
                <Table>
                <TableHead>
                        <TableRow>
                            <TableCell><Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Nom du Département</Typography></TableCell>
                            <TableCell><Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Fonction du Département</Typography></TableCell>
                            <TableCell><Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Actions</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {departments.map(department => (
                            <TableRow key={department.id}>
                                <TableCell>{department.nom}</TableCell>
                                <TableCell>{department.fonction}</TableCell>
                                <TableCell>
                                    <IconButton aria-label="edit" onClick={() => handleOpenUpdateDialog(department)}>
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <EditDepartmentForm
                open={openUpdateDialog}
                handleClose={() => setOpenUpdateDialog(false)}
                department={selectedDepartment}
                refreshDepartments={refreshDepartments}
            />
        </Paper>
    );
};

export default DepartmentList;

