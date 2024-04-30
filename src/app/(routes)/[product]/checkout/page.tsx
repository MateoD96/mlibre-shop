import { cookies } from "next/headers";
import { Check } from "../../cart/components";
import { apiProduct } from "../lib/data";
import { CartItem } from "@/app/lib/definitions";

export const dynamic = "force-dynamic";

export default async function CheckoutProduct({
  params,
  searchParams,
}: {
  params: { product: string };
  searchParams: { qty: string };
}) {
  const currentUserToken = cookies().get("currentUser")?.value;
  const dataProd = await apiProduct.getProduct(params.product);
  const { data } = dataProd;

  const prodBuy: CartItem = {
    id: data.id,
    cantidad: Number(searchParams.qty),
    subtotal: data.attributes.price * Number(searchParams.qty),
    producto: {
      id: Number(data.id),
      title: data.attributes.title,
      stock: data.attributes.stock,
      price: data.attributes.price,
    },
  };

  if (data.attributes.stock < Number(searchParams.qty)) {
    return <h1>Ups,al parecer el producto se encuentra agotado</h1>;
  }

  return (
    <Check checkProds={{ uniqueItem: prodBuy }} tokenUser={currentUserToken!} />
  );
}
