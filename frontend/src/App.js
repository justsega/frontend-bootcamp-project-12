import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav } from 'react-bootstrap';
import LoginPage from './components/LoginPage';
import NotFoundPage from './components/NotFoundPage';
import MainPage from './components/chat/MainPage';
import SignUp from './components/SignUp';
import { AuthProvider, AuthButton, PrivateRoute } from './providers/AuthProvider';
import { SocketProvider } from './providers/SocketProvider';

const App = () => (
  <div className='d-flex flex-column h-100'>
    <AuthProvider>
      <SocketProvider>
        <Router>
          <Navbar expand="lg" bg="white" className='shadow-sm'>
            <Container>
              <Navbar.Brand as={Link} to="/">Hexlet chat</Navbar.Brand>
                <Nav className="mr-auto"></Nav>
                <AuthButton />
            </Container>
          </Navbar> 
          <Routes>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/" element={(<PrivateRoute><MainPage /></PrivateRoute>)} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
      </Router>
    </SocketProvider>
    </AuthProvider>
  </div>
);

export default App;
