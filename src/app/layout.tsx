import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import NavbarWrapper from "@/components/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CUY ANIMELIST",
  description: "Website Kumpulan Anime Kesukaan Anda",
  icons: {
    icon: "/favicon.png", // or '/favicon.png', etc.
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-800 text-white`}
      >
        <div id="modal"></div>
        <NavbarWrapper />
        {children}
      </body>
    </html>
  );
}
