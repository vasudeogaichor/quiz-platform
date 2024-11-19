import { Request, Response, NextFunction } from 'express';
import { AppError } from '../core';
import validator from 'validator';

interface ProfileInput {
  name?: string;
  email?: string;
  grade?: number;
}

const VALID_GRADES = [7, 8, 9, 10];

export default function validateProfileInput(
  req: Request<{}, {}, ProfileInput>,
  res: Response,
  next: NextFunction
): void {
  const { name, email, grade } = req.body;
  const errors: string[] = [];

  // Name validation (optional, but if provided)
  if (name) {
    if (name.length < 2) {
      errors.push('Name must be at least 2 characters long');
    }
    if (name.length > 50) {
      errors.push('Name cannot exceed 50 characters');
    }
  }

  // Email validation (optional, but if provided)
  if (email) {
    if (!validator.isEmail(email)) {
      errors.push('Invalid email format');
    }
  }

  // Grade validation
  if (grade !== undefined && !VALID_GRADES.includes(Number(grade))) {
    errors.push('Invalid grade. Must be between 7 and 10');
  }

  // Additional custom validations can be added here
  if (errors.length > 0) {
    throw AppError.badRequest('Invalid profile update input', errors);
  }

  next();
}
