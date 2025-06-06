import { Geist, Geist_Mono } from "next/font/google";
import { Merriweather } from "next/font/google";
import { Lato, Open_Sans } from "next/font/google";
import { Onest } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  weight: ["400", "700"],
  variable: "--font-merriweather",
  subsets: ["latin"],
});

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const onest = Onest({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-onest",
  subsets: ["latin"],
});

// Note: Times New Roman is a system font, so we don't need to import it from next/font
// It's defined in globals.css and tailwind.config.js

export const metadata = {
  title: "IQ Group - Powering Innovation, Delivering Excellence",
  description: "Build, track, and manage your projects with a seamless platform designed for modern teams",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} ${merriweather.variable} ${lato.variable} ${openSans.variable} ${onest.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
