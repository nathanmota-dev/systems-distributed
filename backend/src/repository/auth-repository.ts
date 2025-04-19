import prisma from '../database/db';
import { User } from '@prisma/client';

export async function findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
}

export async function createUser(data: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    return prisma.user.create({ data });
}