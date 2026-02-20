import  { useState } from 'react';
import { Form, Button, Modal, InputGroup } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterModal = ({ show, handleClose, openLogin, notyf }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return notyf.error('Passwords do not match');

    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    if (res.ok) {
      notyf.success('Registered successfully');
      handleClose(); // Close modal on success
    } else {
      const { error } = await res.json();
      notyf.error(error || 'Registration failed');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton><Modal.Title>Register</Modal.Title></Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" value={lastName} onChange={e => setLastName(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </Form.Group>

          <Form.Label>Password</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </InputGroup>

          <Form.Label>Confirm Password</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </InputGroup>

          <Button variant="primary" type="submit" className="w-100">Register</Button>
        </Form>
        <div className="text-center mt-3">
          <small>
            Already have an account?{' '}
            <span
              className="text-primary"
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
              onClick={openLogin}
            >
              Login here
            </span>
          </small>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;