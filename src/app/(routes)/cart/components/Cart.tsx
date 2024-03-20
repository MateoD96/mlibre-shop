import { CartItem } from "@/app/lib/definitions";
import { ItemCart } from "./CartItem";
import { BuySummary } from "./BuySummary";

interface CartProps {
  items: CartItem[];
  token: string;
}

export function Cart({ items, token }: CartProps) {
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
