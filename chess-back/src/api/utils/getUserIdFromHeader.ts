import config from '../../config';
import jwt, { JwtPayload } from 'jsonwebtoken';

export default function getUserIdFromHeader(authorizationHeader: string): string {
  const token = authorizationHeader.split(' ')[1];
  const decodeToken = jwt.verify(token, config.jwtSecret as string) as JwtPayload;
  const userId = decodeToken.userId;
  return userId;
}
