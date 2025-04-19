import prisma from '../database/db';

export async function createCourse(data: {
    title: string;
    description: string;
    teacherId: string;
}) {
    return prisma.course.create({ data });
}

export async function getAllCourses() {
    return prisma.course.findMany({
        include: { teacher: { select: { name: true } } },
        orderBy: { createdAt: 'desc' }
    });
}

export async function getCourseById(id: string) {
    return prisma.course.findUnique({
        where: { id },
        include: { teacher: { select: { name: true, email: true } } }
    });
}

export async function updateCourse(id: string, data: Partial<{ title: string; description: string }>) {
    return prisma.course.update({ where: { id }, data });
}

export async function deleteCourse(id: string) {
    return prisma.course.delete({ where: { id } });
}