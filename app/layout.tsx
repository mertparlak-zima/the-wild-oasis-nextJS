import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";
import { ReactNode } from "react";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

import "@/app/_styles/globals.css";

export const metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "The Wild Oasis",
  },
  description: "A beautiful oasis in the wild",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${josefin?.className}`}>
        <header>
          <Logo />
        </header>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
