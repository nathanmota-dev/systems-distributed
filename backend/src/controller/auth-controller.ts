import { FastifyRequest, FastifyReply } from 'fastify';
import { registerTeacher, loginTeacher, registerStudent, loginStudent } from '../services/auth-service';

export async function teacherRegisterController(req: FastifyRequest, reply: FastifyReply) {
    const { name, email, password } = req.body as any;
    try {
        const user = await registerTeacher(name, email, password);
        reply.code(201).send({ message: 'Professor registrado', user });
    } catch (err: any) {
        reply.code(400).send({ error: err.message });
    }
}

export async function teacherLoginController(req: FastifyRequest, reply: FastifyReply) {
    const { email, password } = req.body as any;
    try {
        const data = await loginTeacher(email, password);
        reply.send({ message: 'Login bem-sucedido', ...data });
    } catch (err: any) {
        reply.code(401).send({ error: err.message });
    }
}

export async function studentRegisterController(req: FastifyRequest, reply: FastifyReply) {
    const { name, email, password } = req.body as any;
    try {
        const user = await registerStudent(name, email, password);
        reply.code(201).send({ message: 'Aluno registrado', user });
    } catch (err: any) {
        reply.code(400).send({ error: err.message });
    }
}

export async function studentLoginController(req: FastifyRequest, reply: FastifyReply) {
    const { email, password } = req.body as any;
    try {
        const data = await loginStudent(email, password);
        reply.send({ message: 'Login bem-sucedido', ...data });
    } catch (err: any) {
        reply.code(401).send({ error: err.message });
    }
}