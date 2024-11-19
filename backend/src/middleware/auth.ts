import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/User.js';
import { AppError } from '../core';

// Extend the Express Request interface to include a user property
declare global {
  namespace Express {
    interface Request {
      user?: typeof User;
    }
  }
}

interface DecodedToken extends JwtPayload {
  id: string; // Assuming the token contains an ID field
}

export default async function auth(req: Request, res: Response, next: NextFunction): Promise<void> {
  // Check for token in headers
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw AppError.unauthorized('No token provided');
  }

  // Extract token (assuming Bearer token format)
  const token = authHeader.split(' ')[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

    // TODO: assign required user info in jwt payload itself when token is generated
    // Find user in the database
    // const user = await User.findById(decoded.id).select('-password');
    
    // if (!user) {
    //   throw AppError.unauthorized('User not found');
    // }

    // Attach user to the request
    req.user = decoded;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw AppError.unauthorized('Token expired');
    }
    throw AppError.unauthorized('Invalid token');
  }
}
