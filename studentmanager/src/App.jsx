import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import StudentDetails from './components/student/StudentDetails';
import Scholarship from './components/scholarship/Scholarship';
import Payment from './components/payment/Payment';
import CGPA from './components/academic/CGPA';
import Navbar from './components/common/Navbar';
import { AuthProvider } from './context/AuthContext';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/student-details" element={<StudentDetails />} />
                <Route path="/scholarship" element={<Scholarship />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/cgpa" element={<CGPA />} />
                <Route path="/" element={<Navigate to="/login" replace />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
