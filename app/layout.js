import { Geist, Geist_Mono } from "next/font/google";
import { Merriweather } from "next/font/google";
import { Lato, Open_Sans } from "next/font/google";
import { Onest } from "next/font/google";
import "./globals.css";
import IQGroupNavbar from "../components/navbar";
import IQGroupFooter from "./landing/footer";
import NavbarNew from "../components/NavbarNew";
import MultiplexNavbar from "../components/Navbar/multiplexNavbar";

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
        style={{ 
          margin: 0, 
          padding: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Navbar */}
        <header className="relative z-50">
          <MultiplexNavbar />
        </header>
        
        {/* Main content */}
        <main className="relative flex-1">
          {children}
        </main>
        
        {/* Clear separator for debugging */}
       
        
          
          
          
          
          
        
      </body>
    </html>
  );
}