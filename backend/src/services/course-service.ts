import {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse
} from '../repository/course-repository';

export const CourseService = {
    create: createCourse,
    list: getAllCourses,
    findById: getCourseById,
    update: updateCourse,
    remove: deleteCourse
};