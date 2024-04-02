import { CartItem } from "@/app/lib/definitions";
import { deleteItemCart } from "../lib/actions";
import Link from "next/link";

function ButtonAction({ children }: { children: React.ReactNode }) {
  return (
    <button type="submit" className="text-sm text-blue-600 font-medium mx-1">
      {children}
    </button>
  );
}
export function ActionsItem({
  item,
  token,
}: {
  item: CartItem;
  token: string;
}) {
  const actionDelete = deleteItemCart.bind(null, item.id, token);

  return (
    <div className=" flex mt-1">
      <form action={actionDelete}>
        <ButtonAction>Eliminar</ButtonAction>
      </form>

      <div>
        <Link
          href={`/cart/checkout?buyItems=${item.id}`}
          className="text-sm text-blue-600 font-medium mx-1"
        >
          Comprar Ahora
        </Link>
      </div>
    </div>
  );
}
