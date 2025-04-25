import { createVideo } from "../repository/video-repository";
import { publishToVideoQueue } from "../utils/rabbit";
import { generatePresignedUrl } from "../utils/s3";

export async function createPresignedVideo(title: string, fileType: string) {
    const filename = `${Date.now()}-${title.replace(/\s+/g, '-')}`;
    const url = await generatePresignedUrl(filename, fileType);
    return { url, key: filename };
}

export async function confirmUploadVideo(
    title: string,
    description: string,
    s3Key: string,
    courseId: string,
    uploaderId: string
  ) {
    const s3Url = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`;
  
    const video = await createVideo({ title, description, s3Url, courseId, uploaderId });
  
    publishToVideoQueue({
      videoId: video.id,
      s3Key: s3Key,
      s3Url: video.s3Url
    });
  
    return video;
  }