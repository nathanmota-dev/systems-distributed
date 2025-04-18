import Fastify from 'fastify';
import helloRoutes from './routes/hello-routes';

const app = Fastify();

app.register(helloRoutes, { prefix: "/" });

const start = async () => {
    try {
        await app.listen({ port: 8080 });
        console.log('Server is running at http://localhost:8080');
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
};

start();