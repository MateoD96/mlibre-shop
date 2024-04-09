"use client";

import { CartItem } from "@/app/lib/definitions";
import { ItemCart, BuySummary } from "./index";
import { useContext, useEffect } from "react";
import CartContext from "@/app/context/cartCtx";
import { useRouter } from "next/navigation";

interface CartProps {
  items: CartItem[];
  token: string;
}

export function Cart({ items, token }: CartProps) {
  const { setCartItemsN } = useContext(CartContext);
  const router = useRouter();

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

      <BuySummary
        summaryProducts={{
          cant: items.reduce((acc, elem) => (acc += elem.cantidad), 0),
          total: items.reduce((acc, elm) => (acc += elm.subtotal), 0),
        }}
      >
        <div className=" mt-4">
          <button
            onClick={() => router.push("/cart/checkout?buyItems=cart")}
            className=" w-full p-3 rounded-md bg-blue-500 text-center text-white font-bold "
          >
            Continuar compra
          </button>
        </div>
      </BuySummary>
    </>
  );
}
