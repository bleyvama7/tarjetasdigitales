import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (all) =>
          all.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          ),
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const { pathname } = req.nextUrl;

  // Rutas que requieren estar logueado (Dashboard, Editor, Admin)
  const isProtectedRoute = 
    pathname.startsWith("/dashboard") || 
    pathname.startsWith("/editor") || 
    pathname.startsWith("/admin");

  const isAuthRoute = pathname === "/login" || pathname === "/registro";

  // Si no está logueado y quiere entrar a una ruta protegida
  if (isProtectedRoute && !user) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Si ya está logueado y quiere ir a login o registro
  if (isAuthRoute && user) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: ["/dashboard/:path*", "/editor/:path*", "/admin/:path*", "/login", "/registro"],
};
