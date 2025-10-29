import type { Metadata } from "next";
import "./globals.css";

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
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
