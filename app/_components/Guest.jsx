"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";

export default function Guest() {
  const session = useAuth();

  return (
    <li>
      {session?.user?.image ? (
        <Link
          href="/account"
          className="hover:text-accent-400 transition-colors flex items-center gap-4"
        >
          <Image
            className="h-8 rounded-full"
            src={session?.user?.image}
            alt={session?.user?.name}
            width={32}
            height={32}
            referrerPolicy="no-refferrer"
          />
          <span>{session?.user?.name}</span>
        </Link>
      ) : (
        <span>Guest Area</span>
      )}
    </li>
  );
}
