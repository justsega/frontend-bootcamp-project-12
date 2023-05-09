import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navigation from './components/Navigation';
import { Container } from 'react-bootstrap';
import LoginPage from './components/LoginPage';
import NotFoundPage from './components/NotFoundPage';

const App = () => (
  <div className='d-flex flex-column h-100'>
    <Router>
      <Navigation />
      <Container fluid className='h-100'>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={null} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Container>
    </Router>
  </div>
);

export default App;
