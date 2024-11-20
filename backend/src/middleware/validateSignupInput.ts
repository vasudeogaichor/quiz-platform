import { Request, Response, NextFunction } from "express";
import { AppError } from "../core";
import validator from "validator";
import User from "../models/User";
import { SignupInput } from "../types/middlewares";

const VALID_GRADES = [7, 8, 9, 10];

export default async function validateSignupInput(
  req: Request<{}, {}, SignupInput>,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { email, password, fullName, grade } = req.body;
  const errors: string[] = [];

  // Email validation
  if (!email) {
    errors.push("Email is required");
  } else if (!validator.isEmail(email)) {
    errors.push("Invalid email format");
  } else {
    try {
      // Check if email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        errors.push("Email already in use");
      }
    } catch (error) {
      throw AppError.internalServerError("Error checking email uniqueness");
    }
  }

  // Password validation
  if (!password) {
    errors.push("Password is required");
  } else {
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number");
    }
  }

  // Name validation
  if (!fullName) {
    errors.push("Name is required");
  } else if (fullName.length < 2) {
    errors.push("Name must be at least 2 characters long");
  }

  // Grade validation
  if (grade === undefined || grade === null) {
    errors.push("Grade is required");
  } else if (!VALID_GRADES.includes(grade)) {
    errors.push(`Invalid grade. Must be one of ${VALID_GRADES.join(", ")}`);
  }

  if (errors.length > 0) {
    throw AppError.badRequest("Invalid signup input", errors);
  }

  next();
}
