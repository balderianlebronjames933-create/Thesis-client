// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Notyf } from 'notyf';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'notyf/notyf.min.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Movies from './pages/Movies'

import AdminDashboard from './pages/AdminDashboard'

import Navbar from './components/Navbar';

import { UserProvider, useUser } from './context/UserContext';

const notyf = new Notyf();

// ProtectedRoute that uses context
const ProtectedRoute = ({ children }) => {
  const { user } = useUser();
  return user ? children : <Navigate to="/login" />;
};

// Role-based route for /movies
const MoviesRoute = () => {
  const { user, isAdmin } = useUser();

  if (!user) return <Navigate to="/login" />;
  return isAdmin ? <AdminDashboard /> : <Movies />;
};

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
            <Container className="py-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register notyf={notyf} />} />
                <Route path="/login" element={<Login notyf={notyf} />} />
                <Route path="/movies" element={<MoviesRoute />} />
              </Routes>
            </Container>

      </Router>
    </UserProvider>
  );
}

export default App;