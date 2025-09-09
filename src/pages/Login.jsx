// import React, { useState } from 'react'
// import { Form, Button, Card, Alert } from 'react-bootstrap'
// import { useNavigate, Link } from 'react-router-dom'
// import { useAppContext } from '../context/AppContext'

// export default function Login() {
//   const navigate = useNavigate()
//   const { dispatch } = useAppContext()
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState(null)

//   const handleSubmit = e => {
//     e.preventDefault()
//     const users = JSON.parse(localStorage.getItem('users')) || []

//     const user = users.find(
//       u => u.email === email && u.password === password
//     )

//     if (!user) {
//       setError('Invalid email or password')
//       return
//     }

//     // Save auth state
//     localStorage.setItem('auth', JSON.stringify({ email }))
//     dispatch({ type: 'LOGIN', payload: { email } })

//     navigate('/tasks')
//   }

//   return (
//     <div className="d-flex justify-content-center align-items-center py-5">
//       <Card className="p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
//         <Card.Body>
//           <h2 className="text-center mb-4">Login</h2>

//           {error && <Alert variant="danger">{error}</Alert>}

//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-3" controlId="formEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter email"
//                 value={email}
//                 onChange={e => setEmail(e.target.value)}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formPassword">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={e => setPassword(e.target.value)}
//                 required
//               />
//             </Form.Group>

//             <Button variant="primary" type="submit" className="w-100">
//               Login
//             </Button>
//           </Form>

//           <div className="mt-3 text-center">
//             Don’t have an account? <Link to="/signup">Sign up</Link>
//           </div>
//         </Card.Body>
//       </Card>
//     </div>
//   )
// }


import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Login() {
  const navigate = useNavigate();
  const { dispatch } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    setError(null);

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      setError('Invalid email or password');
      return;
    }

    // Save auth state
    localStorage.setItem('auth', JSON.stringify({ email }));
    dispatch({ type: 'LOGIN', payload: { email } });

    navigate('/tasks');
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
            Login
          </h2>

          {error && <Alert variant="danger" className="shadow-sm">{error}</Alert>}

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

            <Form.Group className="mb-4" controlId="formPassword">
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
              Login
            </Button>
          </Form>

          <div className="mt-3 text-center text-muted">
            Don’t have an account?{' '}
            <Link
              to="/signup"
              style={{ textDecoration: 'none', color: '#764ba2', fontWeight: '500' }}
            >
              Sign up
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
