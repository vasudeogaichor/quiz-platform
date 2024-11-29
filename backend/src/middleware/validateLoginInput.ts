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

  if (!password) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    throw AppError.badRequest('Invalid login input', errors);
  }

  next();
}
