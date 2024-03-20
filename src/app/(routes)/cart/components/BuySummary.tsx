import { CartItem } from "@/app/lib/definitions";

export function BuySummary({ items }: { items: CartItem[] }) {
  const resume = () => items.reduce((acc, item) => (acc += item.subtotal), 0);

  return (
    <div className=" bg-white mt-4 md:mt-0 md:ml-4 p-2 h-[30vh] md:w-[25%]">
      <p>Resumen de compra {resume()}</p>
    </div>
  );
}
