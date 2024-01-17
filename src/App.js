import './App.css';
import OtpButton from './component/OtpButton';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <h1>OTP Notification App</h1>
      <OtpButton />
      <ToastContainer />
    </div>
  );
}

export default App;
