import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/User.js';
import { AppError } from '../core';

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

interface DecodedToken extends JwtPayload {
  id: string;
  grade: number;
}

export default async function auth(req: Request, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw AppError.unauthorized('No token provided');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    // console.log('decoded - ', decoded)

    // TODO: assign required user info in jwt payload itself when token is generated
    req.user = decoded;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw AppError.unauthorized('Token expired');
    }
    throw AppError.unauthorized('Invalid token');
  }
}
