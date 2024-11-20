export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData extends LoginFormData {
  fullName: string;
  email: string;
  password: string;
  grade: number;
}