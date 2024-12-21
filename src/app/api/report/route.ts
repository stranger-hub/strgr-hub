import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const reporteeId = searchParams.get('reporteeId') as string;
        const reportedId = searchParams.get('reportedId') as string;
        const body = await request.json();
        

        if (!reporteeId || !reportedId || reportedId === "undefined" || reporteeId === "undefined") {
            return NextResponse.json({ success: false }, { status: 400 });
        }
        await db.report.create({
            data: {
                reporteeId,
                reportedId,
                message: body.message
            }
        })
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}