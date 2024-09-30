import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        if (userId) {
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

export async function POST(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (userId) {
            const body = await request.json();
            const updationValue: {
                name?: string,
                dob?: Date,
                gender?: string,
                interests?: string[]
            } = {};

            if (body.name) updationValue.name = body.name;
            if (body.dob) updationValue.dob = body.dob;
            if (body.gender) updationValue.gender = body.gender;
            if (body.interests) updationValue.interests = body.interests;

            const response = await db.user.update({
                where: {
                    id: userId,
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