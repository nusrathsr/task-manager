// import React from 'react';
// import { Navbar, Nav, Container, Button } from 'react-bootstrap';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { useAppContext } from '../context/AppContext';

// export default function NavbarApp() {
//   const { state, dispatch } = useAppContext();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch({ type: 'LOGOUT' });
//     navigate('/login');
//   };

//   const toggleTheme = () => {
//     dispatch({ type: 'TOGGLE_THEME' });
//     // Apply the updated theme class on body
//     document.body.classList.toggle('dark-theme', state.theme !== 'dark');
//   };

//   return (
//     <Navbar
//       bg={state.theme === 'light' ? 'light' : 'dark'}
//       variant={state.theme === 'light' ? 'light' : 'dark'}
//       expand="lg"
//       className="mb-3"
//     >
//       <Container>
//         {/* Brand */}
//         <Navbar.Brand as={Link} to="/">
//           Task Manager
//         </Navbar.Brand>

//         {/* Mobile toggle */}
//         <Navbar.Toggle aria-controls="main-navbar" />
//         <Navbar.Collapse id="main-navbar">
//           {/* Left side links */}
//           <Nav className="me-auto">
//             <Nav.Link as={NavLink} to="/" end>
//               Home
//             </Nav.Link>
//             {state.auth.isAuthenticated && (
//               <>
//               <Nav.Link as={NavLink} to="/tasks">
//                 Tasks
//               </Nav.Link>
//               <Nav.Link as={NavLink} to="/tasks/add">
//         Add Task
//       </Nav.Link>
//       </>
//             )}
//           </Nav>

//           {/* Right side controls */}
//           <Nav className="ms-auto align-items-center">
//             {/* Theme toggle */}
//             <Button
//               size="sm"
//               variant={state.theme === 'light' ? 'outline-dark' : 'outline-light'}
//               className="me-2"
//               onClick={toggleTheme}
//             >
//               {state.theme === 'light' ? 'Dark Mode' : 'Light Mode'}
//             </Button>

//             {/* Auth controls */}
//             {!state.auth.isAuthenticated ? (
//               <>
//                 <Nav.Link as={NavLink} to="/login">
//                   Login
//                 </Nav.Link>
//                 <Nav.Link as={NavLink} to="/signup">
//                   Signup
//                 </Nav.Link>
//               </>
//             ) : (
//               <div className="d-flex align-items-center gap-2">
//                 <span className="text-white small">{state.auth.user?.email}</span>
//                 <Button size="sm" variant="outline-light" onClick={handleLogout}>
//                   Logout
//                 </Button>
//               </div>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }


import React from 'react';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function NavbarApp() {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
    document.body.classList.toggle('dark-theme', state.theme !== 'dark');
  };

  const navLinkStyle = ({ isActive }) => ({
    fontWeight: isActive ? '600' : '400',
    color: state.theme === 'light' ? '#000' : '#fff',
    marginRight: '1rem',
    textDecoration: 'none',
  });

  return (
    <Navbar
      bg={state.theme === 'light' ? 'light' : 'dark'}
      variant={state.theme === 'light' ? 'light' : 'dark'}
      expand="lg"
      className="mb-4 shadow-sm"
    >
      <Container>
        {/* Brand */}
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
          Task Manager
        </Navbar.Brand>

        {/* Mobile toggle */}
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          {/* Left links */}
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end style={navLinkStyle}>
              Home
            </Nav.Link>
            {state.auth.isAuthenticated && (
              <>
                <Nav.Link as={NavLink} to="/tasks" style={navLinkStyle}>
                  Tasks
                </Nav.Link>
                <Nav.Link as={NavLink} to="/tasks/add" style={navLinkStyle}>
                  Add Task
                </Nav.Link>
              </>
            )}
          </Nav>

          {/* Right controls */}
          <Nav className="ms-auto align-items-center">
            {/* Theme toggle */}
            <Button
              size="sm"
              variant={state.theme === 'light' ? 'outline-dark' : 'outline-light'}
              className="me-2 rounded-pill"
              onClick={toggleTheme}
            >
              {state.theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </Button>

            {/* Auth controls */}
            {!state.auth.isAuthenticated ? (
              <>
                <Nav.Link as={NavLink} to="/login" style={navLinkStyle}>
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/signup" style={navLinkStyle}>
                  Signup
                </Nav.Link>
              </>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <Badge bg="secondary" className="text-truncate" style={{ maxWidth: '150px' }}>
                  {state.auth.user?.email}
                </Badge>
                <Button size="sm" variant="light" className="rounded-pill" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
