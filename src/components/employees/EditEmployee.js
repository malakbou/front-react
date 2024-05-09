import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, InputLabel, FormControl, CircularProgress } from '@material-ui/core';
import axios from 'axios';

const roles = [
    { value: 'CHEF_PROJET', label: 'Chef de Projet' },
    { value: 'EMPLOYE', label: 'Employé' },
    { value: 'ADMINISTRATEUR', label: 'Administrateur' },
];

const EditEmployee = ({ open,employeeDetails, handleClose, employes, employeeId, refreshEmployees }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [date_naissance, setDateNaissance] = useState('');
    const [email, setEmail] = useState('');
    const [adresse, setAdresse] = useState('');
    const [telephone, setTelephone] = useState('');
    const [role, setRole] = useState('');
    const [departementId, setDepartementId] = useState('');
    const [departements, setDepartements] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (employes) {
            setNom(employes.nom);
            setPrenom(employes.prenom);
            setDateNaissance(employes.date_naissance);
            setEmail(employes.email);
            setAdresse(employes.adresse);
            setTelephone(employes.telephone);
            setRole(employes.role);
            setDepartements(employes.departements);
        }
    }, [employes]);

    useEffect(() => {
        if (open && employeeId) {
            fetchEmployee();
            fetchDepartements();
        }
    }, [open, employeeId]);

    const fetchEmployee = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/employes/${employeeId}`);
            const { nom, prenom, date_naissance, email, adresse,telephone, role, departement_id } = response.data.employes;
            setNom(nom);
            setPrenom(prenom);
            setDateNaissance(date_naissance);
            setEmail(email);
            setAdresse(adresse);
            setTelephone(telephone);
            setRole(role);
            setDepartementId(departement_id);
        } catch (error) {
            setError('Erreur lors du chargement de l\'employé');
        } finally {
            setLoading(false);
        }
    };

    const fetchDepartements = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/departements');
            setDepartements(response.data.departements);
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!nom) newErrors.nom = 'Champ obligatoire.';
        if (!prenom) newErrors.prenom = 'Champ obligatoire.';
        if (!date_naissance) newErrors.date_naissance = 'Champ obligatoire.';
        if (!email) newErrors.email = 'Champ obligatoire.';
        if (!adresse) newErrors.adresse = 'Champ obligatoire.';
        if (!telephone) newErrors.telephone = 'Champ obligatoire.';
        if (!role) newErrors.role = 'Champ obligatoire.';
        if (!departementId) newErrors.departementId = 'Champ obligatoire.';
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.put(`http://127.0.0.1:8000/api/employes/${employeeId}`, {
                    nom,
                    prenom,
                    date_naissance: date_naissance,
                    email,
                    adresse,
                    telephone,
                    role,
                    departement_id: departementId,
                });
                handleClose();
                refreshEmployees();
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    const { errors } = error.response.data;
                    setErrors(errors);
                }
            } finally {
                setLoading(false);
            }
        }
    };

    const handleCancel = () => {
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Modifier l'employé</DialogTitle>
            <DialogContent>
                <TextField autoFocus margin="dense" id="nom" label="Nom" fullWidth variant="outlined" value={nom} onChange={e => setNom(e.target.value)} error={!!errors.nom} helperText={errors.nom} />
                <TextField margin="dense" id="prenom" label="Prénom" fullWidth variant="outlined" value={prenom} onChange={e => setPrenom(e.target.value)} error={!!errors.prenom} helperText={errors.prenom} />
                <TextField margin="dense" id="dateNaissance" label="Date de Naissance" type="date" fullWidth variant="outlined" InputLabelProps={{ shrink: true }} value={date_naissance} onChange={e => setDateNaissance(e.target.value)} error={!!errors.date_naissance} helperText={errors.date_naissance} />
                <TextField margin="dense" id="email" label="Email" fullWidth variant="outlined" value={email} onChange={e => setEmail(e.target.value)} error={!!errors.email} helperText={errors.email} />
                <TextField margin="dense" id="adresse" label="Adresse" fullWidth variant="outlined" value={adresse} onChange={e => setAdresse(e.target.value)} error={!!errors.adresse} helperText={errors.adresse} />
                <TextField margin="dense" id="telephone" label="Telephone" fullWidth variant="outlined" value={telephone} onChange={e => setTelephone(e.target.value)} error={!!errors.telephone} helperText={errors.telephone} />
                <FormControl fullWidth variant="outlined" margin="dense">
                    <InputLabel id="role-label">Rôle</InputLabel>
                    <Select
                        labelId="role-label"
                        id="role"
                        value={role}
                        onChange={e => setRole(e.target.value)}
                        label="Rôle"
                        error={!!errors.role} helperText={errors.role}
                    >
                        {roles.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth variant="outlined" margin="dense">
                    <InputLabel id="departement-label">Département</InputLabel>
                    <Select
                        labelId="departement-label"
                        id="departement"
                        value={departementId}
                        onChange={e => setDepartementId(e.target.value)}
                        label="Département"
                        error={!!errors.departementId} helperText={errors.departementId}
                    >
                        {departements.map((departement) => (
                            <MenuItem key={departement.id} value={departement.id}>
                                {departement.nom}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} >Annuler</Button>
                <Button onClick={handleSubmit} >Enregistrer</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditEmployee;
