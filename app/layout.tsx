import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "Loja Paragonn — Benefícios e Vips",
  description: "Adquira ranks, chaves e cosméticos exclusivos na loja oficial do Paragonn.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body cz-shortcut-listen="true">
        <ClientLayout>
            <Navbar />
            {children}
            <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
