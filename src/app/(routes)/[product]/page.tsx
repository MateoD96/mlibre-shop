import { Breadcrumbs, Wrapper } from "@/app/components";
import { apiProduct } from "./utils/data";

interface Props {
  params: {
    product: string;
  };
}

export default async function ProductPage({ params }: Props) {
  const { product } = params;
  const dataProd = await apiProduct.getProduct(product);
  const { data } = dataProd;

  if (!data) return <h3>No se obtuvieron resultados</h3>;

  return <Wrapper>{data && data.attributes.title}</Wrapper>;
}
