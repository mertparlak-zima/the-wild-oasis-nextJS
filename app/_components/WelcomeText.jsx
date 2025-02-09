"use client";

import { useAuth } from "../context/AuthContext";

export default function WelcomeText() {
  const session = useAuth();
  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome {session?.user?.name.split(" ").at(0)}
    </h2>
  );
}
