import { CartItem } from "@/app/lib/definitions";

export interface BuyItem {
  data: {
    id: number;
    attributes: {
      cantidad: number;
      subtotal: number;
      producto: {
        title: string;
        price: number;
        stock: number;
        descuento: string;
      };
    };
  };
}

export interface AddresData {
  barrio: string;
  calle: string;
  dep: string;
  location: string;
  namecomplete: string;
  numero: string;
  refDir: string;
  tel: string;
  tipoCalle: string;
}

export interface CheckData {
  addresData: AddresData;
}

export type productP = CartItem | CartItem[] | null | undefined;

export interface ProductsPay {
  clientId?: number;
  products: productP;
}

export interface DataPayment {
  productsPay: productP;
}
