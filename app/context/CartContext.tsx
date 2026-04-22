"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

type Produto = {
  id: number;
  nome: string;
  preco: number;
  comando?: string;
};

type CartItem = Produto & { quantity: number };

type Coupon = {
  codigo: string;
  desconto: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Produto, openCart?: boolean) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  total: number;
  subtotal: number;
  discount: number;
  coupon: Coupon | null;
  applyCoupon: (coupon: Coupon | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const isInitializing = useRef(true);

  // 1. Carregar do localStorage (Apenas no mount)
  useEffect(() => {
    const loadData = () => {
      const savedCart = localStorage.getItem("paragonn_cart");
      const savedCoupon = localStorage.getItem("paragonn_coupon");
      
      if (savedCart) {
        try {
          const parsed = JSON.parse(savedCart);
          if (Array.isArray(parsed)) setCart(parsed);
        } catch (e) {
          console.error("Erro ao carregar carrinho", e);
        }
      }
      
      if (savedCoupon) {
        try {
          const parsed = JSON.parse(savedCoupon);
          if (parsed && parsed.codigo) setCoupon(parsed);
        } catch (e) {
          console.error("Erro ao carregar cupom", e);
        }
      }
      
      // Pequeno delay para garantir que o React processe os sets acima antes de liberar o salvamento
      setTimeout(() => {
        isInitializing.current = false;
        setIsLoaded(true);
      }, 0);
    };

    loadData();
  }, []);

  // 2. Salvar no localStorage (Sempre que mudar, exceto durante a inicialização)
  useEffect(() => {
    if (isInitializing.current || !isLoaded) return;
    
    localStorage.setItem("paragonn_cart", JSON.stringify(cart));
    if (coupon) {
      localStorage.setItem("paragonn_coupon", JSON.stringify(coupon));
    } else {
      localStorage.removeItem("paragonn_coupon");
    }
  }, [cart, coupon, isLoaded]);

  const addToCart = (product: Produto, openCart = true) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    if (openCart) {
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
  };

  const applyCoupon = (cp: Coupon | null) => {
    setCoupon(cp);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.preco * item.quantity, 0);
  const discount = coupon ? (subtotal * coupon.desconto) / 100 : 0;
  const total = subtotal - discount;

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      total, 
      subtotal,
      discount,
      coupon,
      applyCoupon,
      isCartOpen, 
      setIsCartOpen 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
