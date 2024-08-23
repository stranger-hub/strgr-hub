import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// function getRtmToken(userId: string) {
//     const appID = process.env.NEXT_PUBLIC_AGORA_APP_ID!;
//     const appCertificate = process.env.AGORA_APP_CERT!;
//     const account = userId;
//     const expirationTimeInSeconds = 3600;
//     const currentTimestamp = Math.floor(Date.now() / 1000);
//     const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
//     const token = RtmTokenBuilder.buildToken(
//         appID,
//         appCertificate,
//         account,
//         RtmRole.Rtm_User,
//         privilegeExpiredTs
//     );
//     return token;
// }


// function getRtcToken(roomId: string, userId: string) {
//     const appID = process.env.NEXT_PUBLIC_AGORA_APP_ID!;
//     const appCertificate = process.env.AGORA_APP_CERT!;
//     const channelName = roomId;
//     const account = userId;
//     const role = RtcRole.PUBLISHER;
//     const expirationTimeInSeconds = 3600;
//     const currentTimestamp = Math.floor(Date.now() / 1000);
//     const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

//     const token = RtcTokenBuilder.buildTokenWithAccount(
//         appID,
//         appCertificate,
//         channelName,
//         account,
//         role,
//         privilegeExpiredTs
//     );

//     return token;
// }

// export async function GET(request: NextRequest) {
//     const { body } = request;
//     const url = new URL(request.url);
//     const userId = url.searchParams.get('userId') as string;
//     try {
//         const rooms: any = await db.room.aggregate({
//             where: {
//                 status: 'WAITING',
//             },
//             take: 1,
//         });

//         if (rooms?.length > 0) {
//             const roomId = rooms[0].id.toString();
//             await db.room.update({
//                 where: {
//                     id: roomId
//                 },
//                 data: {
//                     status: 'CHATTING',
//                 }
//             });

//             return NextResponse.json({
//                 rooms,
//                 rtcToken: getRtcToken(roomId, userId),
//                 rtmToken: getRtmToken(userId),
//             }, { status: 200 });
//         } else {
//             return NextResponse.json({ success: true, data: { rooms: [], token: null } }, { status: 200 });
//         }
//     } catch (error: any) {
//         return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//     }
// }

// export async function POST(request: NextRequest) {
//     try {
//         const { body } = request;
//         const url = new URL(request.url);
//         const userId = url.searchParams.get('userId') as string;

//         if (userId) {
//             const room = await db.room.create({
//                 data: {
//                     status: 'WAITING',
//                 }
//             });
//             return NextResponse.json({
//                 success: true, data: {
//                     room,
//                     rtcToken: getRtcToken(room.id.toString(), userId),
//                     rtmToken: getRtmToken(userId),
//                 }
//             }, { status: 200 });
//         } else {
//             return NextResponse.json({ success: false, error: "User not properly logged in, Please login again" }, { status: 400 });
//         }
//     } catch (error: any) {
//         return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//     }
// }

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