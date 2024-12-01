import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const senderId = searchParams.get('userId');
        const type = Number(searchParams.get('pending'));
        const receiverId = searchParams.get('receiverId');

        if(!senderId && !receiverId)  return NextResponse.json({ success: false, data: [] }, { status: 200 });
        
        if(senderId) {
            const friends = await db.friendship.findMany({
                where: { senderId, status: type === 1 ? 'ACCEPTED' : 'PENDING' },
                include: { receiver: true },
            });
            return NextResponse.json({ success: true, data: friends }, { status: 200 });
        }
        if(receiverId) {
            const friends = await db.friendship.findMany({
                where: { receiverId, status: 'PENDING' },
                include: { sender: true },
            });
            return NextResponse.json({ success: true, data: friends }, { status: 200 });
        }
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const senderId = searchParams.get('senderId');
        const receiverId = searchParams.get('receiverId');

        if(!senderId || !receiverId) return NextResponse.json({
            success: false, message: 'Sender/reciever user IDs are missing'
        }, { status: 200 });

        const exists = await db.friendship.findFirst({
            where: { senderId, receiverId },
        });

        if(exists) return NextResponse.json({
            success: false, message: exists.status === 'ACCEPTED' ? 'Already friends' :'Request already sent'
        }, { status: 200 });
        
        await db.friendship.create({
            data: {
                senderId: senderId,
                receiverId: receiverId,
                status: "PENDING",
            },
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}