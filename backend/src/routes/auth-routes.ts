import { FastifyInstance } from 'fastify';
import { studentLoginController, studentRegisterController, teacherLoginController, teacherRegisterController } from '../controller/auth-controller';

export default async function authRoutes(app: FastifyInstance) {
    app.post('/teacher/register', teacherRegisterController);
    app.post('/teacher/login', teacherLoginController);

    app.post('/student/register', studentRegisterController);
    app.post('/student/login', studentLoginController);
}