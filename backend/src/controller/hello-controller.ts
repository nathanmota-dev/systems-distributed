import { FastifyReply, FastifyRequest } from "fastify";

export async function helloController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    reply.send({ message: "Hello, Word!" });
}