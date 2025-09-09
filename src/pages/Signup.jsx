import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find(u => u.email === email)) {
      setError('User already exists');
      return;
    }

    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    setSuccess('Signup successful! Redirecting to login...');
    setTimeout(() => navigate('/login'), 1500);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        // background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px'
      }}
    >
      <Card
        className="p-4 shadow-lg rounded-4"
        style={{ maxWidth: '400px', width: '100%', backgroundColor: 'rgba(255,255,255,0.95)' }}
      >
        <Card.Body>
          <h2 className="text-center mb-4 fw-bold" style={{ color: '#333' }}>
            Sign Up
          </h2>

          {error && <Alert variant="danger" className="shadow-sm">{error}</Alert>}
          {success && <Alert variant="success" className="shadow-sm">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="rounded-3"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="rounded-3"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                className="rounded-3"
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 py-2 fw-semibold"
              style={{ 
                backgroundColor: '#667eea', 
                borderColor: '#667eea', 
                transition: 'all 0.3s ease' 
              }}
              onMouseOver={e => (e.target.style.backgroundColor = '#556cd6')}
              onMouseOut={e => (e.target.style.backgroundColor = '#667eea')}
            >
              Sign Up
            </Button>
          </Form>

          <div className="mt-3 text-center text-muted">
            Already have an account? <Link to="/login" style={{ textDecoration: 'none', color: '#764ba2', fontWeight: '500' }}>Login</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}


