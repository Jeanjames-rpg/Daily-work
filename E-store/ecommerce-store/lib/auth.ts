import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { prisma } from "./prisma";


const secret = process.env.AUTH_SECRET;

if (!secret) {
    throw new Error("Auth_SECRET is not defined");
}

const secretKey = new TextEncoder().encode(secret);

export async function createSession(userId: number) {
    return await new SignJWT({ userId })
        .setProtectedHeader({ alg: "HS256"})
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(secretKey);
}

export async function verifySession(token: string) {
    try {
        const {payload} = await jwtVerify(token, secretKey);

        return payload as {
            userId: number;
        };
    } catch {
        return null;
    }
}

export async function getCurrentUser() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session");

    if (!session) {
        return null;
    }

    const payload = await verifySession(session.value);

    if (!payload) {
        return null ;
    }

    const user = await prisma.user.findUnique({
        where: { id: payload.userId, },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        },
    });

    return user;
}