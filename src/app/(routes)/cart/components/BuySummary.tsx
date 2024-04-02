"use client";

import { CartItem } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";

export function BuySummary({ items }: { items: CartItem[] }) {
  const router = useRouter();
  const resume = () => items.reduce((acc, item) => (acc += item.subtotal), 0);

  return (
    <div className=" bg-white mt-4 md:mt-0 md:ml-4 h-[30vh] md:w-[25%]">
      <p className=" border-b-[1px] border-gray-400 p-4 font-bold">
        Resumen de compra
      </p>
      <div className="p-4 text-sm">
        <div className=" flex justify-between">
          <span className=" text-gray-600">
            {items.length > 1
              ? `Productos (${items.reduce(
                  (acc, elm) => (acc += elm.cantidad),
                  0
                )})`
              : "Producto"}
          </span>
          <span>${resume()}</span>
        </div>

        <div className="my-2 flex justify-between">
          <span className=" text-gray-600">Envío</span>
          <span className=" text-green-500">Gratis</span>
        </div>

        <div className="mb-2 flex justify-between font-bold">
          <span>Total</span>
          <span>${resume()}</span>
        </div>

        <div className=" mt-4">
          <button
            onClick={() => router.push("/cart/checkout?buyItems=cart")}
            className=" w-full p-3 rounded-md bg-blue-500 text-center text-white font-bold "
          >
            Continuar compra
          </button>
        </div>
      </div>
    </div>
  );
}
