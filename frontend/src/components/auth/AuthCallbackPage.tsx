import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function AuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const token = searchParams.get('token');
        if (token) {
          // Get user data from your backend using the token
          const response = await fetch('http://localhost:5000/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
          });

          if (!response.ok) {
            throw new Error('Failed to get user data');
          }

          const userData = await response.json();
          login(userData);

          // Get the stored redirect path or default to dashboard
          const redirectTo = localStorage.getItem('postLoginRedirect') || '/dashboard';
          localStorage.removeItem('postLoginRedirect'); // Clean up
          
          // If this is a popup, communicate with the opener
          if (window.opener) {
            window.opener.postMessage({ type: 'AUTH_SUCCESS', userData }, window.location.origin);
            window.close();
          } else {
            // If not a popup, navigate directly
            navigate(redirectTo);
          }
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        navigate('/login'); // Redirect to login on error
      }
    };

    handleCallback();
  }, [searchParams, login, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl mb-4">Completing authentication...</h2>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  );
}