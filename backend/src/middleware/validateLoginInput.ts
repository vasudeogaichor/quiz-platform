import { Request, Response, NextFunction } from 'express';
import { AppError } from '../core';
import validator from 'validator';

interface LoginRequestBody {
  email: string;
  password: string;
}

export default function validateLoginInput(
  req: Request<{}, {}, LoginRequestBody>,
  res: Response,
  next: NextFunction
): void {
  const { email, password } = req.body;
  const errors: string[] = [];

  // Email validation
  if (!email) {
    errors.push('Email is required');
  } else if (!validator.isEmail(email)) {
    errors.push('Invalid email format');
  }

  // Password validation
  if (!password) {
    errors.push('Password is required');
  } else {
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
    }
  }

  if (errors.length > 0) {
    throw AppError.badRequest('Invalid login input', errors);
  }

  next();
}
