import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Avatar,
  InputBase,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Event as EventIcon,
} from "@material-ui/icons";
import NotificationComponent from "../Notifications/NotificationComponent";
import { useStateContext } from "../../contexts/ContextProvider";
import axios from "axios";
import side from "./Navbar.module.css";

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const { user } = useStateContext();
  const { header } = useStateContext();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // useEffect(() => {

  // }, []); // Run only once on component mount

  const handleNotificationClick = async (event) => {
    setAnchorEl(event.currentTarget);
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      await fetchAndSetNotifications();
    }
  };

  const fetchAndSetNotifications = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/user/Notifications",
        header
      );
      fetchNotificationsCount();
      // setNotificationsCount(response.data.notifications.length);
      setNotifications(response.data.notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const fetchNotificationsCount = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/unread-notifications-count",
        header
      );
      setNotificationsCount(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching notifications count:", error);
    }
  };

  function getRealtimeNotification() {
    fetchNotificationsCount();
    setInterval(() => {
      fetchNotificationsCount();
    }, 5000);
  }

  // getRealtimeNotification();

  // TO DOOOOOOOOOOOOO DONT DELETE

  // const getRealtimeNotification = () => {
  //   axios
  //     .get("http://127.0.0.1:8000/api/realtimeNotifications", header)
  //     .then((response) => {
  //       const { new_notification_count, notification_count } = response.data;
  //       setNotificationsCount(notification_count);
  //       if (new_notification_count) {
  //           fetchNotificationsCount();
  //       }
  //       getRealtimeNotification();
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching realtime notifications:", error);
  //     });
  // };

  // useEffect(() => {
  //   const interval = setInterval(fetchNotificationsCount, 12000);
  //   return () => clearInterval(interval);
  // }, []); // Run only once on component mount

  const handleClose = () => {
    setAnchorEl(null);
    setShowNotifications(false);
  };

  return (
    <section className={side.sidebar}>
      <div className={side.logo}> Whiteline  </div>
      <div className={side.group}>
        <svg className={side.icon} aria-hidden="true" viewBox="0 0 24 24">
          <g>
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
          </g>
        </svg>
        <input placeholder="Recherche" type="search" className={side.input} />
      </div>
      <div>
        <Button
          className={side.button}
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <div className={side.text}>
            <span className={side.title}>{user.username}</span>
            <span className={side.subtitle}>{user.privileges}</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="w-4 h-4"
          >
            <path
              fill-rule="evenodd"
              d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
              clip-rule="evenodd"
            />
          </svg>
        </Button>

        {/* <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
        </Menu> */}
      </div>
      <div className={side.cal_notif}>
        <div className={side.notification} >
             {/* Affiche le badge uniquement si notificationsCount est supérieur à zéro */}
            {notificationsCount > 0 && (
              <div className={side.notification_badge}> {notificationsCount}</div>
            )}
            <img
            
            onClick={handleNotificationClick}
            src="/images/notification.png"
            alt="notification"
          />
          
          <Menu
            anchorEl={anchorEl}
            open={showNotifications}
            onClose={handleClose}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <MenuItem onClick={handleClose}>
              <NotificationComponent notifications={notifications} />
            </MenuItem>
          </Menu>
        </div>

        <div className={side.calendrier}>
          <Link to="Home/calendar">
            <img src="/images/calendar.png" alt="calendar" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Navbar;

// import React, { useState, useEffect } from "react";
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Badge,
//   Avatar,
//   InputBase,
//   Menu,
//   MenuItem,
// } from "@material-ui/core";
// import {
//   Search as SearchIcon,
//   Notifications as NotificationsIcon,
//   Event as EventIcon,
// } from "@material-ui/icons";
// import NotificationComponent from "../Notifications/NotificationComponent";
// import { useStateContext } from "../../contexts/ContextProvider";
// import axios from "axios";

// const Navbar = () => {
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [notificationsCount, setNotificationsCount] = useState(0);
//   const { header } = useStateContext();

//   const handleNotificationClick = async (event) => {
//     setAnchorEl(event.currentTarget);
//     setShowNotifications(!showNotifications);
//     if (!showNotifications) {
//       await fetchAndSetNotifications();
//     }
//   };

//   const fetchAndSetNotifications = async () => {
//     try {
//       const response = await axios.get(
//         "http://127.0.0.1:8000/api/user/Notifications",
//         header
//       );
//       setNotifications(response.data.notifications);
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//     }
//   };

//   const fetchNotificationsCount = async () => {
//     try {
//       const response = await axios.get(
//         "http://127.0.0.1:8000/api/unread-notifications-count",
//         header
//       );
//       setNotificationsCount(response.data);
//       console.log(response);
//     } catch (error) {
//       console.error("Error fetching notifications count:", error);
//     }
//   };

//    function getRealtimeNotification() {
//     axios.get('http://127.0.0.1:8000/api/realtimeNotifications', header).then((data) => {
//       if (data.new_notification_count) {
//         setNotificationsCount(data.notification_count);
//       }
//       console.log(data);
//       //getRealtimeNotification();
//     });
//   }

//   useEffect(() => {
//     getRealtimeNotification();
//     // const interval = setInterval(fetchNotificationsCount, 12000);
//     // return () => clearInterval(interval);
//   }, []); // Run only once on component mount

//   const handleClose = () => {
//     setAnchorEl(null);
//     setShowNotifications(false);
//   };

//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <div style={{ flexGrow: 1, marginLeft: "10px" }}>
//           <div
//             style={{
//               position: "relative",
//               borderRadius: "4px",
//               backgroundColor: "#f0f0f0",
//               padding: "2px",
//             }}
//           >
//             <InputBase
//               placeholder="Rechercher..."
//               style={{ paddingLeft: "2px" }}
//             />
//             <IconButton type="submit" aria-label="search">
//               <SearchIcon />
//             </IconButton>
//           </div>
//         </div>

//         <IconButton color="inherit" onClick={handleNotificationClick}>
//           <Badge badgeContent={notificationsCount} color="secondary">
//             <NotificationsIcon />
//           </Badge>
//         </IconButton>

//         <IconButton color="inherit">
//           <EventIcon />
//         </IconButton>

//         <IconButton color="inherit">
//           <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
//         </IconButton>

//         <Menu
//           anchorEl={anchorEl}
//           open={showNotifications}
//           onClose={handleClose}
//           getContentAnchorEl={null}
//           anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//           transformOrigin={{ vertical: "top", horizontal: "center" }}
//         >
//           <MenuItem onClick={handleClose}>
//             <NotificationComponent notifications={notifications} />
//           </MenuItem>
//         </Menu>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;
