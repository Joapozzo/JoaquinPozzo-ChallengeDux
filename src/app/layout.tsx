import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import Navbar from "../components/organisms/Navbar";
import SideBar from "../components/organisms/SideBar";
import { UserModalProvider } from "../context/UserModalContext";
import { ToastProvider } from "../context/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prueba técnica Dux",
  description: "Prueba técnica Dux",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <div className="flex">
          <SideBar />
          <main className="flex-1 ml-[60px] pt-[72px] min-h-screen overflow-y-auto p-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <UserModalProvider>
                <ToastProvider>
                  {children}
                </ToastProvider>
              </UserModalProvider>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}