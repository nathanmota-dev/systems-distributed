import Fastify from 'fastify';
import 'dotenv/config';
import cors from '@fastify/cors';
import helloRoutes from './routes/hello-routes';
import authRoutes from './routes/auth-routes';
import prisma from './database/db';
import courseRoutes from './routes/course-routes';
import videoRoutes from './routes/video-routes';
import { connectRabbit } from './utils/rabbit';
import fastifyMultipart from '@fastify/multipart';

const app = Fastify();

app.register(fastifyMultipart, {
    limits: {
        fileSize: 10 * 1024 * 1024,
    },    
    attachFieldsToBody: 'keyValues',   
});


app.register(helloRoutes, { prefix: "/" });
app.register(courseRoutes, { prefix: "/" });
app.register(videoRoutes, { prefix: '/' });
app.register(authRoutes, { prefix: "/auth" });

const start = async () => {
    try {
        await app.register(cors, {
            origin: process.env.FRONTEND_URL,
            credentials: true,
        });

        await prisma.$connect();
        console.log('Database connected!');

        await connectRabbit();
        console.log('RabbitMQ initialized!');

        await app.listen({ port: Number(process.env.PORT) || 8080 });
        console.log(`Server is running at http://localhost:${process.env.PORT}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start();