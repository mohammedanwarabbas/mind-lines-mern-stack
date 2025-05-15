// This is normal cookies , use httponly cookies for sensitive data 
import { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null); // { id, role, username, token }

  /*
  structure of usrdata and token coming from backend:
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODE4NDg4NzdlOWI3YzNmY2IxMjM4NjIiLCJyb2xlIjoid3JpdGVyIiwiaWF0IjoxNzQ2Njg3NzM3LCJleHAiOjE3NDcyOTI1Mzd9.pk5GWNR0c4kLswhBeiGN5_QWf_u0Ega061gu0EAhTU8",
    "user": {
      "id": "681848877e9b7c3fcb123862",
      "role": "writer",
      "username": "writer 1"
      }
      }
      */
   // Login/register will call this after API success
  const setAuthData = (userData, token) => {
    // user data in cookies
    Cookies.set('token', token, { expires: 7 });
    Cookies.set('user', JSON.stringify(userData), { expires: 7 });
    // Set user data in state for (browser refresh resets state,so we use cookies)
    setUser({ ...userData, token }); // Store token in context
  };

// set initial state from cookies if cookies are present
  useEffect(() => {
    const token = Cookies.get('token');
    const userData = Cookies.get('user');

    if (token && userData) {
      try {
        setUser({ ...JSON.parse(userData), token });
      } catch (err) {
        console.error("Failed to parse user data from cookies", err);
        Cookies.remove('user');
        Cookies.remove('token');
      }
    }
  }, []);

  const logout = () => {
    // Clear everything
    Cookies.remove('token');
    Cookies.remove('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setAuthData, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
