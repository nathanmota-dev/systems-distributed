import { FastifyReply, FastifyRequest } from "fastify";
import { confirmUploadVideo, createPresignedVideo } from "../services/video-service";

export async function presignVideoController(req: FastifyRequest, reply: FastifyReply) {
    const { title, fileType } = req.body as
        {
            title: string;
            fileType: string
        };

    if (!title || !fileType) {
        return reply.code(400).send({ error: 'Título e tipo do arquivo são obrigatórios.' });
    }

    const { url, key } = await createPresignedVideo(title, fileType);
    reply.send({ presignedUrl: url, key });
}

export async function confirmUploadController(req: FastifyRequest, reply: FastifyReply) {
    const { title, description, s3Key, courseId, uploaderId } = req.body as any;
  
    if (!title || !description || !s3Key || !courseId || !uploaderId) {
      return reply.code(400).send({ error: 'Dados incompletos' });
    }
  
    const video = await confirmUploadVideo(title, description, s3Key, courseId, uploaderId);
    reply.code(201).send(video);
  }