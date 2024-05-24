"use client";

import { createContext, useEffect, useState } from "react";

interface CtxCart {
  cartItemsN: number | undefined;
  setCartItemsN: (n: number) => void;
}

const CartContext = createContext<CtxCart>({
  cartItemsN: 0,
  setCartItemsN: () => 0,
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItemsN, setCartItemsN] = useState(0);

  useEffect(() => {
    setCartItemsN(Number(localStorage.getItem("cart")) || 0);
  }, []);

  const data: CtxCart = {
    cartItemsN,
    setCartItemsN,
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
}

export default CartContext;
export { CartContext };
