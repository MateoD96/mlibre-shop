"use client";

import { CartItem } from "@/app/lib/definitions";
import { ItemCart, BuySummary } from "./index";
import { useContext, useEffect } from "react";
import CartContext from "@/app/context/cartCtx";

interface CartProps {
  items: CartItem[];
  token: string;
}

export function Cart({ items, token }: CartProps) {
  const { setCartItemsN } = useContext(CartContext);

  useEffect(() => {
    localStorage.setItem("cart", String(items.length));
    setCartItemsN(Number(localStorage.getItem("cart")));
  }, [items]);

  if (items.length === 0) return <h3>Tu carrito está vacío</h3>;

  return (
    <>
      <div className=" w-full md:w-[70%]">
        {items.map((item) => (
          <ItemCart key={item.id} item={item} token={token} />
        ))}
      </div>

      <BuySummary items={items} />
    </>
  );
}
