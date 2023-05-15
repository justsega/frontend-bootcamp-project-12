import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Button, Navbar, Nav } from 'react-bootstrap';
import LoginPage from './components/LoginPage';
import NotFoundPage from './components/NotFoundPage';
import MainPage from './components/chat/MainPage';
import AuthContext from './contexts';
import useAuth from './hooks';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const AuthButton = () => {
  const auth = useAuth();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Выйти</Button>
      : null
  );
};

const App = () => (
  <div className='d-flex flex-column h-100'>
    <AuthProvider>
    <Router>
    <Navbar expand="lg" bg="white" className='shadow-sm'>
        <Container>
        <Navbar.Brand as={Link} to="/">Slack chat</Navbar.Brand>
        <Nav className="mr-auto">
        </Nav>
        <AuthButton />
        </Container>
      </Navbar> 
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={(<PrivateRoute><MainPage /></PrivateRoute>)} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
    </Router>
    </AuthProvider>
  </div>
);

export default App;
