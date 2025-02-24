import { cookies } from "next/headers";

export const getCookies = async (key: string): Promise<string> => {
    const cookieStore = await cookies(); // Await the cookies() call
    return cookieStore.get(key)?.value || "";
}

export const setCookies = async (key: string, value: string) => {
    const cookieStore = await cookies();
    cookieStore.set(key, value)
}

export const removeCookies = async (key: string, value: string) => {
    const cookieStore = await cookies();
    cookieStore.delete(key)
}

