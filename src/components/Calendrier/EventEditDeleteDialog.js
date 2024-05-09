import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
} from "@material-ui/core"; 
import { Close as CloseIcon } from "@material-ui/icons";
import EventEditFormDialog from "./EventEditFormDialog";
import cali from "./Calendrier.module.css";

function EventEditDeleteDialog({
  eventData,
  onClose,
  onDeleteEvent,
  fetchDelete,
}) {
  const [editOpen, setEditOpen] = useState(false);

  // Fonction pour supprimer l'événement
  const handleDelete = async () => {
    try {
      // Envoyer une requête DELETE pour supprimer l'événement sur le serveur
      const response = await fetch(
        `http://127.0.0.1:8000/api/events/${eventData.id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      // Recuperer la nouvelle list quand je supprime un event
      fetchDelete();
      // Fermer le dialogue après la suppression réussie
      onClose();
    } catch (error) {
      console.error("Error deleting event:", error);
      // Gérer l'erreur, par exemple en affichant un message à l'utilisateur
    }
  };

  const handleEditOpen = () => {
    setEditOpen(true); // Open the edit dialog
  };

  const handleEditClose = () => {
    setEditOpen(false); // Close the edit dialog
  };

  const handleEditFormClose = () => {
    handleEditClose();
    onClose();
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      PaperProps={{
        style: {
          width: "500px",
          height: "500px",
          borderRadius: "30px",
          lineHeight: "4.6",
        },
      }}
    >
      <div className={cali.title_header_color}>
        <DialogTitle className={cali.title_header}>
          {eventData.title}
          <IconButton
            aria-label="close"
            onClick={onClose}
            style={{ position: "absolute", right: "8px", top: "8px" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      </div>
      <DialogContent
        style={{
          overflow: "hidden",
          height: "100%",
          fontFamily: "Arial, sans-serif",
          fontSize: "16px",
          color: "#686868",
          lineHeight: "1.5",
        }}
      >
        <div className={cali.dialog_content}>
          {/* Affichage des détails de l'événement */}
          <p>Description: {eventData.extendedProps.description}</p>
          <p>
            Date de début: {eventData.start && eventData.start.toLocaleString()}
          </p>
          <p>Date de fin: {eventData.end && eventData.end.toLocaleString()}</p>

          {/* Boutons pour éditer et supprimer l'événement */}
          <div className={cali.edit_delete_btn}>
            <button className={cali.edit_btn} onClick={handleEditOpen}>
              Modifier
            </button>
            <span style={{ margin: "3px 14px" }}></span>
            <button className={cali.delete_btn} onClick={handleDelete}>
              Supprimer
            </button>
          </div>
          {editOpen && (
            <EventEditFormDialog
              event={eventData}
              onClose={handleEditFormClose}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EventEditDeleteDialog;

//import React, { useState } from 'react';
// import { Dialog, DialogTitle, DialogContent, IconButton, Button } from '@material-ui/core'; // Importez Button
// import { Close as CloseIcon } from '@material-ui/icons'; // Importer l'icône de fermeture
// import EventEditFormDialog from './EventEditFormDialog';

// function EventEditDeleteDialog({ eventData, onClose, onDeleteEvent }) {

//   const [editOpen, setEditOpen] = useState(false);

//   // Fonction pour supprimer l'événement
//   const handleDelete = async () => {
//     try {
//       // Envoyer une requête DELETE pour supprimer l'événement sur le serveur
//       const response = await fetch(`http://127.0.0.1:8000/api/events/${eventData.id}`, {
//         method: 'DELETE',
//       });
//       if (!response.ok) {
//         throw new Error('Failed to delete event');
//       }
//       // Fermer le dialogue après la suppression réussie
//       onClose();
//     } catch (error) {
//       console.error('Error deleting event:', error);
//       // Gérer l'erreur, par exemple en affichant un message à l'utilisateur
//     }
//   };

//   const handleEditOpen = () => {
//     setEditOpen(true); // Open the edit dialog
//   };

//   const handleEditClose = () => {
//     setEditOpen(false); // Close the edit dialog
//   };

//   const handleEditFormClose = () => {
//     handleEditClose();
//     onClose();
//   };

//   return (
//     <Dialog open={true} onClose={onClose}>
//       <DialogTitle>
//         {eventData.title}
//         <IconButton aria-label="close" onClick={onClose} style={{ position: 'absolute', right: '8px', top: '8px' }}>
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>
//       <DialogContent>
//         {/* Affichage des détails de l'événement */}
//         <p>Description: {eventData.extendedProps.description}</p>
//         <p>Date de début: {eventData.start && eventData.start.toLocaleString()}</p>
//         <p>Date de fin: {eventData.end && eventData.end.toLocaleString()}</p>

//         {/* Boutons pour éditer et supprimer l'événement */}
//         <Button onClick={handleEditOpen}>Edit</Button>
//         <Button onClick={handleDelete}>Delete</Button>

//         {editOpen && <EventEditFormDialog event={eventData} onClose={handleEditFormClose} />}
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default EventEditDeleteDialog;
