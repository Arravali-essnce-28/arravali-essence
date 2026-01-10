import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../../services/auth.service';

const GoogleCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const data = await authService.handleGoogleCallback();
        
        // Redirect to home page after successful authentication
        navigate('/', { replace: true });
      } catch (error) {
        console.error('Google callback error:', error);
        navigate('/login', { 
          replace: true, 
          state: { error: 'Google login failed. Please try again.' } 
        });
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing Google sign in...</p>
      </div>
    </div>
  );
};

export default GoogleCallback;
