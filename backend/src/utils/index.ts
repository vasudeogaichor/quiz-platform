import jwt from "jsonwebtoken";
import { UserDTO } from "../types/controllers";
import { IUser } from "../models/User";

export const toUserDTO = (user: any): UserDTO => {
  return {
    id: user._id.toString(),
    email: user.email,
    fullName: user.fullName,
    grade: user.grade,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export function generateAuthToken(
  user: IUser,
  expiresIn: string | number = "1h"
): string {
  return jwt.sign(
    { id: user._id, grade: user.grade },
    process.env.JWT_SECRET as string,
    { expiresIn }
  );
}
