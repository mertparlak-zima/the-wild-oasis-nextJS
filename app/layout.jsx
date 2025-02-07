import { Josefin_Sans } from "next/font/google";
import Header from "@/app/_components/Header";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

import "@/app/_styles/globals.css";
import { ReservationProvider } from "./context/ReservationContext";

export const metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "The Wild Oasis",
  },
  description: "A beautiful oasis in the wild",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin?.className} bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl w-full mx-auto">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
