import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import axios from 'axios';

const AddDepartmentForm = ({ open, handleClose, refreshDepartments }) => {
    const [nom, setNom] = useState('');
    const [fonction, setFonction] = useState('');
    const [errors, setErrors] = useState({});

    const resetForm = () => {
        setNom('');
        setFonction('');
        setErrors({});
    };

    const validateForm = () => {
        const newErrors = {};
        if (!nom) newErrors.nom = 'Champ obligatoire.';
        if (!fonction) newErrors.fonction = 'Champ obligatoire.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            await axios.post('http://127.0.0.1:8000/api/departements', { nom, fonction });
            refreshDepartments(); // Passer le nouveau département à la fonction de rafraîchissement
            handleClose();
            resetForm();
        } catch (error) {
            console.error('Error adding department:', error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Ajouter un Département</DialogTitle>
            <DialogContent>
            <TextField autoFocus margin="dense" id="nom" label="Nom" fullWidth variant="outlined" value={nom} onChange={e => setNom(e.target.value)} error={!!errors.nom} helperText={errors.nom} />
            <TextField margin="dense" id="fonction" label="Fonction" fullWidth variant="outlined" value={fonction} onChange={e => setFonction(e.target.value)} error={!!errors.fonction} helperText={errors.fonction} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Annuler</Button>
                <Button onClick={handleSubmit}>Ajouter</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddDepartmentForm;


