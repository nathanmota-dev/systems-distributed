import { generatePresignedUrl } from "../utils/s3";

export async function createPresignedVideo(title: string, fileType: string) {
    const filename = `${Date.now()}-${title.replace(/\s+/g, '-')}`;
    const url = await generatePresignedUrl(filename, fileType);
    return { url, key: filename };
}