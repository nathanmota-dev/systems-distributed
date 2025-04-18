import Fastify from 'fastify';
import helloRoutes from './routes/hello-routes';
import authRoutes from './routes/auth-routes';
import prisma from './database/db';
import courseRoutes from './routes/course-routes';

const app = Fastify();

app.register(helloRoutes, { prefix: "/" });
app.register(courseRoutes, { prefix: "/" });
app.register(authRoutes, { prefix: "/auth" });

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