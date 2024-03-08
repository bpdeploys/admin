import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/useAuth'; // Adjust the path if necessary

const withAuth = (WrappedComponent) => {
  return (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const { userInfo, refreshAuth } = useAuth();

    useEffect(() => {
      const checkAuth = async () => {
        if (!userInfo) {
          try {
            await refreshAuth(); // Use your context to refresh status
          } catch (error) {
            console.error('Error refreshing authentication');
          }
        }

        if (!userInfo) {
          // Check if still not logged in
          router.push('/login?session_expired=true');
        } else {
          setIsLoading(false);
        }
      };

      checkAuth();
    }, [router, userInfo, refreshAuth]);

    if (isLoading) {
      return <div>Checking authentication...</div>; // Enhanced loading UX
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
