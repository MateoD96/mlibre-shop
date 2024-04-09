import { api } from "@/app/lib/data";
import { cookies } from "next/headers";
import { getBuyProduct } from "../lib/data";
import { notFound } from "next/navigation";
import { Check } from "../components";

export const dynamic = "force-dynamic";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: { buyItems: string };
}) {
  const currentUserToken = cookies().get("currentUser")?.value;

  const buyProducts =
    currentUserToken && searchParams.buyItems === "cart"
      ? await api.getMe(
          currentUserToken,
          "?populate[carrito][populate][cart_items][populate][producto][populate][image][fields][0]=formats"
        )
      : null;

  const buyProduct =
    currentUserToken && !buyProducts
      ? await getBuyProduct(searchParams.buyItems, currentUserToken)
      : null;

  if (!buyProduct?.data && !buyProducts) {
    notFound();
  }

  return (
    <Check
      uniqueProduct={buyProduct}
      cartProducts={buyProducts?.carrito.cart_items}
    />
  );
}
