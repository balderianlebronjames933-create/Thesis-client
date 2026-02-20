import  { useState } from 'react';
import { Form, Button, Modal, InputGroup } from 'react-bootstrap';
import { useUser } from '../context/UserContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginModal = ({ show, handleClose, openRegister, notyf }) => {
    const { login } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (res.ok) {
            login(data.access);
            notyf.success('Logged in');
            handleClose();
        } else {
            notyf.error(data.error || 'Login failed');
        }
    };

return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton><Modal.Title>Login</Modal.Title></Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
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
                    
                    <Button variant="success" type="submit" className="w-100">Login</Button>
                </Form>

                <div className="text-center mt-3">
                    <small>
                        Don't have an account?{' '}
                        <span 
                            className="text-primary" 
                            style={{ cursor: 'pointer', textDecoration: 'underline' }}
                            onClick={openRegister}
                        >
                            Sign up first
                        </span>
                    </small>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default LoginModal;