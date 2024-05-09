import React from 'react';
import { Button } from '@material-ui/core';
import cali from './Calendrier.module.css';

function SideButtons({ handleEventTypeChange }) {
  const handleClick = (type) => {
    handleEventTypeChange(type);
  };

  return (
    <div style={{  display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <Button variant="contained" onClick={() => handleClick(null)} style={{ backgroundColor: '#FFFFFF', color: '#000000', marginBottom: '10px', width: '250px', fontWeight:'bold' }}>tous</Button>
      <Button variant="contained" onClick={() => handleClick('Online_Meetings')} style={{ backgroundColor: 'rgb(220,246,233)', color: '#31CC7E', marginBottom: '10px', width: '250px', fontWeight:'bold' }}>Réunion online</Button>
      <Button variant="contained" onClick={() => handleClick('Project')} style={{ backgroundColor: 'rgb(232,239,251)', color: '#6A94E8', marginBottom: '10px', width: '250px', fontWeight:'bold' }}>Projets</Button>
      <Button variant="contained" onClick={() => handleClick('Vacations')} style={{ backgroundColor: 'rgb(252,231,231)', color: '#EE6666', marginBottom: '10px', width: '250px', fontWeight:'bold' }}>Vacances</Button>
      <Button variant="contained" onClick={() => handleClick('In_person_Meetings')} style={{ backgroundColor: '#EDE7FB', color: '#865CE2', marginBottom: '10px', width: '250px', fontWeight:'bold' }}>Reunion en personne</Button>
    </div>
  );
}

export default SideButtons;


