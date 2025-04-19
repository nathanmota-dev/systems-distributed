import { FastifyInstance } from 'fastify';
import {
    createCourseController,
    listCoursesController,
    getCourseController,
    updateCourseController,
    deleteCourseController
} from '../controller/course-controller';

export default async function courseRoutes(app: FastifyInstance) {
    app.post('/courses', createCourseController);
    app.get('/courses', listCoursesController);
    app.get('/courses/:id', getCourseController);
    app.put('/courses/:id', updateCourseController);
    app.delete('/courses/:id', deleteCourseController);
}