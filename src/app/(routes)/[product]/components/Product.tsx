//FIXME: this
import { DatumProduct } from "../../shop/[...filtersProducts]/lib/definitions";

interface Props {
  product: DatumProduct;
}

export function Product({ product }: Props) {
  return <div>{product.attributes.title}</div>;
}
