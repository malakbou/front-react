import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useStateContext } from '../../contexts/ContextProvider';


const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const { header } = useStateContext();
 

  useEffect(() => {
    fetchNotifications();

  }, [header]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/user/Notifications', header);
      setNotifications(response.data);
      console.log(notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  


  const markNotificationAsRead = async (notificationId) => {
    try {
      const res = await axios.put(`http://127.0.0.1:8000/api/Notifications/${notificationId}`, {
        read_at: new Date().toISOString()
    }, header);
      console.error(res);
      setNotifications(prevNotifications =>
        prevNotifications.map(notification => {
          if (notification.id === notificationId) {
            return { ...notification, read_at: new Date().toISOString() };
          }
          return notification;
        })
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map(notification => (
          <li key={notification.id}>
            <div>
              <h3>{notification.data.title}</h3>
              <p>{notification.data.description}</p>
              <p>{notification.data.typeevent}</p>
              <p>{notification.data.end_time}</p>

              {!notification.read_at && (
                <button  onClick={() => markNotificationAsRead(notification.id)}>
                  Mark as Read
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationComponent;










// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useStateContext } from '../../contexts/ContextProvider';

// const NotificationComponent = () => {
//   const [notifications, setNotifications] = useState([]);
//   const { header } = useStateContext();

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:8000/api/user/Notifications', header);
//         setNotifications(response.data);
//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//       }
//     };

//     fetchNotifications();
//   }, [header]);

//   const markNotificationAsRead = async (notificationId) => {
//     try {
//       console.log('heyyyyyy');
//       const res = await axios.put(`http://127.0.0.1:8000/api/Notifications/${notificationId}`, {
//         read_at: new Date().toISOString()
//     }, header);
//       console.error(res);
//       setNotifications(prevNotifications =>
//         prevNotifications.map(notification => {
//           if (notification.id === notificationId) {
//             return { ...notification, read_at: new Date().toISOString() };
//           }
//           return notification;
//         })
//       );
//     } catch (error) {
//       console.error('Error marking notification as read:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Notifications</h2>
//       <ul>
//         {notifications.map(notification => (
//           <li key={notification.id}>
//             <div>
//               <h3>{notification.data.title}</h3>
//               <p>{notification.data.description}</p>
//               <p>{notification.data.typeevent.typeevent}</p>
//               <p>{notification.data.start_time}</p>
//               {!notification.read_at && (
//                 <button  onClick={() => markNotificationAsRead(notification.id)}>
//                   Mark as Read
//                 </button>
//               )}
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default NotificationComponent;




