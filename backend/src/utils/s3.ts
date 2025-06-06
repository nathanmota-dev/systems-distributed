import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export async function generatePresignedUrl(filename: string, fileType: string) {
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET!,
        Key: filename,
        ContentType: fileType,
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 60 });
    return url;
}

export async function uploadFileToS3(filename: string, file: any) {
    const buffer = await file.toBuffer();

    await s3.send(new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET!,
        Key: filename,
        Body: buffer,
        ContentType: file.mimetype,
        ACL: 'public-read'
    }));

    return `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`;
}