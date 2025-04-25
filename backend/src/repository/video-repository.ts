import prisma from '../database/db';

export async function createVideo(data: {
    title: string;
    description: string;
    s3Url: string;
    courseId: string;
    uploaderId: string;
}) {
    return prisma.video.create({
        data: {
            ...data,
            status: 'PENDING'
        }
    });
}