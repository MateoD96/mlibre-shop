import { CartItem } from "@/app/lib/definitions";
import { BuyItem } from "../lib/interfaces";
import { BuySummary, CheckInfoUser } from "./index";
import { Wrapper } from "@/app/components";

interface Props {
  uniqueProduct?: BuyItem | null;
  cartProducts?: CartItem[] | null;
}

export function Check({ uniqueProduct, cartProducts }: Props) {
  return (
    <Wrapper>
      <div className=" md:flex justify-between">
        <CheckInfoUser />
        <BuySummary
          summaryProducts={{
            cant:
              uniqueProduct?.data.attributes.cantidad ??
              cartProducts?.reduce((acc, elem) => (acc += elem.cantidad), 0),
            total:
              uniqueProduct?.data.attributes.subtotal ??
              cartProducts?.reduce((acc, elm) => (acc += elm.subtotal), 0),
          }}
        />
      </div>
    </Wrapper>
  );
}
