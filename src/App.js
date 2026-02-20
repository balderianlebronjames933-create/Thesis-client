// App.js

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { Notyf } from 'notyf';

import 'bootstrap/dist/css/bootstrap.min.css';

import 'notyf/notyf.min.css';
import Home from './pages/Home';


import StudentOrgDirectory from './pages/StudentOrgDirectory';
import AdminOrgManagement from './pages/AdminOrgManagement';
import OrganizationDetails from './pages/OrganizationDetails';
import PostManager from './pages/PostManager';
import NewsEventsFeed from './pages/NewsEventsFeed';


import Navbar from './components/Navbar';

import { UserProvider, useUser } from './context/UserContext';

const notyf = new Notyf({ duration: 3000, position: { x: 'right', y: 'top' } });



// Helper for Organization Logic
const OrgsRoute = () => {
  const {  isAdmin, token } = useUser();

  // Logic: If Admin, show the Management page. Otherwise, show the Directory.
  return isAdmin ?
    <AdminOrgManagement token={token} notyf={notyf} /> :
    <StudentOrgDirectory />;
};



// 1. Create a sub-component to hold your logic and routes
const AppContent = () => {
  const { user, isAdmin, token } = useUser(); // Now this works!

  return (
    <>
      <Navbar notyf={notyf} />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Organizations */}
        <Route path="/organizations" element={<OrgsRoute />} />
        <Route path="/organizations/:id" element={<OrganizationDetails />} />

        {/* News & Events */}
        <Route path="/news" element={<NewsEventsFeed notyf={notyf} />} />

        {/* Admin Only Route */}
        <Route
          path="/admin/news"
          element={
            user ? (
              isAdmin ? (
                <PostManager token={token} notyf={notyf} />
              ) : (
                <Navigate to="/news" />
              )
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

// 2. The Main App component only provides the context and the router
function App() {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
}

export default App;