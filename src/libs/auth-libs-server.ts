import { getServerSession } from "next-auth"
import { authOptions } from "./auth";

export const AuthUserSessionSSR = async() => {
    const session = await getServerSession(authOptions)
    return session?.user
}

export interface IUser {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
}