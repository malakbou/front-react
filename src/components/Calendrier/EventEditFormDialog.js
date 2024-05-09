import React, { useState } from "react";
import {
  Dialog,
  MenuItem,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
} from "@material-ui/core";
import cali from "./Calendrier.module.css";

function EventEditFormDialog({ event, onClose }) {
  const [editedEvent, setEditedEvent] = useState({ ...event });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear error when input changes
    }));
  };

  const handleSave = async () => {
    // Validate fields
    const newErrors = {};
    if (!editedEvent.title || !editedEvent.title.trim()) {
      newErrors.title = "Champ obligatoire";
    }
    if (!editedEvent.description || !editedEvent.description.trim()) {
      newErrors.description = "Champ obligatoire";
    }
    if (!editedEvent.start_time || !editedEvent.start_time.trim()) {
      newErrors.start_time = "Champ obligatoire";
    }
    if (!editedEvent.end_time || !editedEvent.end_time.trim()) {
      newErrors.end_time = "Champ obligatoire";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/eventes/${event.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: editedEvent.title,
            description: editedEvent.description,
            start_time: editedEvent.start_time,
            end_time: editedEvent.end_time,
            typeevent: editedEvent.typeevent,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update event");
      }
      onClose();
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleCancel = () => {
    setEditedEvent({ ...event });
    onClose();
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      PaperProps={{
        style: {
          overflow: "hidden",
          fontFamily: "Arial, sans-serif",
          fontSize: "16px",
          color: "white",
          lineHeight: "4.6",
          borderRadius: "30px",
        },
      }}
    >
      <div className={cali.edit_bax_header}>
        {" "}
        <DialogTitle className={cali.edit_title}>Edit Event</DialogTitle>{" "}
      </div>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          name="title"
          value={editedEvent.title}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          // placeholder="Title"
          error={!!errors.title}
          helperText={errors.title}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Description"
          name="description"
          value={editedEvent.description}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          error={!!errors.description}
          helperText={errors.description}
        />
        <TextField
          autoFocus
          margin="dense"
          name="start_time"
          type="datetime-local"
          value={editedEvent.start_time}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          error={!!errors.start_time}
          helperText={errors.start_time}
        />
        <TextField
          autoFocus
          margin="dense"
          name="end_time"
          type="datetime-local"
          value={editedEvent.end_time}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          error={!!errors.end_time}
          helperText={errors.end_time}
        />

        <TextField
          select
          autoFocus
          margin="dense"
          label="Type d'événement"
          name="typeevent"
          fullWidth
          variant="outlined"
          value={editedEvent.typeevent}
          onChange={handleChange}
          error={!!errors.typeevent}
          helperText={errors.typeevent}
        >
          <MenuItem value="Online_Meetings">Réunion en ligne</MenuItem>
          <MenuItem value="Project">Nouveau projet</MenuItem>
          <MenuItem value="Vacations">Congé</MenuItem>
          <MenuItem value="In_person_Meetings">Réunion en personne</MenuItem>
        </TextField>

        {/* Boutons pour éditer et supprimer l'événement */}

        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Annuler
          </Button>
          <Button onClick={handleSave} color="primary">
            Enregistrer
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default EventEditFormDialog;

// import React, { useState } from 'react';
// import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@material-ui/core';
// import './Calendrier.css';

// function EventEditFormDialog({ event, onClose }) {
//   const [editedEvent, setEditedEvent] = useState({ ...event });
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditedEvent(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//     setErrors(prevErrors => ({
//       ...prevErrors,
//       [name]: '' // Clear error when input changes
//     }));
//   };

//   const handleSave = async () => {
//     // Validate fields
//     const newErrors = {};
//     if (!editedEvent.title || !editedEvent.title.trim()) {
//       newErrors.title = 'Champ obligatoire';
//     }
//     if (!editedEvent.description || !editedEvent.description.trim()) {
//       newErrors.description = 'Champ obligatoire';
//     }
//     if (!editedEvent.start_time || !editedEvent.start_time.trim()) {
//       newErrors.start_time = 'Champ obligatoire';
//     }
//     if (!editedEvent.end_time || !editedEvent.end_time.trim()) {
//       newErrors.end_time = 'Champ obligatoire';
//     }
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     try {
//       const response = await fetch(`http://127.0.0.1:8000/api/events/${event.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           title: editedEvent.title,
//           description: editedEvent.description,
//           start_time: editedEvent.start_time,
//           end_time: editedEvent.end_time
//         }),
//       });
//       if (!response.ok) {
//         throw new Error('Failed to update event');
//       }
//       onClose();
//     } catch (error) {
//       console.error('Error updating event:', error);
//     }
//   };

//   const handleCancel = () => {
//     setEditedEvent({ ...event });
//     onClose();
//   };

//   return (
//     <Dialog open={true} onClose={onClose}>
//       <DialogTitle>Edit Event</DialogTitle>
//       <DialogContent>
//         <TextField
//           margin="dense"
//           label="Title"
//           name="title"
//           value={editedEvent.title}
//           onChange={handleChange}
//           fullWidth
//           error={!!errors.title}
//           helperText={errors.title}
//         />
//         <TextField
//           margin="dense"
//           label="Description"
//           name="description"
//           value={editedEvent.description}
//           onChange={handleChange}
//           fullWidth
//           error={!!errors.description}
//           helperText={errors.description}
//         />
//         <TextField
//           margin="dense"
//           name="start_time"
//           type="datetime-local"
//           value={editedEvent.start_time}
//           onChange={handleChange}
//           fullWidth
//           error={!!errors.start_time}
//           helperText={errors.start_time}
//         />
//         <TextField
//           margin="dense"
//           name="end_time"
//           type="datetime-local"
//           value={editedEvent.end_time}
//           onChange={handleChange}
//           fullWidth
//           error={!!errors.end_time}
//           helperText={errors.end_time}
//         />
//         <Button onClick={handleSave} color="primary">Save</Button>
//         <Button onClick={handleCancel} color="secondary">Cancel</Button>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default EventEditFormDialog;
