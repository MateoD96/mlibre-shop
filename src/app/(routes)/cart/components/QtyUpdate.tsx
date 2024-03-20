import { CartItem } from "@/app/lib/definitions";
import { operationsQty } from "../lib/actions";

export async function QtyUpdate({
  item,
  token,
}: {
  item: CartItem;
  token: string;
}) {
  const sumaQty = operationsQty.bind(null, item, token, "increment");
  const restaQty = operationsQty.bind(null, item, token, "decrement");

  return (
    <div>
      <div className=" flex justify-between border-gray-400 border-[1px] items-center">
        <form action={restaQty}>
          <button className="px-1 md:px-4 md:text-lg text-blue-500">-</button>
        </form>

        <span>{item.cantidad}</span>

        <form action={sumaQty}>
          <button className="px-1 md:px-4 md:text-lg text-blue-500">+</button>
        </form>
      </div>

      <p className=" text-center text-xs text-gray-500 mt-2">
        {item.producto.stock} disponibles
      </p>
    </div>
  );
}
