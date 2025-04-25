import { FastifyInstance } from 'fastify';
import { presignVideoController } from '../controller/video-controller';

export default async function videoRoutes(app: FastifyInstance) {
    app.post('/videos/presign', presignVideoController);
}
