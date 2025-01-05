import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";
import { ReactNode } from "react";

export const metadata = {
  title: "sa",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-800">
        <header>
          <Logo />
        </header>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
