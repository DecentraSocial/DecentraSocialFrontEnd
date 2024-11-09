"use server";

import { cookies } from "next/headers";

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "authTokenDecentra",
    value: token,
    httpOnly: true,
    path: "/",
  });
}

export async function deleteCookie() {
  (await cookies()).delete("authTokenDecentra");
}

export async function getCookie() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("authTokenDecentra");
  return cookie;
}
