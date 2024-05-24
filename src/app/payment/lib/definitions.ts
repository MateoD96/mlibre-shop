import { Items } from "mercadopago/dist/clients/commonTypes";

export interface NewOrder {
  idPayment: number | undefined;
  dataPayer: DataPayer;
  dataClient: DataClient;
  dataProducts: DataProducts;
  subtotal: number | undefined;
}

interface DataPayer {
  emailPayer: string | undefined;
}

interface DataClient {}

interface DataProducts {
  data: Items[] | undefined;
}
