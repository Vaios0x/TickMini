import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Middleware personalizado aquí si es necesario
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)

export const config = {
  matcher: [
    // SOLO estas rutas requieren autenticación
    "/dashboard/:path*",
    "/profile/:path*",
    "/tickets/:path*",
    "/admin/:path*",
    // NO proteger la página principal ni otras rutas públicas
  ],
}
