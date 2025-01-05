import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";
import { ReactNode } from "react";
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
      <body>
        <header>
          <Logo />
        </header>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
