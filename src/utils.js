import { redirect } from "react-router-dom";

export async function requireAuth(request) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const pathname = new URL(request.url).pathname
  if (!isLoggedIn) {
    const response = redirect(`/login?message=You need to log in first&redirectTo=${pathname}`)
    response.body = true
    return response
  }
  return null
}

