import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

export const AuthUserSessionSSR = async() => {
    const session = await getServerSession(authOptions)
    return session?.user
}

export interface IUser {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
}