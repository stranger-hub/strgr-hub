import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

export const uploadToS3 = async (file: File, userId: string): Promise<string> => {
  try {
    const params = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
      Key: `${userId}/${file.name}`,
      Body: file,
      ContentType: file.type,
      ACL: 'public-read',
    };
  
    const data = await s3.upload(params).promise();
    return data.Location;
  } catch (e) {
    console.error(e);
    return '';
  }
};