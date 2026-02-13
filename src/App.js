// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Notyf } from 'notyf';

import 'bootstrap/dist/css/bootstrap.min.css';

import 'notyf/notyf.min.css';
// import Register from './pages/Register';
// import Login from './pages/Login';
import Home from './pages/Home';


import StudentOrgDirectory from './pages/StudentOrgDirectory';
import AdminOrgManagement from './pages/AdminOrgManagement';
import OrganizationDetails from './pages/OrganizationDetails';
import PostManager from './pages/PostManager';
import NewsEventsFeed from './pages/NewsEventsFeed';


import Navbar from './components/Navbar';

import { UserProvider, useUser } from './context/UserContext';

const notyf = new Notyf({ duration: 3000, position: { x: 'right', y: 'top' } });

// ProtectedRoute that uses context
const ProtectedRoute = ({ children }) => {
  const { user } = useUser();
  return user ? children : <Navigate to="/login" />;
};



const NewsRoute = () => {
  const { user, isAdmin, token } = useUser();
  const [organizations, setOrganizations] = React.useState([]);

  // Fetch organizations so the Admin can link posts to them
  React.useEffect(() => {
    if (isAdmin) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/organizations`)
        .then(res => res.json())
        .then(data => setOrganizations(data))
        .catch(err => console.error("Error fetching orgs for modal:", err));
    }
  }, [isAdmin]);

  if (!user) return <Navigate to="/login" />;

  return isAdmin ? (
    <PostManager token={token} notyf={notyf} organizations={organizations} />
  ) : (
    <NewsEventsFeed />
  );
};


// Helper for Organization Logic
const OrgsRoute = () => {
  const { user, isAdmin, token } = useUser();

  // Logic: If Admin, show the Management page. Otherwise, show the Directory.
  return isAdmin ?
    <AdminOrgManagement token={token} notyf={notyf} /> :
    <StudentOrgDirectory />;
};

// Helper for News/Events Logic
// const NewsRoute = () => {
//   const { user, isAdmin, token } = useUser();
//   return <PostsPage user={user} isAdmin={isAdmin} token={token} notyf={notyf} />;
// };



function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar notyf={notyf} />

        <Routes>
          <Route path="/" element={<Home />} />

          {/* Organizations: The Club/Dept Directory */}
          <Route path="/organizations" element={<OrgsRoute />} />
          <Route path="/organizations/:id" element={<OrganizationDetails />} />

          {/* News & Events */}
          <Route path="/news" element={<NewsRoute />} />
          {/* Single Post View (for both News and Events) */}
          {/* <Route path="/news/:id" element={<PostDetails user={user} token={token} />} /> */}


          {/* <Route path="/register" element={<Register notyf={notyf} />} />
                <Route path="/login" element={<Login notyf={notyf} />} /> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

      </Router>
    </UserProvider>
  );
}

export default App;