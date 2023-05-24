import { React, useState, useMemo } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import useAuth from '../hooks/AuthHook';
import AuthContext from '../contexts/AuthContext';

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };
  const getUserName = () => JSON.parse(localStorage.getItem('userId')).username;

  const memo = useMemo(() => ({
    loggedIn, logIn, logOut, getUserName,
  }));
  return (
    <AuthContext.Provider value={memo}>
      {children}
    </AuthContext.Provider>
  );
}

export function AuthButton() {
  const auth = useAuth();
  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Выйти</Button>
      : null
  );
}

// eslint-disable-next-line react/prop-types
export function PrivateRoute({ children }) {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
}

export const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};
