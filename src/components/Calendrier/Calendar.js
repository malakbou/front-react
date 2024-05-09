import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Button, Dialog, DialogTitle, IconButton } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import EventFormDialog from "./EventFormDialog";
import EventEditDeleteDialog from "./EventEditDeleteDialog";
import SideButtons from "./SideButtons";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";
import cali from "./Calendrier.module.css";

function Calendar() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventType, setEventType] = useState(null);
  const { header } = useStateContext();

  //  nhina les crochets [...] dans ce cas a chaque fois ytexecuta useEffect hna ywelli dynamique
  useEffect(() => {
    fetchEvents(); // A chaque modification texecute cette fonction

    // NotificationsCount();
    // getRealtimeNotification();
  });


  // jai modifier useEffect dans ce cas maywellich dynamique ki ndiru [ ]  ttexecuta une 2 fois lorsque la page ttcharja
  // useEffect(() => {
  //   fetchEvents();
  // }, [eventType]);


  const getEventColor = (typeevent) => {
    switch (typeevent) {
      case "Online_Meetings":
        return { backgroundColor: "rgb(220,246,233)", textColor: "#31CC7E" };
      case "Project":
        return { backgroundColor: "rgb(232,239,251)", textColor: "#6A94E8" };
      case "Vacations":
        return { backgroundColor: "rgb(252,231,231)", textColor: "#EE6666" };
      case "In_person_Meetings":
        return { backgroundColor: "#EDE7FB", textColor: "#865CE2" };
      default:
        return { backgroundColor: "rgb(233,235,236)", textColor: "#4C525C" };
    }
  };



  const fetchDelete = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/events');
    console.log(response);

};

// useEffect(() => {
//   fetchDelete();
// });



const fetchEvents = async () => {
  try {
    let url = "http://127.0.0.1:8000/api/events";
    if (eventType) {
      url += `/searchEventByType/${eventType}`;
    }
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    const data = await response.json();

    if (data && (data.data || data.event)) {
      // Vérifier si les événements sont sous la clé 'data' ou 'event'
      const eventsData = data.data ? data.data : data.event;

      const coloredEvents = eventsData.map((event) => ({
        ...event,
        ...getEventColor(event.typeevent),
      }));

      setEvents(coloredEvents);
    } else {
      // Aucun événement à récupérer
      setEvents([]);
    }
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};


  const handleCreateEvent = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleEventClick = (eventClickInfo) => {
    setSelectedEvent(eventClickInfo.event);
  };

  const handleCloseEditDeleteDialog = () => {
    setSelectedEvent(null);
  };

  const handleEventTypeChange = (type) => {
    setEventType(type);
  };

  return (
    <div
      className={cali.page_container}
      style={{ display: "flex", justifyContent: "flex-end",top: "70px", position: "relative" }}
    >
      <div className={cali.btn_event} style={{ marginRight: "20px"}}>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#AA4021",
            color: "white",
            marginBottom: "10px",
            width: "200px",
          }}
          onClick={handleCreateEvent}
        >
          Ajouter évenement
        </Button>
      </div>
      <div className={cali.btn_container}>
        <SideButtons handleEventTypeChange={handleEventTypeChange} />
      </div>
      <div
        className={cali.calendar}
        style={{ width: "900px", height: "770px", backgroundColor: "white", position: "relative", left: "45px" }}
      >
        <div style={{ position: "relative", top: "0px" }}>
          <FullCalendar
            backgroundColor="white"
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek",
            }}
            events={events.map((event) => ({
              id: event.id,
              title: event.title,
              description: event.description,
              start: event.start_time,
              end: event.end_time,
              ...getEventColor(event.typeevent),
              borderColor: "transparent",
            }))}
            eventContent={(eventInfo) => (
              <div
                style={{
                  textAlign: "center",
                  backgroundColor: eventInfo.event.backgroundColor,
                  color: eventInfo.event.textColor,
                  borderRadius: "5px",
                  padding: "3px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  marginTop: "2px",
                  marginBottom: "2px",
                  minWidth: "100px",
                }}
              >
                <span
                  style={{
                    fontFamily: "initial",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                >
                  {eventInfo.event.title}
                </span>
              </div>
            )}
            eventDidMount={(eventInfo) => {
              const eventElement = eventInfo.el;
              eventElement.style.marginTop = "3px";
              eventElement.style.marginBottom = "3px";
            }}
            eventClick={handleEventClick}
            dayHeaderContent={({ date }) => (
              <div style={{ padding: "7px", textAlign: "center" }}>
                {date.toLocaleDateString("fr-FR", { weekday: "long" })}
              </div>
            )}
            dayCellContent={({ date, dayNumberText }) => {
              const isToday = date.toDateString() === new Date().toDateString();
              return (
                <div
                  className={isToday ? "fc-today" : ""}
                  style={{
                    backgroundColor: isToday ? "#FF5C35" : "#FFFFFF",
                    borderRadius: "100%",
                    padding: "1px 6px",
                    textAlign: "center",
                    color: isToday ? "#FFFFFF" : "#000000",
                  }}
                >
                  {dayNumberText}
                </div>
              );
            }}
            height="540px" // Ajustez la hauteur selon vos besoins
            width="900px"
          />
        </div>

        <Dialog
          open={selectedEvent !== null}
          onClose={handleCloseEditDeleteDialog}
        >
          {selectedEvent && (
            <EventEditDeleteDialog
              eventData={selectedEvent}
              onClose={handleCloseEditDeleteDialog}
              fetchDelete={fetchDelete}
            />
          )}
        </Dialog>

        <EventFormDialog open={showForm} onClose={handleCloseForm} />
      </div>
    </div>
  );
}

