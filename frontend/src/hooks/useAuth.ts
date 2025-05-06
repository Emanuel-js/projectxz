import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { authApi } from "../services/api/taskApi";

export const useAuth = () => {
  const { 
    user, 
    token, 
    isAuthenticated, 
    isLoading, 
    error,
    setUser,
    setToken,
    setIsLoading,
    setError,
    login,
    logout
  } = useAuthStore();

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      // Skip if we already have a user or if we're already loading
      if (user || isLoading || !token) return;
      
      setIsLoading(true);
      
      try {
        const userData = await authApi.me();
        setUser(userData);
      } catch (err) {
        console.error("Auth check failed:", err);
        setError("Authentication failed");
        logout();
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [user, isLoading, token, setUser, setIsLoading, setError, logout]);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout
  };
};

export default useAuth;
