import { CartItem } from "@/app/lib/definitions";
import { BuySummary, CheckInfoUser } from "./index";
import { Wrapper } from "@/app/components";
import { api } from "@/app/lib/data";
import { CheckPaymentMethod } from "./CheckInfoUser";

interface CheckBuy {
  checkProds: {
    uniqueItem?: CartItem | null;
    cartProducts?: CartItem[] | null;
  };
  tokenUser: string;
}

export async function Check({ checkProds, tokenUser }: CheckBuy) {
  const data = await api.getMe(tokenUser!, "?populate[cliente]=cliente");

  return (
    <Wrapper>
      <div className=" md:flex justify-between">
        {/* Validamos si el Usuario ya tiene datos guardados */}

        {data.cliente?.id ? (
          <CheckPaymentMethod
            dataPayment={{
              products: checkProds.cartProducts || checkProds.uniqueItem,
            }}
          />
        ) : (
          <CheckInfoUser
            products={checkProds.uniqueItem || checkProds.cartProducts}
            clientId={data.id!}
          />
        )}

        {/* ///////////////////////// */}

        {checkProds.uniqueItem && (
          <BuySummary
            summaryProducts={{
              cant: checkProds.uniqueItem.cantidad,
              total: checkProds.uniqueItem.subtotal,
            }}
          />
        )}

        {checkProds.cartProducts && (
          <BuySummary
            summaryProducts={{
              cant: checkProds.cartProducts?.reduce(
                (acc, elem) => (acc += elem.cantidad),
                0
              ),
              total: checkProds.cartProducts?.reduce(
                (acc, elm) => (acc += elm.subtotal),
                0
              ),
            }}
          />
        )}
      </div>
    </Wrapper>
  );
}
