import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import GoogleSignIn from "./GoogleSignIn";
import { signup } from "@/api";
import { useToast } from "@/hooks/useToast";

interface LoginFormData {
  email: string;
  password: string;
}

interface SignupFormData extends LoginFormData {
  fullName: string;
  email: string;
  password: string;
  grade: number;
}

interface Errors {
  email?: string;
  password?: string;
  grade?: string;
  fullName?: string;
}

const ALLOWED_GRADES = [7, 8, 9, 10];

export default function LoginPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("login");
  // console.log("activeTab - ", activeTab);
  const [loginData, setLoginData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  // console.log("loginData - ", loginData);
  const [signupData, setSignupData] = useState<SignupFormData>({
    email: "",
    password: "",
    fullName: "",
    grade: 0,
  });
  // console.log("signupData - ", signupData);

  const [errors, setErrors] = useState<Errors>({});
  // console.log("errors - ", errors);
  const validateLoginData = (loginData: LoginFormData) => {
    const newErrors: Errors = {};
    if (!loginData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!loginData.password) {
      newErrors.password = "Password is required.";
    } else if (loginData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
        loginData.password
      )
    ) {
      newErrors.password =
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.";
    }
    return newErrors;
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Login data submitted:", loginData);
    const validationErrors = validateLoginData(loginData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      alert("Form submitted successfully!");
    }
  };

  const validateSignupData = (signupData: SignupFormData) => {
    const newErrors: Errors = {};
    if (!signupData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      newErrors.email = "Email is invalid.";
    }

    if (!signupData.password) {
      newErrors.password = "Password is required.";
    } else if (signupData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
        signupData.password
      )
    ) {
      newErrors.password =
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.";
    }

    if (!signupData.fullName) {
      newErrors.fullName = "Full name is required.";
    }

    if (!signupData.grade) {
      newErrors.grade = "Grade is required.";
    } else if (!ALLOWED_GRADES.includes(signupData.grade)) {
      newErrors.grade = "Please pick from allowed grades.";
    }

    return newErrors;
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Signup data submitted:", signupData);

    const validationErrors = validateSignupData(signupData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      try {
        const response = await signup(signupData);
        console.log('response - ', response)
      } catch (e) {
        console.log('e - ', e)
        toast({
          variant: "destructive",
          title: "Network Error",
          description: "No response received from server. Check your internet connection."
        });
      }
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");

    // Add logic to integrate with Google OAuth here
    alert("Google Login Clicked! Redirecting to Google login...");
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Welcome to QuizMaster</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          {/* LOGIN CARD */}
          <TabsContent value="login">
            <div className="grid gap-4">
              <div className="grid gap-2">
                {/* <Label htmlFor="email">Email</Label> */}
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              <div className="grid gap-2">
                {/* <div className="flex items-center"> */}
                {/* <Label htmlFor="password">Password</Label> */}
                {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </a> */}
                {/* </div> */}
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  required
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full"
                onClick={handleLoginSubmit}
              >
                Login
              </Button>
              {/* <Button
                variant="outline"
                className="w-full"
                onClick={handleGoogleLogin}
              >
                Login with Google
              </Button> */}
              <GoogleSignIn />
            </div>
            {/* <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline">
                Sign up
              </a>
            </div> */}
          </TabsContent>

          {/* SIGN UP CARD */}
          <TabsContent value="signup">
            <form className="space-y-4">
              <Input
                placeholder="Full Name"
                value={signupData.fullName}
                onChange={(e) =>
                  setSignupData({ ...signupData, fullName: e.target.value })
                }
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">{errors.fullName}</p>
              )}
              <Input
                type="email"
                placeholder="Email"
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({ ...signupData, email: e.target.value })
                }
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
              <Input
                type="password"
                placeholder="Password"
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
              {/* TODO: ADD DROPDOWN COMPONENT FROM SHADCN */}
              <select
                className="w-full p-2 border rounded"
                value={signupData.grade}
                onChange={(e) =>
                  setSignupData({ ...signupData, grade: parseInt(e.target.value) })
                }
              >
                <option value="">Select Grade</option>
                {[7, 8, 9, 10].map((grade) => (
                  <option key={grade} value={grade}>
                    Grade {grade}
                  </option>
                ))}
              </select>
              {errors.grade && (
                <p className="text-red-500 text-sm">{errors.grade}</p>
              )}
              <Button className="w-full" onClick={handleSignupSubmit}>
                Sign Up
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
