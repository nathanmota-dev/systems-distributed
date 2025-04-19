import bcrypt from 'bcryptjs';
import { createUser, findUserByEmail } from '../repository/auth-repository';
import { generateToken } from '../utils/jwt';
import { Role } from '@prisma/client';

export async function registerTeacher(name: string, email: string, password: string) {
    const existing = await findUserByEmail(email);
    if (existing) throw new Error('Email já cadastrado');

    const hash = await bcrypt.hash(password, 10);

    return await createUser({
        name,
        email,
        password: hash,
        role: Role.TEACHER
    });
}

export async function loginTeacher(email: string, password: string) {
    const user = await findUserByEmail(email);
    if (!user || user.role !== Role.TEACHER) throw new Error('Credenciais inválidas');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Credenciais inválidas');

    const token = generateToken({ id: user.id, role: user.role });
    return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
}

export async function registerStudent(name: string, email: string, password: string) {
    const existing = await findUserByEmail(email);
    if (existing) throw new Error('Email já cadastrado');

    const hash = await bcrypt.hash(password, 10);

    return await createUser({
        name,
        email,
        password: hash,
        role: Role.STUDENT
    });
}

export async function loginStudent(email: string, password: string) {
    const user = await findUserByEmail(email);
    if (!user || user.role !== Role.STUDENT) throw new Error('Credenciais inválidas');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Credenciais inválidas');

    const token = generateToken({ id: user.id, role: user.role });
    return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
}