import { prisma } from "@/libs/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const anime_mal_id = searchParams.get("anime_mal_id");
    const user_email = searchParams.get("user_email");

    if (!anime_mal_id || !user_email) {
        return NextResponse.json({ status: 400, message: "Missing parameters" });
    }

    const collection = await prisma.collection.findFirst({
        where: { anime_mal_id:Number(anime_mal_id) , user_email }
    });

    if (!collection) {
        return NextResponse.json({ status: 404, data: null });
    }

    return NextResponse.json({ status: 200, data: collection });
}

export async function POST(request: NextRequest) {
    try {
        const {
            user_email,
            anime_mal_id,
            anime_title,
            anime_image,
          } = await request.json();

        if (!anime_mal_id || !user_email) {
            return NextResponse.json({ status: 400, message: "Missing parameters" });
        }

        const createCollection = await prisma.collection.create({
            data: { anime_mal_id, user_email, anime_image, anime_title }
        });

        return NextResponse.json({ status: 201, data: createCollection });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ status: 500, message: "Internal Server Error", error: errorMessage });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { user_email, anime_mal_id } = await request.json();

        if (!anime_mal_id || !user_email) {
            return NextResponse.json({ status: 400, message: "Missing parameters" });
        }

        const deleteCollection = await prisma.collection.deleteMany({
            where: { anime_mal_id, user_email }
        });

        if (deleteCollection.count === 0) {
            return NextResponse.json({ status: 404, message: "Collection not found" });
        }

        return NextResponse.json({ status: 200, message: "Deleted successfully" });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ status: 500, message: "Internal Server Error", error: errorMessage });
    }
}
