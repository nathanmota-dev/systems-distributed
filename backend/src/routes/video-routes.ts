import { FastifyInstance } from 'fastify';
import { confirmUploadController, presignVideoController } from '../controller/video-controller';

export default async function videoRoutes(app: FastifyInstance) {
    app.post('/videos/presign', presignVideoController);
    app.post('/videos/confirm-upload', confirmUploadController);
}