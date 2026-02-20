import { useState } from 'react';
import { Navbar, Nav, Container, Button, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import RegisterModal from '../pages/Register';
import LoginModal from '../pages/Login';
import '../css/Navbar.css'; // Custom CSS for Navbar


const NavbarComponent = ({ notyf }) => {
  const { user, isAdmin, logout } = useUser();
  const navigate = useNavigate();

  // Modal States
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);


  const openLogin = () => { setShowRegister(false); setShowLogin(true); };
  const openRegister = () => { setShowLogin(false); setShowRegister(true); };

  const handleLogout = () => {
    logout();
    navigate('/'); // Changed from /login to /
  };

  return (
    <>
      <Navbar variant="dark" expand="lg" className="solid-nav" sticky="top">
        <Container fluid className="p-0">
          <Navbar.Brand as={Link} to="/" className="ms-3">
            <img src="/University_of_Rizal.png" width="40" height="40" className="me-2" alt="Logo" />
            UNITE
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" className='mx-2' />
          <Navbar.Offcanvas id="offcanvasNavbar" placement="end" className="solid-nav">
            <Offcanvas.Header closeButton className="border-bottom border-white-50">
              <Offcanvas.Title className="text-white">
                <img
                  src="/University_of_Rizal.png"
                  width="40"
                  height="40"
                  className="d-inline-block align-top me-2" // 'me-2' adds a margin after the logo
                  alt="UNITE logo"
                />

                UNITE</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3 align-items-center">
                <Nav.Link as={NavLink} to="/" className="text-white display-5">Home</Nav.Link>


                <Nav.Link as={NavLink} to="/organizations" className="text-white">
                  {isAdmin ? 'Org Management' : 'About Organizations'}
                </Nav.Link>


                {/* <Nav.Link as={Link} to="/organizations" className="text-white">About Organizations</Nav.Link> */}
                {/* <Nav.Link as={Link} to="/" className="text-white">News & Events</Nav.Link> */}

                {/* In your Navbar Nav section */}
                <Nav.Link as={NavLink} to="/news" className="text-white">News & Events</Nav.Link>

                {isAdmin && (
                  <Nav.Link as={NavLink} to="/admin/news" className="text-white fw-bold text-warning">
                    Post Manager
                  </Nav.Link>
                )}

                {/* CONSOLIDATED TAB LOGIC */}
                {user ? (
                  <Nav className="ms-lg-auto align-items-center">
                    <span className="text-secondary welcome-text">
                      Welcome, <strong>{user.firstName || 'Student'} {user.lastName}</strong>
                    </span>
                    <Button
                      variant="outline-light"
                      size="sm"
                      onClick={handleLogout}
                      className="logout-btn rounded-pill px-3"
                    >
                      Logout
                    </Button>
                  </Nav>
                ) : (
                  <Button
                    variant="warning" // Gold/Yellow accent
                    className="ms-lg-3 rounded-pill px-4 fw-bold"
                    onClick={() => setShowLogin(true)}
                  >
                    Portal Login
                  </Button>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      {/* Modals rendered outside the Navbar structure */}
      <RegisterModal
        show={showRegister}
        handleClose={() => setShowRegister(false)}
        openLogin={openLogin} // New Prop
        notyf={notyf}
      />
      <LoginModal
        show={showLogin}
        handleClose={() => setShowLogin(false)}
        openRegister={openRegister} // New Prop
        notyf={notyf}
      />
    </>
  );
};

export default NavbarComponent;
