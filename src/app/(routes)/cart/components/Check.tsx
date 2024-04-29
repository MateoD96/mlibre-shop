import { CartItem } from "@/app/lib/definitions";
import { BuySummary, CheckInfoUser } from "./index";
import { Wrapper } from "@/app/components";

interface Props {
  uniqueCartItem?: CartItem | null;
  cartProducts?: CartItem[] | null;
}

export function Check({ uniqueCartItem, cartProducts }: Props) {
  return (
    <Wrapper>
      <div className=" md:flex justify-between">
        {/*TODO: VALIDAR SI EL USUARIO YA TIENE SUS DATOS PERSONALES GUARDADOS */}
        <CheckInfoUser products={uniqueCartItem || cartProducts} />

        <BuySummary
          summaryProducts={{
            cant:
              uniqueCartItem?.cantidad ??
              cartProducts?.reduce((acc, elem) => (acc += elem.cantidad), 0),
            total:
              uniqueCartItem?.subtotal ??
              cartProducts?.reduce((acc, elm) => (acc += elm.subtotal), 0),
          }}
        />
      </div>
    </Wrapper>
  );
}
