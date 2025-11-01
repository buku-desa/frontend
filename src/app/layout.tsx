import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '../app/globals.css';

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Buku Desa",
  description: "Sistem Informasi Buku Desa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
