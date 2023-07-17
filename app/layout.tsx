import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import { AuthContextProvider } from "@/app/context/user-context";
import { Lato, Mukta } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";
import Loading from "./loading";

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["400"],
});

const mukta = Mukta({
  subsets: ["latin"],
  variable: "--font-mukta",
  weight: ["300"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" className={`${lato.variable} ${mukta.variable}`}>
        <body
          style={{
            margin: 0,
            padding: 0,
          }}
        >
          <AuthContextProvider>
            <Navbar />
            <div
              style={{
                margin: "0",
                padding: "0",
                minHeight: "82vh",
              }}
            >
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </div>
            <Footer />
          </AuthContextProvider>
          <Analytics debug={false} />
        </body>
      </html>
    </>
  );
}
