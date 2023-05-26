import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav } from 'react-bootstrap';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslation } from 'react-i18next';
import LoginPage from './components/LoginPage';
import NotFoundPage from './components/NotFoundPage';
import MainChatPage from './components/MainChatPage';
import SignUp from './components/SignUp';
import { AuthButton, PrivateRoute } from './providers/AuthProvider';
import './style.css';

const App = () => {
  const { t } = useTranslation();
  return (
    <div className="d-flex flex-column h-100">
      <Router>
        <Navbar expand="lg" bg="white" className="shadow-sm">
          <Container>
            <Navbar.Brand as={Link} to="/">{t('mainTitle')}</Navbar.Brand>
            <Nav className="mr-auto" />
            <AuthButton />
          </Container>
        </Navbar>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={(<PrivateRoute><MainChatPage /></PrivateRoute>)} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>

    </div>
  );
};

export default App;
