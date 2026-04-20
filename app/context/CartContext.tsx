"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Produto = {
  id: number;
  nome: string;
  preco: number;
  comando?: string;
};

type CartItem = Produto & { quantity: number };

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Produto) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carrega o carrinho inicial
  useEffect(() => {
    const savedCart = localStorage.getItem("paragonn_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Erro ao carregar carrinho", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Salva sempre que o carrinho mudar
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("paragonn_cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (product: Produto) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("paragonn_cart");
  };

  const total = cart.reduce((acc, item) => acc + item.preco * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total, isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
