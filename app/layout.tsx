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
