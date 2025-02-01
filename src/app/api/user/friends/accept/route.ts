import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if(!id)  return NextResponse.json({ success: false }, { status: 200 });
        
        await db.friendship.update({
            where: {
                id
            },
            data: {
                status: "ACCEPTED",
            },
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}