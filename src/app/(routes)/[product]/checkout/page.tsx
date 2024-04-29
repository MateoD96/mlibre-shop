import { apiProduct } from "../lib/data";

export default async function CheckoutProduct({
  params,
  searchParams,
}: {
  params: { product: string };
  searchParams: { qty: string };
}) {
  const dataProd = await apiProduct.getProduct(params.product);
  const { data } = dataProd;

  return <div></div>;
}
