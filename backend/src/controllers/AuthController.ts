import { Request, Response as ExpressResponse } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { AppError, Response } from "../core";
import { toUserDTO } from "../utils";

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

interface SignupRequest extends Request {
  body: {
    email: string;
    password: string;
    fullName: string;
    grade: number;
  };
}

interface GoogleAuthRequest extends Request {
  body: {
    token: string;
  };
}

export default class AuthController {
  static async login(
    req: LoginRequest,
    res: ExpressResponse
  ): Promise<ExpressResponse> {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      throw AppError.unauthorized("Invalid credentials");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
    return res.json(Response.success({ token, user }));
  }

  static async signup(
    req: SignupRequest,
    res: ExpressResponse
  ): Promise<ExpressResponse> {
    const { email, password, fullName, grade } = req.body;

    if (await User.findOne({ email })) {
      throw AppError.badRequest("Email already exists");
    }

    const user = await User.create({ email, password, fullName, grade });
    console.log('user - ', user)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
    // console.log('token - ', token)

    // TODO: Figure out headers being sent twice after using toUserDTO
    let userRes = {
      id: user._id.toString(),
      email: user.email,
      fullName: user.fullName,
      grade: user.grade,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
    return res.json(Response.success({ token, user: userRes/*toUserDTO(user.toObject())*/}));
  }

  static async googleAuth(
    req: GoogleAuthRequest,
    res: ExpressResponse
  ): Promise<ExpressResponse> {
    const { token } = req.body;
    // Verify token with Google OAuth
    // Implementation depends on Google OAuth library
    return res.json(Response.success({ token }));
  }
}
