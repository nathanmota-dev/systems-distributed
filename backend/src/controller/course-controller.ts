import { FastifyRequest, FastifyReply } from 'fastify';
import { CourseService } from '../services/course-service';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { generatePresignedUrl, s3 } from '../utils/s3';
import { v4 as uuidv4 } from 'uuid';

export async function createCourseController(req: FastifyRequest, reply: FastifyReply) {
    try {
        const { title, description, teacherId, thumbnailUrl } = req.body as {
            title: string;
            description: string;
            teacherId: string;
            thumbnailUrl: string;
        };

        if (!title || !description || !teacherId || !thumbnailUrl) {
            return reply.code(400).send({ error: 'Todos os campos são obrigatórios.' });
        }

        const course = await CourseService.create({
            title,
            description,
            thumbnailUrl,
            teacherId
        });

        reply.code(201).send(course);
    } catch (error) {
        console.error("Erro detalhado:", error);
        reply.code(500).send({ error: "Erro interno ao processar a requisição." });
    }
}

export async function generateThumbnailPresignedUrlController(req: FastifyRequest, reply: FastifyReply) {
    const { fileName, fileType } = req.body as { fileName: string; fileType: string };

    if (!fileName || !fileType) {
        return reply.code(400).send({ error: 'Nome e tipo do arquivo são obrigatórios.' });
    }

    const key = `${Date.now()}-${fileName}`;
    const presignedUrl = await generatePresignedUrl(key, fileType);

    reply.send({ presignedUrl, key });
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
    const { title, description, thumbnailUrl } = req.body as {
        title: string;
        description: string;
        thumbnailUrl: string;
    };

    const updated = await CourseService.update(id, { title, description, thumbnailUrl });
    reply.send(updated);
}

export async function deleteCourseController(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const deleted = await CourseService.remove(id);
    reply.send(deleted);
}