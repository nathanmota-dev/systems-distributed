import { FastifyReply, FastifyRequest } from "fastify";
import { createPresignedVideo } from "../services/video-service";

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