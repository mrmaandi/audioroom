import { getToken } from "next-auth/jwt";

export async function middleware(req: any, res: any) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET! });

  const { pathname } = req.nextUrl;

  /* if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  if (pathname !== "/login") {
    if (!token) {
      return NextResponse.redirect("/login");
    }
  } else {
    if (token) {
        return NextResponse.redirect("/");
    }
  } */

  
}
