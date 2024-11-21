import { SignupFormData } from "@/types/auth";
import { useState, useEffect } from "react";
import { loginUser, signupUser, signupUserWithGoogle } from "@/api";
import { useNavigate } from "react-router-dom";
import { useToast } from "./useToast";

interface AuthHook {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  user: User | null;
  signup: (signupData: SignupFormData) => Promise<void>;
  signupWithGoogle: (cred: string) => Promise<void>;
}

interface User {
  id: string;
  fullName: string;
  email: string;
  grade: number;
}

export const useAuth = (): AuthHook => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check authentication on initial load
    const checkAuth = async () => {
      try {
        // TODO: Replace with actual token validation
        const token = localStorage.getItem("authToken");
        // console.log("token - ", token);
        if (token) {
          setIsAuthenticated(true);
          return;
          // Validate token with backend
          const response = await fetch("/api/validate-token", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            setIsAuthenticated(true);
          } else {
            // Invalid token
            localStorage.removeItem("authToken");
            setIsAuthenticated(false);
          }
        }
      } catch (error) {
        console.error("Authentication check failed", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginUser(email, password);
      if (response.success) {
        const { token, user } = response.data;
        localStorage.setItem("authToken", token);
        setUser(user);
        setIsAuthenticated(true);
        navigate("/");
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Something went wrong",
        });
      }
    } catch (error) {
      console.error("Login error", error);
      throw error;
    }
  };

  const signup = async (signupData: SignupFormData) => {
    try {
      const response = await signupUser(signupData);
      if (response.success) {
        const { token, user } = response.data;
        localStorage.setItem("authToken", token);
        setUser(user);
        setIsAuthenticated(true);
        navigate("/");
      } else {
        toast({
          variant: "destructive",
          title: "Signup failed",
          description: response.data.message || "Something went wrong",
        });
        // throw new Error("Signup failed");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: "Something went wrong",
      });
    }
  };

  const signupWithGoogle = async (credential: string) => {
    // console.log('credential - ', credential)
    try {
      const response = await signupUserWithGoogle(credential);
      // console.log('response - ', response)
      if (response.success) {
        const { token, user } = response.data;
        localStorage.setItem("authToken", token);
        setUser(user);
        setIsAuthenticated(true);
        navigate("/");
      } else {
        toast({
          variant: "destructive",
          title: "Signup failed",
          description: response.data.message || "Something went wrong",
        });
        // throw new Error("Signup failed");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: "Something went wrong",
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
    user,
    signup,
    signupWithGoogle,
  };
};
