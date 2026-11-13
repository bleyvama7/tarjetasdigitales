import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Si faltan las variables de entorno, no rompemos la página. Solo avisamos en los logs.
  if (!url || !key) {
    console.error("🚨 Faltan variables de entorno de Supabase en el middleware");
    return supabaseResponse;
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // Refresca la sesión del usuario si existe
  const { data: { user } } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;

  // Rutas protegidas que requieren inicio de sesión
  const isProtectedRoute = 
    pathname.startsWith("/dashboard") || 
    pathname.startsWith("/editor") || 
    pathname.startsWith("/admin");

  // Rutas de autenticación (a las que no debe ir un usuario logueado)
  const isAuthRoute = pathname === "/login" || pathname === "/registro";

  // Redirigir a /login si intenta entrar a una ruta protegida sin sesión
  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Redirigir a /dashboard si ya está logueado e intenta ir a login/registro
  if (isAuthRoute && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/editor/:path*",
    "/admin/:path*",
    "/login",
    "/registro",
  ],
};
