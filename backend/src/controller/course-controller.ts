import { FastifyRequest, FastifyReply } from 'fastify';
import { CourseService } from '../services/course-service';

export async function createCourseController(req: FastifyRequest, reply: FastifyReply) {
    const { title, description, teacherId } = req.body as {
        title: string;
        description: string;
        teacherId: string;
    };

    const course = await CourseService.create({ title, description, teacherId });
    reply.code(201).send(course);
}

export async function listCoursesController(req: FastifyRequest, reply: FastifyReply) {
    const courses = await CourseService.list();
    reply.send(courses);
}

export async function getCourseController(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const course = await CourseService.findById(id);
    if (!course) return reply.code(404).send({ error: 'Curso não encontrado' });
    reply.send(course);
}

export async function updateCourseController(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const { title, description } = req.body as { title: string; description: string };

    const updated = await CourseService.update(id, { title, description });
    reply.send(updated);
}

export async function deleteCourseController(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const deleted = await CourseService.remove(id);
    reply.send(deleted);
}