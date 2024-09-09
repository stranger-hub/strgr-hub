import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        // const { searchParams } = new URL(request.url);
        // const userId = searchParams.get('userId');

        // if (!userId) {
        //     return NextResponse.json({ success: false, error: 'userId is required' }, { status: 400 });
        // }

        const rooms = await db.room.findMany({
            where: {
              status: 'WAITING',
            },
            take: 5,
        });

        if (rooms?.length > 0) {
            const randomRoom = rooms[Math.floor(Math.random() * rooms.length)];
            const roomId = randomRoom.id.toString();

            await db.room.update({
                where: {
                    id: roomId
                },
                data: {
                    status: 'CHATTING',
                }
            });

            return NextResponse.json({
                success: true,
                data : {
                    roomId,
                    // rtcToken: getRtcToken(roomId, userId),
                    // rtmToken: getRtmToken(userId),
                }
            }, { status: 200 });
        } else {
            return NextResponse.json({ success: true, data: { token: null } }, { status: 200 });
        }
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const room = await db.room.create({
            data: {
                status: 'WAITING',
            }
        });
        return NextResponse.json({
            success: true, data: {
                room,
                // rtcToken: getRtcToken(room.id.toString(), userId),
                // rtmToken: getRtmToken(userId),
            }
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}