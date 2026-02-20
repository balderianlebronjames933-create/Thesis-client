
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {  FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import '../css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section pt-5 pb-3">
      <Container>
        <Row className="gy-4">
          {/* Column 1: Brand/About */}
          <Col lg={4} md={6}>
            <div className="footer-brand mb-3">
              <h3 className="fw-bold text-white">UNITE</h3>
            </div>
            <p className="text-light-muted">
              The official portal for student organizations at the University of Rizal System - Taytay.
              Connecting students through teams and engagements.
            </p>
            <div className="social-links d-flex gap-3 mt-3">
              {/* <a href="#" className="social-icon"><FaFacebook size={20} /></a>
              <a href="#" className="social-icon"><FaTwitter size={20} /></a>
              <a href="#" className="social-icon"><FaInstagram size={20} /></a> */}
            </div>
          </Col>

          {/* Column 2: Quick Links */}
          <Col lg={2} md={6}>
            <h5 className="text-white fw-bold mb-4">Quick Links</h5>
            <ul className="list-unstyled footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/organizations">Organizations</Link></li>
              <li><Link to="/news">News & Events</Link></li>
              {/* <li><Link to="/privacy">Privacy Policy</Link></li> */}
            </ul>
          </Col>

          {/* Column 3: Resources */}
          <Col lg={2} md={6}>
            <h5 className="text-white fw-bold mb-4">Resources</h5>
            <ul className="list-unstyled footer-links">
              <li><a href="https://urs.edu.ph" target="_blank" rel="noreferrer">URS Official Website</a></li>
              <li><a href="https://www.facebook.com/URSTaytayAdmissionAndScholarship" target="_blank" rel="noreferrer">URST Admission & Scholarship</a></li>
              <li><a href="https://www.facebook.com/OfficeOfTheRegistrarURSTaytay" target="_blank" rel="noreferrer"> URST Office of the Registrar</a></li>

            </ul>
          </Col>

          {/* Column 4: Contact Info */}
          <Col lg={4} md={6}>
            <h5 className="text-white fw-bold mb-4">Contact Us</h5>
            <ul className="list-unstyled contact-info">
              <li className="d-flex mb-3">
                <FaMapMarkerAlt className="me-3 text-primary" />
                <span>URS Taytay Campus, Taytay, Rizal, Philippines</span>
              </li>
              <li className="d-flex mb-3">
                <FaPhone className="me-3 text-primary" />
                <span>+63 991 635 7792</span>
              </li>
              <li className="d-flex mb-3">
                <FaEnvelope className="me-3 text-primary" />
                <span>balderianlebronjames@gmail.com</span>
              </li>
            </ul>
          </Col>
        </Row>

        <hr className="footer-divider mt-5 mb-4" />

        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start">
            <p className="mb-0 text-light-muted">
              &copy; 2026 URS-Taytay UNITE.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end mt-2 mt-md-0">
            <p className="mb-0 text-light-muted small">
              University of Rizal System - Nurturing Tomorrow's Noblest.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;