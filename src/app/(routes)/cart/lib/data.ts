import { getData } from "@/app/lib/utils";

interface BuyItem {
  data: {
    id: number;
    attributes: {
      cantidad: number;
      subtotal: number;
    };
  };
}

export async function getBuyProduct(idItem: string, token: string) {
  const res =
    idItem &&
    (await getData<BuyItem>(`${process.env.URL_LOCAL}/cart-items/${idItem}`, {
      Authorization: `Bearer ${token}`,
    }));

  return res as BuyItem;
}
