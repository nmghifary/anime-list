import { prisma } from "@/libs/prisma-client";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const anime_mal_id = searchParams.get("anime_mal_id");
    const sortDatas = searchParams.get("sortDatas");
    
    if (!anime_mal_id) {
        return NextResponse.json({ status: 400, message: "Missing parameters" });
    }
    
    let orderBy: Prisma.CommentOrderByWithRelationInput;
    switch (sortDatas) {
        case "OLDEST":
            orderBy = { created_at: "asc" } as Prisma.CommentOrderByWithRelationInput; 
            break;
        case "LATEST":
            orderBy = { created_at: "desc" } as Prisma.CommentOrderByWithRelationInput;
            break;
        case "POPULAR":
            const comments = await prisma.comment.findMany({
                where: { anime_mal_id: Number(anime_mal_id) },
                include: { likes: true },
            });

            const sortedComments = comments.sort((a, b) => b.likes.length - a.likes.length); // Sort manual di JS

            return NextResponse.json({ status: 200, data: sortedComments });
        default:
            orderBy = { created_at: "desc" } as Prisma.CommentOrderByWithRelationInput;  // Default to newest
            break;
    }

    const comment = await prisma.comment.findMany({
        where: { anime_mal_id: Number(anime_mal_id) },
        include: { likes: true },
        orderBy: orderBy,
    });

    if (!comment) {
        return NextResponse.json({ status: 404, data: null });
    }

    return NextResponse.json({ status: 200, data: comment });
}

export async function POST(request: NextRequest) {
    try {
        const {
            content,
            user_email,
            username,
            user_image,
            anime_mal_id,
            anime_image,
            parent_id = null,
        } = await request.json();

        if (!content || !user_email || !anime_mal_id) {
            return NextResponse.json({ status: 400, message: "Missing parameters" });
        }

        const createComment = await prisma.comment.create({
            data: { 
                content,
                user_email,
                username,
                user_image,
                anime_mal_id,
                anime_image,
                parent_id}
        });

        return NextResponse.json({ status: 201, data: createComment });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ status: 500, message: "Internal Server Error", error: errorMessage });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { id } = await request.json();
        
        if (!id) {
            return NextResponse.json({ status: 400, message: "Missing parameters" });
        }

        const deleteComment = await prisma.comment.deleteMany({
            where: { id }
        });

        if (deleteComment.count === 0) {
            return NextResponse.json({ status: 404, message: "Collection not found" });
        }

        return NextResponse.json({ status: 200, message: "Deleted successfully" });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ status: 500, message: "Internal Server Error", error: errorMessage });
    }
}
