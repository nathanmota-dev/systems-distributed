import Fastify from 'fastify';
import helloRoutes from './routes/hello-routes';
import prisma from './database/db';

const app = Fastify();

app.register(helloRoutes, { prefix: "/" });

const start = async () => {
    try {
        await prisma.$connect();
        console.log('Database connected!');

        await app.listen({ port: 8080 });
        console.log('Server is running at http://localhost:8080');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start();