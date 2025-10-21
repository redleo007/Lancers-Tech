import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function AuthCallbackPage() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token && window.opener) {
      // Send the token to the main window
      window.opener.postMessage({ token }, window.location.origin);
    }
    // Close the popup window
    window.close();
  }, [searchParams]);

  return <div>Authenticating...</div>;
}