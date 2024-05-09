import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  MenuItem,
  DialogActions,
  Button,
  TextField,
} from "@material-ui/core";
import cali from "./Calendrier.module.css";

function EventFormDialog({ open, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_time: "",
    end_time: "",
    typeevent: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    start_time: "",
    end_time: "",
    typeevent: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Effacez l'erreur lors de la modification du champ
  };

  const handleSubmit = async () => {
    const newErrors = {}; // Créez un objet pour stocker les nouvelles erreurs

    // Vérifiez chaque champ et mettez à jour les erreurs
    if (!formData.title.trim()) {
      newErrors.title = "Champ obligatoire";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Champ obligatoire";
    }
    if (!formData.start_time.trim()) {
      newErrors.start_time = "Champ obligatoire";
    }
    if (!formData.end_time.trim()) {
      newErrors.end_time = "Champ obligatoire";
    }
    if (!formData.typeevent.trim()) {
      newErrors.typeevent = "Champ obligatoire";
    }

    // Si au moins un champ est vide, mettez à jour l'état des erreurs et quittez la fonction
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Si tous les champs sont remplis, continuez avec la soumission du formulaire
    try {
      console.log("Submitting formData:", formData);
      const response = await fetch("http://127.0.0.1:8000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to create event");
      }
      console.log("Event created successfully");
      onClose();
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          overflow: "hidden",
          fontFamily: "Arial, sans-serif",
          fontSize: "16px",
          color: "#686868",
          lineHeight: "3.4",
          borderRadius: "30px",
        },
      }}
    >
      <div className={cali.creer_event_header}>
        {" "}
        <DialogTitle>Créer un événement</DialogTitle>{" "}
      </div>
      <div className={cali.creer_event_Content}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Titre"
            name="title"
            variant="outlined"
            fullWidth
            value={formData.title}
            onChange={handleInputChange}
            error={!!errors.title}
            helperText={errors.title}
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            fullWidth
            variant="outlined"
            value={formData.description}
            onChange={handleInputChange}
            error={!!errors.description}
            helperText={errors.description}
          />
          <TextField
            margin="dense"
            type="datetime-local"
            name="start_time"
            fullWidth
            variant="outlined"
            value={formData.start_time}
            onChange={handleInputChange}
            error={!!errors.start_time}
            helperText={errors.start_time}
          />
          <TextField
            margin="dense"
            type="datetime-local"
            name="end_time"
            fullWidth
            variant="outlined"
            value={formData.end_time}
            onChange={handleInputChange}
            error={!!errors.end_time}
            helperText={errors.end_time}
          />
          <TextField
            select
            margin="dense"
            label="Type d'événement"
            name="typeevent"
            fullWidth
            variant="outlined"
            value={formData.typeevent}
            onChange={handleInputChange}
            error={!!errors.typeevent}
            helperText={errors.typeevent}
          >
            <MenuItem value="Online_Meetings">Réunion en ligne</MenuItem>
            <MenuItem value="Project">Nouveau projet</MenuItem>
            <MenuItem value="Vacations">Congé</MenuItem>
            <MenuItem value="In_person_Meetings">Réunion en personne</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Créer
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}

export default EventFormDialog;

// import React, { useState } from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';

// function EventFormDialog({ open, onClose }) {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     start_time: '',
//     end_time: ''
//   });

//   const [errors, setErrors] = useState({
//     title: '',
//     description: '',
//     start_time: '',
//     end_time: ''
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setErrors({ ...errors, [name]: '' }); // Effacez l'erreur lors de la modification du champ
//   };

//   const handleSubmit = async () => {
//     const newErrors = {}; // Créez un objet pour stocker les nouvelles erreurs

//     // Vérifiez chaque champ et mettez à jour les erreurs
//     if (!formData.title.trim()) {
//       newErrors.title = 'Champ obligatoire';
//     }
//     if (!formData.description.trim()) {
//       newErrors.description = 'Champ obligatoire';
//     }
//     if (!formData.start_time.trim()) {
//       newErrors.start_time = 'Champ obligatoire';
//     }
//     if (!formData.end_time.trim()) {
//       newErrors.end_time = 'Champ obligatoire';
//     }

//     // Si au moins un champ est vide, mettez à jour l'état des erreurs et quittez la fonction
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     // Si tous les champs sont remplis, continuez avec la soumission du formulaire
//     try {
//       const response = await fetch('http://127.0.0.1:8000/api/events', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       if (!response.ok) {
//         throw new Error('Failed to create event');
//       }
//       console.log('Event created successfully');
//       onClose();
//     } catch (error) {
//       console.error('Error creating event:', error);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Créer un événement</DialogTitle>
//       <DialogContent>
//         <TextField
//           autoFocus
//           margin="dense"
//           label="Titre"
//           name="title"
//           fullWidth
//           value={formData.title}
//           onChange={handleInputChange}
//           error={!!errors.title} // Affichez l'erreur si elle est définie
//           helperText={errors.title} // Affichez le message d'erreur
//         />
//         <TextField
//           margin="dense"
//           label="Description"
//           name="description"
//           fullWidth
//           value={formData.description}
//           onChange={handleInputChange}
//           error={!!errors.description} // Affichez l'erreur si elle est définie
//           helperText={errors.description} // Affichez le message d'erreur
//         />
//         <TextField
//           margin="dense"
//           type="datetime-local"
//           name="start_time"
//           fullWidth
//           value={formData.start_time}
//           onChange={handleInputChange}
//           error={!!errors.start_time} // Affichez l'erreur si elle est définie
//           helperText={errors.start_time} // Affichez le message d'erreur
//         />
//         <TextField
//           margin="dense"
//           type="datetime-local"
//           name="end_time"
//           fullWidth
//           value={formData.end_time}
//           onChange={handleInputChange}
//           error={!!errors.end_time} // Affichez l'erreur si elle est définie
//           helperText={errors.end_time} // Affichez le message d'erreur
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary">
//           Annuler
//         </Button>
//         <Button onClick={handleSubmit} color="primary">
//           Créer
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

// export default EventFormDialog;
