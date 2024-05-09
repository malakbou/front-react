import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import axios from 'axios';

const DeleteEmployee = ({ open, handleClose, employeeId, refreshEmployees }) => {

    const handleDelete = async () => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/employes/${employeeId}`);
            handleClose();
            refreshEmployees();
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirmation de suppression</DialogTitle>
            <DialogContent>
                Êtes-vous sûr de vouloir supprimer cet employé ?
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Annuler</Button>
                <Button onClick={handleDelete} color="secondary">Supprimer</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteEmployee;
