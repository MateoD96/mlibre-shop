import { CartItem } from "@/app/lib/definitions";

interface CartProps {
  items: CartItem[];
}

export function Cart({ items }: CartProps) {
  if (items.length === 0) return <h3>Tu carrito está vacío</h3>;

  return <div></div>;
}
