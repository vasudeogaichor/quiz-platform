import { UserDTO } from "../types/controllers";

export const toUserDTO = (user: any): UserDTO => {
  console.log('toUserDTO - ', user)
    return {
      id: user._id.toString(),
      email: user.email,
      fullName: user.fullName,
      grade: user.grade,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  };