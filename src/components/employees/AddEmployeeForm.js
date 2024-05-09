
import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, InputLabel, FormControl, FormHelperText} from '@material-ui/core';
import axios from 'axios';

const AddEmployeeForm = ({ open, handleClose, addEmployee, refreshEmployees, updateEmployees }) => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [email, setEmail] = useState('');
  const [adresse, setAdresse] = useState('');
  const [telephone, setTelephone] = useState('');
  const [role, setRole] = useState('');
  const [departementId, setDepartementId] = useState('');
  const [departements, setDepartements] = useState([]);
  const [errors, setErrors] = useState({});

  // Charger la liste des départements dès le montage du composant
  useEffect(() => {
    const fetchDepartements = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/departements');
        setDepartements(response.data.departements);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };
    fetchDepartements();
  }, []);

    // Ajouter cette fonction pour réinitialiser les états des champs du formulaire
    const resetForm = () => {
      setNom('');
      setPrenom('');
      setDateNaissance('');
      setEmail('');
      setAdresse('');
      setTelephone('');
      setRole('');
      setDepartementId('');
      setErrors({});
    };
  


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
         await axios.post('http://127.0.0.1:8000/api/employes', {nom, prenom, date_naissance: dateNaissance, email, adresse,telephone, role, departement_id: departementId,});
          refreshEmployees() // Mettre à jour la liste des employés dans le composant EmployeeList
          handleClose();
          resetForm(); // Réinitialiser les états des champs du formulaire
      
    } catch (error) {
      // Si la requête échoue, gérez les erreurs ici
      if (error.response && error.response.status === 422) {
        // Si la réponse contient des erreurs de validation
        const { errors } = error.response.data;
  
        // Mettre à jour l'état d'erreur pour chaque champ
        setErrors(errors);
      } 
    }
};


  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Ajouter un Employé</DialogTitle>
      <DialogContent>
        {/* Nom de l'employé */}
        <TextField
          autoFocus
          margin="dense"
          id="nom"
          label="Nom"
          fullWidth
          variant="outlined"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          error={!!errors.nom}
          helperText={errors.nom}
        />
        {/* Prénom de l'employé */}
        <TextField
          margin="dense"
          id="prenom"
          label="Prénom"
          fullWidth
          variant="outlined"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          error={!!errors.prenom}
          helperText={errors.prenom}
        />
        {/* Date de naissance */}
        <TextField
          margin="dense"
          id="dateNaissance"
          label="Date de Naissance"
          type="date"
          fullWidth
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          value={dateNaissance}
          onChange={(e) => setDateNaissance(e.target.value)}
          error={!!errors.dateNaissance}
          helperText={errors.dateNaissance}
        />
        {/* Email */}
        <TextField
          margin="dense"
          id="email"
          label="Email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />
        {/* Adresse */}
        <TextField
          margin="dense"
          id="adresse"
          label="Adresse"
          fullWidth
          variant="outlined"
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
          error={!!errors.adresse}
          helperText={errors.adresse}
        />

          {/* telephone */}
          <TextField
          margin="dense"
          id="telephone"
          label="Telephone"
          fullWidth
          variant="outlined"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          error={!!errors.telephone}
          helperText={errors.telephone}
        />

        {/* Sélection du département */}
        <FormControl fullWidth variant="outlined" margin="dense" error={!!errors.departementId}>
          <InputLabel id="departementId-label">Département</InputLabel>
          <Select
            labelId="departementId-label"
            id="departementId"
            value={departementId}
            onChange={(e) => setDepartementId(e.target.value)}
            label="Département"
            error={!!errors.departementId}
            helperText={errors.departementId}
          >
            {departements.map((departement) => (
              <MenuItem key={departement.id} value={departement.id}>{departement.nom}</MenuItem>
            ))}
          </Select>
          {errors.departementId && <FormHelperText>{errors.departementId}</FormHelperText>}
        </FormControl>
        {/* Rôle de l'employé */}
        <TextField
          select
          margin="dense"
          id="role"
          label="Rôle"
          fullWidth
          variant="outlined"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          error={!!errors.role}
          helperText={errors.role}
        >
          <MenuItem value="CHEF_PROJET">Chef de Projet</MenuItem>
          <MenuItem value="EMPLOYE">Employé</MenuItem>
          <MenuItem value="ADMINISTRATEUR">Administrateur</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button onClick={handleSubmit}>Ajouter</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEmployeeForm;




