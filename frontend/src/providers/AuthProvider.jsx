import { useState } from "react";
import useAuth from "../hooks/AuthHook";
import AuthContext from "../contexts/AuthContext";
import { useLocation, Navigate } from "react-router-dom";
import { Button } from "react-bootstrap";


export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
  
    const logIn = () => setLoggedIn(true);
    const logOut = () => {
      localStorage.removeItem('userId');
      setLoggedIn(false);
    };
    const getUserName = () => JSON.parse(localStorage.getItem('userId')).username;

    return (
      <AuthContext.Provider value={{ loggedIn, logIn, logOut, getUserName }}>
        {children}
      </AuthContext.Provider>
    );
  };

export const AuthButton = () => {
    const auth = useAuth();
    return (
      auth.loggedIn
        ? <Button onClick={auth.logOut}>Выйти</Button>
        : null
    );
  };

export const PrivateRoute = ({ children }) => {
    const auth = useAuth();
    const location = useLocation();
  
    return (
      auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
    );
  };

export const getAuthHeader = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
  
    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }
    return {};
  };
  