export default Calendar;






// import React, { useState, useEffect } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import { Button, Dialog, DialogTitle, IconButton } from '@material-ui/core';
// import { Close as CloseIcon } from '@material-ui/icons';
// import EventFormDialog from './EventFormDialog';
// import EventEditDeleteDialog from './EventEditDeleteDialog';
// import SideButtons from './SideButtons';

// function Calendar() {
//   const [events, setEvents] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:8000/api/events');
//       if (!response.ok) {
//         throw new Error('Failed to fetch events');
//       }
//       const data = await response.json();
//       const coloredEvents = data.event.map(event => ({
//         ...event,
//         ...getEventColor(event.Type)
//       }));
//       setEvents(coloredEvents);
//     } catch (error) {
//       console.error('Error fetching events:', error);
//     }
//   };

//   const getEventColor = (typeevent) => {
//     switch (typeevent) {
//       case 'Online_Meetings':
//         return { backgroundColor: 'rgb(220,246,233)', textColor: '#31CC7E' };
//       case 'Project':
//         return { backgroundColor: 'rgb(232,239,251)', textColor: '#6A94E8' };
//       case 'Vacations':
//         return { backgroundColor: 'rgb(252,231,231)', textColor: '#EE6666' };
//       case 'In_person_Meetings':
//         return { backgroundColor: 'rgb(252,245,229)', textColor: '#cf950a' };
//       default:
//         return { backgroundColor: 'rgb(233,235,236)', textColor: '#4C525C' };
//     }
//   };

//   const handleCreateEvent = () => {
//     setShowForm(true);
//   };

//   const handleCloseForm = () => {
//     setShowForm(false);
//   };

//   const handleEventClick = (eventClickInfo) => {
//     setSelectedEvent(eventClickInfo.event);
//   };

//   const handleCloseEditDeleteDialog = () => {
//     setSelectedEvent(null);
//   };

//   return (
//     <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
//       <div style={{marginRight: '20px' }}>
//         <Button variant="contained" style={{ backgroundColor: '#6691E7', color: 'white', marginBottom: '10px', width: '200px'}} onClick={handleCreateEvent}>
//           Create New Event
//         </Button>
//       </div>
//       <SideButtons />
//       <div style={{ width: '900px', height: '770px' }}>
//         <FullCalendar
//           plugins={[dayGridPlugin, timeGridPlugin]}
//           initialView="dayGridMonth"
//           headerToolbar={{
//             left: 'prev,next today',
//             center: 'title',
//             right: 'dayGridMonth,timeGridWeek'
//           }}

//           events={events.map(event => ({
//             id: event.id,
//             title: event.title,
//             description: event.description,
//             start: event.start_time,
//             end: event.end_time,
//             ...getEventColor(event.typeevent),
//             borderColor: 'transparent'
//           }))}

//           eventContent={(eventInfo) => (
//             <div style={{ textAlign: 'center', backgroundColor: eventInfo.event.backgroundColor, color: eventInfo.event.textColor, borderRadius: '5px', padding: '3px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', marginTop: '2px', marginBottom: '2px' }}>
//               <span style={{ fontFamily: 'initial', fontWeight: 'bold', fontSize: '1.1rem' }}>{eventInfo.event.title}</span>
//             </div>
//           )}
//           eventClick={handleEventClick}
//           dayHeaderContent={({ date }) => (
//             <div style={{ padding: '7px', textAlign: 'center' }}>
//               {date.toLocaleDateString('fr-FR', { weekday: 'long' })}
//             </div>
//           )}

//         />

//         <Dialog open={selectedEvent !== null} onClose={handleCloseEditDeleteDialog}>
//           <DialogTitle>
//             Event Details
//             <IconButton aria-label="close" onClick={handleCloseEditDeleteDialog} style={{ position: 'absolute', right: '8px', top: '8px' }}>
//               <CloseIcon />
//             </IconButton>
//           </DialogTitle>
//           {selectedEvent && (
//             <EventEditDeleteDialog eventData={selectedEvent} onClose={handleCloseEditDeleteDialog} />
//           )}
//         </Dialog>

//         <EventFormDialog open={showForm} onClose={handleCloseForm} />
//       </div>
//     </div>
//   );
// }

// export default Calendar;
