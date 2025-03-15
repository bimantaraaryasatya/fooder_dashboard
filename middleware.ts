import { request } from "http";
import { NextResponse, NextRequest } from "next/server";

export const middleware = async (request: NextRequest) => {
    const token = request.cookies.get("token")?.value
    const role = request.cookies.get("role")?.value
    const pathname = request.nextUrl.pathname;
    if (request.nextUrl.pathname === "/") {
        // jika tidak ada token atau role, arahkan ke halaman login
        const redirectAdmin = request.nextUrl.clone()
        redirectAdmin.pathname = "/login"
        return NextResponse.redirect(redirectAdmin)
    }

    // jika role bukan MANAGER, arahkan ke halaman login
    if (pathname.startsWith("/manager")) {
        if (role !== "MANAGER") {
            const redirectAdmin = request.nextUrl.clone();
            redirectAdmin.pathname = "/login";
            return NextResponse.redirect(redirectAdmin)
        }
    } else if(pathname.startsWith("/cashier")){
        if (role !== "CASHIER") {
            const redirectAdmin = request.nextUrl.clone();
            redirectAdmin.pathname = "/login";
            return NextResponse.redirect(redirectAdmin)
        }   
    }
    // Jika semua cek berhasil, lanjutkan ke halaman yang diminta
    return NextResponse.next()
}

export const config = {
    matcher: [
        "/manager/:path*", // Menangkap semua rute di bawah /manager
        "/cashier/:path",
        "/" // Menangkap rute root
    ],
}
 