import { jwtVerify, SignJWT } from "jose";


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