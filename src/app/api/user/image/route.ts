import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        if (body.id && body.image) {
            const updationValue = {
                image: body.image,
            };

            const response = await db.user.update({
                where: {
                    id: body.id,
                },
                data: {
                    ...updationValue,
                }
            });
            return NextResponse.json({ success: true, data: response }, { status: 200 });
        }
        return NextResponse.json({ success: false, data: null }, { status: 400 });
    } catch (error: any) {
        console.log(error?.mesage);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}