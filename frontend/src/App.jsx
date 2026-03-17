import './App.css'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AllLinks from './pages/AllLinks'
import Dashboard from './pages/Dashboard'
import Statistics from './pages/Statistics'
import MyLinks from './pages/MyLinks'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminPanel from './pages/AdminPanel'
import ProtectedRoute from './components/ProtectedRoute'
import authService from './services/authService'

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const handleUserUpdate = (newUser) => {
    setUser(newUser);
  };

  // Redirect authenticated users away from login/register
  const LoginPage = () => {
    if (user) {
      return <Navigate to="/dashboard" />;
    }
    return <Login />;
  };

  const RegisterPage = () => {
    if (user) {
      return <Navigate to="/dashboard" />;
    }
    return <Register />;
  };

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <>
      <Navbar user={user} onUserUpdate={handleUserUpdate} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-links" element={<AllLinks />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/statistics" 
          element={
            <ProtectedRoute>
              <Statistics />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/my-links" 
          element={
            <ProtectedRoute>
              <MyLinks />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminPanel />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </>
  )
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  )
}

export default AppWrapper
