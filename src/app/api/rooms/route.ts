import { db } from "@/lib/db";
import { RoomStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

async function updateRoomStatus(id: string, status: RoomStatus) {
    await db.room.update({
        where: {
            id
        },
        data: {
            status,
        }
    });
}

async function getRoom(prevRoomId: string | undefined) {
    const findQuery = prevRoomId ? {
        status: RoomStatus.WAITING,
        id: {
            not: prevRoomId,
        }
    } : {
        status: RoomStatus.WAITING,
    };
    const rooms = await db.room.findMany({
        where: findQuery,
        take: 5,
    });
    if (rooms.length > 0) {
        const randomRoom = rooms[Math.floor(Math.random() * rooms.length)];
        return {
            room: randomRoom,
            isCreated: false
        };
    } else {
        const response = await db.room.create({
            data: {
                status: 'WAITING',
            }
        });
        return {
            room: response,
            isCreated: true
        };
    }
}

async function getRoomById(roomId: string) {
    const room = await db.room.findFirst({
        where: {
            id: roomId,
        },
    });

    return room;
}

async function deleteRoomById(roomId: string) {
    await db.room.delete({
        where: {
            id: roomId,
        }
    });
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const prevRoomId = searchParams.get('prevRoomId') as string;
        const { room, isCreated } = await getRoom(prevRoomId);
        if(!isCreated) await updateRoomStatus(room.id, 'CHATTING');

        return NextResponse.json({
            success: true,
            data: room
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const roomId = searchParams.get('roomId') as string;
        const room = await getRoomById(roomId);
        if (!room) {
            return NextResponse.json({ success: false, error: "Room with provided roomId not found" }, { status: 400 });
        }

        if (room.status === "CHATTING") {
            await updateRoomStatus(roomId, RoomStatus.WAITING);
        } else {
            await deleteRoomById(roomId);
        }
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}