import { getData } from "@/app/lib/utils";
import { BuyItem } from "./interfaces";

export async function getBuyProduct(idItem: string, token: string) {
  const res =
    idItem &&
    (await getData<BuyItem>(
      `${process.env.URL_LOCAL}/cart-items/${idItem}?populate[producto]=producto`,
      {
        Authorization: `Bearer ${token}`,
      }
    ));

  return res as BuyItem;
}
