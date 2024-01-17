
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';

// import { getFirebaseToken, onForegroundMessage } from '../firebase';
// import { getMessaging, getToken } from 'firebase/messaging';

// const OtpButton = () => {
//     const [showNotificationBanner, setShowNotificationBanner] = useState(Notification.permission === 'default');

//     useEffect(() => {
//       onForegroundMessage()
//         .then((payload) => {
//           console.log('Received foreground message: ', payload);
//           const { notification: { title, body } } = payload;
//           toast(<ToastifyNotification title={title} body={body} />);
//         })
//         .catch(err => console.log('An error occured while retrieving foreground message. ', err));
//     }, []);
  
//     const handleGetFirebaseToken = () => {
//       getFirebaseToken()
//         .then((firebaseToken) => {
//           console.log('Firebase token: ', firebaseToken);
//           if (firebaseToken) {
//             setShowNotificationBanner(false);
//           }
//         })
//         .catch((err) => console.error('An error occured while retrieving firebase token. ', err))
//     }
  
//     const ToastifyNotification = ({ title, body }) => (
//       <div className="push-notification">
//         <h2 className="push-notification-title">{title}</h2>
//         <p className="push-notification-text">{body}</p>
//       </div>
//     );

//   return (
//     <div className="app">
//       {showNotificationBanner && <div className="notification-banner">
//         <span>The app needs permission to</span>
//         <a
//           href="#"
//           className="notification-banner-link"
//           onClick={handleGetFirebaseToken}
//         >
//           enable push notifications.
//         </a>
//       </div>}

     

//       <button
//         className="btn-primary"
//         onClick={() => toast(<ToastifyNotification title="New Message" body="Hi there!" />)}
//       >
//         Show toast notification
//       </button>

//       <ToastContainer hideProgressBar />
//     </div>
//   )
// };

// export default OtpButton;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import { getFirebaseToken, onForegroundMessage } from '../firebase';
import { getMessaging, getToken } from 'firebase/messaging';

const OtpButton = () => {
  const [showNotificationBanner, setShowNotificationBanner] = useState(Notification.permission === 'default');
  const [otp, setOtp] = useState('');

  useEffect(() => {
    onForegroundMessage()
      .then((payload) => {
        console.log('Received foreground message: ', payload);
        const { notification: { title, body } } = payload;
        toast(<ToastifyNotification title={title} body={body} />);
      })
      .catch(err => console.log('An error occurred while retrieving foreground message. ', err));
  }, []);

  const handleGetFirebaseToken = () => {
    // Generate a random 6-digit OTP
    const randomOtp = Math.floor(100000 + Math.random() * 900000);
    setOtp(randomOtp.toString());

    getFirebaseToken()
      .then((firebaseToken) => {
        console.log('Firebase token: ', firebaseToken);
        if (firebaseToken) {
          setShowNotificationBanner(false);
          // Display toast notification with the generated OTP
          toast(<ToastifyNotification title="New Message" body={`Your OTP is: ${otp}`} />);
        }
      })
      .catch((err) => console.error('An error occurred while retrieving firebase token. ', err))
  }

  const ToastifyNotification = ({ title, body }) => (
    <div className="push-notification">
      <h2 className="push-notification-title">{title}</h2>
      <p className="push-notification-text">{body}</p>
    </div>
  );

  return (
    <div className="app">
      {showNotificationBanner && <div className="notification-banner">
        <span>The app needs permission to</span>
        <a
          href="#"
          className="notification-banner-link"
          onClick={handleGetFirebaseToken}
        >
          enable push notifications.
        </a>
      </div>}

      <button
        className="btn-primary"
        onClick={() => handleGetFirebaseToken()}
      >
        Show toast notification with OTP
      </button>

      <ToastContainer hideProgressBar />
      {/* <style jsx>{`
        .app {
          max-width: 400px;
          margin: auto;
          padding: 20px;
          text-align: center;
        }

        .notification-banner {
          background-color: #f8d7da;
          color: #721c24;
          padding: 10px;
          margin-bottom: 15px;
        }

        .notification-banner-link {
          color: #721c24;
          font-weight: bold;
          text-decoration: underline;
          cursor: pointer;
        }

        .btn-primary {
          background-color: #007bff;
          color: #fff;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          border: none;
          border-radius: 5px;
          margin-bottom: 15px;
        }

        .push-notification {
          background-color: #d4edda;
          border: 1px solid #c3e6cb;
          border-radius: 5px;
          padding: 10px;
          margin-bottom: 15px;
        }

        .push-notification-title {
          font-size: 18px;
          margin-bottom: 5px;
        }

        .push-notification-text {
          font-size: 14px;
        }
      `}</style> */}
    </div>
  );
};

export default OtpButton;

