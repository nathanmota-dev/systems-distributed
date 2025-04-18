import { FastifyInstance } from "fastify";
import { helloController } from "../controller/hello-controller";

export default async function helloRoutes(app: FastifyInstance) {
    app.get('/', helloController);
}