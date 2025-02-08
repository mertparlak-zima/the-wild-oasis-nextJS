"use server";

import { signIn } from "./auth";

export async function signInAction(formData) {
  const provider = formData.get("provider");

  await signIn(provider, { redirectTo: "/account" });
}
