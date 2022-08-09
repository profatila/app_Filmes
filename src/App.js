import Routes from './routes';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <div className='App'>
        <Routes />
        <ToastContainer autoClose={3000} />
    </div>
  );
}