import { SignupFormData } from "@/types/auth";
import { useState, useEffect } from "react";
import { loginUser, signupUser, signupUserWithGoogle } from "@/api";
import { useNavigate } from "react-router-dom";
import { useToast } from "./useToast";
import { useUserStore } from "@/store";
import { getUserProfile } from "@/api/profile";

interface AuthHook {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  // user: User | null;
  signup: (signupData: SignupFormData) => Promise<void>;
  signupWithGoogle: (cred: string) => Promise<void>;
}

// interface User {
//   id: string;
//   fullName: string;
//   email: string;
//   grade: number;
// }

export const useAuth = (): AuthHook => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const [user, setUser] = useState<User | null>(null);
  const { setUser, setUserStats } = useUserStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check authentication on initial load
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (token) {
          const response = await getUserProfile();
          // console.log("checkauth - ", response);
          if (response.success) {
            setUser(response.data.user);
            setUserStats(response.data.stats);
            setIsAuthenticated(true);
            // setIsLoading(false);
          } else {
            localStorage.removeItem("authToken");
            setIsAuthenticated(false);
            // setIsLoading(false);
            // navigate("/");
          }
        } else {
          localStorage.removeItem("authToken");
          setIsAuthenticated(false);
          // setIsLoading(false);
          // navigate("/");
        }
      } catch (error) {
        localStorage.removeItem("authToken");
        setIsAuthenticated(false);
        // setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await loginUser(email, password);
      if (response.success) {
        const { token, user } = response.data;
        localStorage.setItem("authToken", token);
        setUser(user);
        setIsAuthenticated(true);
        // setIsLoading(true);
        navigate("/");
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Something went wrong",
        });
      }
    } catch (error: any) {
      // console.error("Login error", error.response.data);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.response?.data?.message || "Something went wrong",
      });
      // throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (signupData: SignupFormData) => {
    setIsLoading(true);
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
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: error?.response?.data?.errors?.join(", ") || error?.response?.data?.message || "Something went wrong",
      });
    } finally {
      setIsLoading(false);
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
        setIsLoading(true);
        navigate("/");
      } else {
        toast({
          variant: "destructive",
          title: "Signup failed",
          description: response.data.message || "Something went wrong",
        });
        // throw new Error("Signup failed");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: error.response?.data?.message || "Something went wrong",
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
    signup,
    signupWithGoogle,
  };
};
