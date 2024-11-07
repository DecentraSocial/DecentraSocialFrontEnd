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
