import { FastifyInstance } from 'fastify';
import { confirmUploadController, presignVideoController } from '../controller/video-controller';
import prisma from '../database/db';

export default async function videoRoutes(app: FastifyInstance) {
    app.post('/videos/presign', presignVideoController);
    app.post('/videos/confirm-upload', confirmUploadController);

    app.get('/videos/by-course/:courseId', async (request, reply) => {
        const { courseId } = request.params as { courseId: string };

        try {
            const videos = await prisma.video.findMany({
                where: { courseId },
                orderBy: { createdAt: 'asc' },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    s3Url: true,
                    status: true,
                    createdAt: true,
                }
            });

            return reply.send(videos);
        } catch (error) {
            console.error("Erro ao buscar vídeos:", error);
            return reply.status(500).send({ error: "Erro interno ao buscar vídeos." });
        }
    });
}