import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('emhaToken');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      // Pass the error message through navigation state
      navigate('/', { 
        replace: true, 
        state: { authError: "Access Denied: Please login as an admin to view that page." } 
      });
    }
  }, [token, navigate]);

  if (!token) return null;
  return children;
};