"use client";

import { CartProvider, useCart } from "./context/CartContext";
import CartSidebar from "./components/CartSidebar";

function SidebarManager() {
  const { isCartOpen, setIsCartOpen } = useCart();
  return <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />;
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <SidebarManager />
      {children}
    </CartProvider>
  );
}
