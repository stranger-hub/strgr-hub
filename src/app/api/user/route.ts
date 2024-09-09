import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        if(userId) {
            const response = await db.user.findUnique({
                where: {
                    id: userId,
                }
            });
            return NextResponse.json({ success: true, data: response }, { status: 200 });
        }
        return NextResponse.json({ success: false, data: null }, { status: 400 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}