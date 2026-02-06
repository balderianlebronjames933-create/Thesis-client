import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

  console.log("ENV BASE URL:", process.env.REACT_APP_API_BASE_URL);

const Register = ({ notyf }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return notyf.error('Passwords do not match');

    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      notyf.success('Registered successfully');
      navigate('/login');
    } else {
      const { error } = await res.json();
      notyf.error(error || 'Registration failed');
    }
  };




  return (
    <Form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
      </Form.Group>
      <Button type="submit">Register</Button>
    </Form>
  );
};

export default Register;