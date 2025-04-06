import { put } from "./api";

export const uploadToS3 = async (file: File, userId: string) => {
    const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

    const response = await put('/api/s3', { 
        file: {
            data: base64Data.split(',')[1], // Remove the data URL prefix
            type: file.type,
        },
        userId 
    });

    if (!response.success) {
        throw new Error(response.error || 'Failed to upload image');
    }

    return response.location;
};