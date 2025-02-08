"use server";

import { signIn, signOut } from "./auth";

export async function signInAction(formData) {
  const provider = formData.get("provider");

  await signIn(provider, { redirectTo: "/account" });
}

export async function singOutAction() {
  await signOut({
    redirectTo: "/",
  });
}
