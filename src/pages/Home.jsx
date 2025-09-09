// import React from 'react'
// import { Card } from 'react-bootstrap'
// import { Link } from 'react-router-dom'

// export default function Home() {
//   return (
//     <div className="d-flex justify-content-center align-items-center py-5">
//       <Card className="text-center p-4 shadow" style={{ maxWidth: '500px' }}>
//         <Card.Body>
//           <Card.Title as="h2">Welcome to Task Manager 🚀</Card.Title>
//           <Card.Text className="mt-3">
//             Manage your daily tasks efficiently.  
//             Sign up or log in to start organizing your work!
//           </Card.Text>
//           <div className="mt-4">
//             <Link to="/signup" className="btn btn-primary me-2">
//               Sign Up
//             </Link>
//             <Link to="/login" className="btn btn-outline-primary">
//               Login
//             </Link>
//           </div>
//         </Card.Body>
//       </Card>
//     </div>
//   )
// }

import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ backgroundColor: '#f5f5f5', padding: '2rem' }}
    >
      <Card
        className="text-center p-5 shadow-lg rounded-5"
        style={{
          maxWidth: '500px',
          width: '100%',
          border: 'none',
          background: 'linear-gradient(145deg, #ffffff, #e9ecef)',
        }}
      >
        <Card.Body>
          {/* Heading */}
          <Card.Title
            as="h2"
            className="fw-bold mb-4"
            style={{ fontSize: '2.2rem', color: '#343a40' }}
          >
            Welcome to Task Manager 🚀
          </Card.Title>

          {/* Subheading */}
          <Card.Text
            className="mb-4 text-secondary"
            style={{ fontSize: '1.1rem', lineHeight: '1.6' }}
          >
            Manage your daily tasks efficiently. <br />
            Sign up or log in to start organizing your work!
          </Card.Text>

          {/* Buttons */}
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link
              to="/signup"
              className="btn btn-lg rounded-pill px-4"
              style={{
                background:
                  'linear-gradient(90deg, #4e54c8 0%, #8f94fb 100%)',
                color: '#fff',
                fontWeight: '500',
                transition: '0.3s',
              }}
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="btn btn-lg rounded-pill px-4"
              style={{
                border: '2px solid #4e54c8',
                color: '#4e54c8',
                backgroundColor: 'transparent',
                fontWeight: '500',
                transition: '0.3s',
              }}
              onMouseEnter={e => {
                e.target.style.backgroundColor = '#4e54c8';
                e.target.style.color = '#fff';
              }}
              onMouseLeave={e => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#4e54c8';
              }}
            >
              Login
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
