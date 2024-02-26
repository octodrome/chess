import { Request, Response, NextFunction } from 'express';
import getUserIdFromHeader from '../api/utils/getUserIdFromHeader';

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    userId: string;
  }
}

export default function (req: Request, res: Response, next: NextFunction) {
  try {
    if (req.headers.authorization) {
      const userId = getUserIdFromHeader(req.headers.authorization);
      if (req.body.userId && req.body.userId !== userId) {
        throw 'User id is not valid';
      } else {
        next();
      }
    } else {
      throw 'Authorization header is missing';
    }
  } catch (error) {
    res.status(401).json({ error });
  }
}
