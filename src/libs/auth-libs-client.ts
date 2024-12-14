"use client"

import { useSession } from "next-auth/react"

export const AuthUserSessionCSR = () => {
    const { data: session } = useSession();
    return session
}
