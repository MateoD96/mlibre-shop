import { api } from "@/app/lib/data";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Check } from "../components";

export const dynamic = "force-dynamic";

export default async function CheckoutCartPage({
  searchParams,
}: {
  searchParams: { item: string };
}) {
  const currentUserToken = cookies().get("currentUser")?.value;

  const buyProducts = currentUserToken
    ? await api.getMe(
        currentUserToken,
        "?populate[carrito][populate][cart_items][populate][producto][populate][image][fields][0]=formats"
      )
    : null;

  const itemProduct = () =>
    buyProducts?.carrito.cart_items.find(
      (item) => item.id === Number(searchParams.item)
    );

  if (buyProducts?.carrito.cart_items.length === 0) {
    notFound();
  }

  if (buyProducts?.carrito.cart_items.length !== 0) {
    if (searchParams.item && !itemProduct()) {
      notFound();
    }
  }

  return (
    <Check
      uniqueCartItem={itemProduct()}
      cartProducts={buyProducts?.carrito.cart_items}
    />
  );
}
