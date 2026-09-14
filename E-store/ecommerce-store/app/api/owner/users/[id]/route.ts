import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


const allowedRoles = ["CUSTOMER", "ADMIN"];

export async function PATCH(request: Request,
    context: {
        params: Promise<{ id: string }>;
    }
) {
    try {
        const currentUser = await getCurrentUser();

        // Owner only 
        if (!currentUser || currentUser.role !== "OWNER") {
            return NextResponse.json(
                { error: "Unauthorized"},
                { status: 403 }
            );
        }

        const {id} = await context.params;
        const userId = Number(id);

        if (!Number.isInteger(userId)) {
            return NextResponse.json(
                { error: "Invalid user ID."},
                { status: 400 }
            );
        }

        // Prevent the  owner from changing their own role 
        if (userId === currentUser.id) {
            return NextResponse.json(
                { error: "You cannot change your own role."},
                { status: 400 }
            );
        }

        const body = await request.json();
        const { role } = body;

        if (!allowedRoles.includes(role)) {
            return NextResponse.json(
                { error: "Invalid role."},
                { status: 400 }
            );
        }

        const user = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                role,
            },
            select: {
                id: true,name: true, email: true, role: true,
            },
        });

        return NextResponse.json({
            message: "User role updated successfully.",
            user,
        });
    } catch (error) {
        console.error("Update user role error:", error);

        return NextResponse.json(
            { error: "Failed to update user role."},
            { status: 500 }
        );
    }
    
}