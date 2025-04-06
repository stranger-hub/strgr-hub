import AWS from 'aws-sdk';
import { NextRequest, NextResponse } from 'next/server';

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

export async function PUT(request: NextRequest) {
    try {
        const { file, userId } = await request.json();

        if (!file || !userId) {
            return NextResponse.json({ 
                success: false, 
                error: 'Missing required parameters'
            }, { status: 400 });
        }
        const buffer = Buffer.from(file.data, 'base64');
        
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: `pfp/${userId}/profie_pic`,
            Body: buffer,
            ContentType: file.type,
        };

        const data = await s3.upload(params).promise();
        return NextResponse.json({
            success: true,
            location: data.Location,
        }, { status: 200 });
    } catch (error) {
        console.error('Error uploading to S3:', error);
        return NextResponse.json({
            success: false,
            error: 'Error uploading to S3',
        }, { status: 500 });
    }
}