import { prisma } from "@/libs/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { comment_id, user_email } = await request.json();

        if (!comment_id || !user_email) {
            return NextResponse.json({ status: 400, message: "Missing parameters" });
        }

        const createLikes = await prisma.like.create({
            data: { comment_id, user_email }
        });

        return NextResponse.json({ status: 201, data: createLikes });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ status: 500, message: "Internal Server Error", error: errorMessage });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { comment_id, user_email } = await request.json();

        if (!comment_id || !user_email) {
            return NextResponse.json({ status: 400, message: "Missing parameters" });
        }

        const deleteLike = await prisma.like.deleteMany({
            where: { comment_id, user_email }
        });

        if (deleteLike.count === 0) {
            return NextResponse.json({ status: 404, message: "Collection not found" });
        }

        return NextResponse.json({ status: 200, message: "Deleted successfully" });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ status: 500, message: "Internal Server Error", error: errorMessage });
    }
}
