import { getCurrentUser } from "@/lib/auth";
import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";


export const runtime = "nodejs";

export async function POST(request: Request) {
    try {
        const user = await getCurrentUser();

        if (
            !user ||
            (user.role !== "ADMIN" && user.role !== "OWNER")
        ) {
            return NextResponse.json(
                { error: "Unauthorized"},
                { status: 403}
            );
        }

        const formData = await request.formData();
        const file = formData.get("file");

        if (!(file instanceof File)) {
            return NextResponse.json(
                { error: "Please select an image."},
                { status: 400 }
            );
        }

        const allowedTypes: Record<string, string> = {
            "image/jpeg": ".jpg",
            "image/png": ".png",
            "image/webp": ".webp",
            "image/gif": ".gif",
        };

        const extension = allowedTypes[file.type];

        if (!extension) {
            return NextResponse.json(
                { error: "Only JPG, PNG, WEBP, and GIF images are allowed."},
                { status: 400 }
            );
        }

        const maxSize = 5 * 1024 * 1024;

        if (file.size === 0 || file.size > maxSize) {
            return NextResponse.json(
                { error: "Image must be smaller than 5 MB."},
                { status: 400 }
            );
        }

        const uploadDir = path.join(process.cwd(), "public", "uploads");

        await mkdir(uploadDir, { recursive: true});

        const filename = `${randomUUID()}${extension}`;
        const filePath = path.join(uploadDir, filename);

        const bytes = await file.arrayBuffer();

        await writeFile(filePath, Buffer.from(bytes));

        return NextResponse.json(
            { image: `/uploads/${filename}`},
            { status: 201 }
        );
    } catch (error) {
        console.error("Image upload error:", error);

        return NextResponse.json(
            { error: "Image upload failed."},
            { status: 500 }
        );
    }
}