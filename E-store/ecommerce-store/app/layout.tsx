import "./globals.css";
import { Metadata } from "next";
import React from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Providers from "./provider";



export const metadata: Metadata =  {
  title: 'E-store',
  description: "Modern E-Commerce Store built with Next.js",
};


export default function RootLayout({
 children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
       <Providers> 
        <Navbar/>

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
          {children}
        </main>

        <Footer/>
       </Providers> 
      </body>

    </html>
  )

}