
import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import axios from 'axios';

const EditDepartmentForm = ({ open, handleClose, department, refreshDepartments }) => {
    const [nom, setNom] = useState('');
    const [fonction, setFonction] = useState('');
    const [errors, setErrors] = useState({});


    useEffect(() => {
        if (department) {
            setNom(department.nom);
            setFonction(department.fonction);
        }
    }, [department]);


 // Validation du formulaire avant soumission
   const validateForm = () => {
    const newErrors = {};
    if (!nom) newErrors.nom = 'Champ obligatoire.';
    if (!fonction) newErrors.fonction = "Champ obligatoire.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            await axios.put(`http://127.0.0.1:8000/api/departements/${department.id}`, { nom, fonction });
            handleClose();
            refreshDepartments();
            
        } catch (error) {
            console.error('Error updating department:', error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Modifier le Département</DialogTitle>
            <DialogContent>
                <TextField autoFocus margin="dense" id="nom" label="Nom" fullWidth variant="outlined" value={nom} onChange={e => setNom(e.target.value)} error={!!errors.nom} helperText={errors.nom} />
                <TextField margin="dense" id="fonction" label="Fonction" fullWidth variant="outlined" value={fonction} onChange={e => setFonction(e.target.value)} error={!!errors.fonction} helperText={errors.fonction} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Annuler</Button>
                <Button onClick={handleSubmit}>Enregistrer</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditDepartmentForm;
