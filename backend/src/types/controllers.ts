export interface AuthenticatedRequest extends Request {
  user: { id: string; grade: number };
}

export interface UserDTO {
  id: string;
  email: string;
  fullName: string;
  grade: number;
  createdAt: Date;
  updatedAt: Date;
}