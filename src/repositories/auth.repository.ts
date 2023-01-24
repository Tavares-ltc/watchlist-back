import { prisma } from "../config/database.js";

async function getUserByEmail(email: string) {
    return prisma.users.findFirst({
        where: { email },
        orderBy: { id: "desc" },
    });
}

async function createUser(
    name: string,
    email: string,
    encryptedPassword: string,
    image: string
) {
    return prisma.users.create({
        data: {
            name,
            email,
            password: encryptedPassword,
            image,
        },
    });
}

async function sessionUpsert(user_id: number, token: string) {
    return prisma.sessions.create({
        data: {
            user_id,
            token,
        },
    });
}

async function getUserSessionToken(user_id: number) {
    return prisma.sessions.findFirst({
        where: { user_id },
        orderBy: { id: "desc" },
    });
}

export { getUserByEmail, createUser, sessionUpsert, getUserSessionToken };
