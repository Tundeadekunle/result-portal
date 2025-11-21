// import * as jwt from 'jsonwebtoken';
// import * as bcrypt from 'bcryptjs';

// const JWT_SECRET = process.env.JWT_SECRET;

// if (!JWT_SECRET) {
//   throw new Error('JWT_SECRET environment variable is required');
// }

// // Assert that JWT_SECRET is defined after the check
// const jwtSecret: string = JWT_SECRET;

// export interface TokenPayload {
//   userId: string;
//   email: string;
//   role: string;
// }

// export function generateToken(payload: TokenPayload): string {
//   return jwt.sign(payload, jwtSecret, { expiresIn: '7d' });
// }

// export function verifyToken(token: string): TokenPayload | null {
//   try {
//     const decoded = jwt.verify(token, jwtSecret);
//     if (typeof decoded === 'object' && decoded !== null && 'userId' in decoded) {
//       return decoded as TokenPayload;
//     }
//     return null;
//   } catch (error) {
//     console.error('Token verification failed:', error);
//     return null;
//   }
// }

// export async function hashPassword(password: string): Promise<string> {
//   if (!password || password.length < 6) {
//     throw new Error('Password must be at least 6 characters long');
//   }
//   return bcrypt.hash(password, 12);
// }

// export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
//   if (!password || !hashedPassword) {
//     return false;
//   }
//   try {
//     return await bcrypt.compare(password, hashedPassword);
//   } catch (error) {
//     console.error('Password verification failed:', error);
//     return false;
//   }
// }


















import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
}

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}