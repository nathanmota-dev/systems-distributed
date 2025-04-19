import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export function generateToken(paylod: object) {
    return jwt.sign(paylod, JWT_SECRET, { expiresIn: '1d' });
}