import { NextRequest } from "next/server";

import { MercadoPagoConfig, Payment } from "mercadopago";
import { insertNewOrder } from "./lib/actions";
import { NewOrder } from "./lib/definitions";

const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN_MP_TEST!,
});

export async function POST(request: NextRequest) {
  const body = await request
    .json()
    .then((data) => data as { data: { id: string } });

  // obtenemos el pago, de esta forma podemos validarlo y manipularlo
  const payment = await new Payment(client).get({ id: body.data.id });

  //TODO: Obtenemos los datos del cliente que previo a la compra tenemos guardados en la bd

  // guardar pedido
  const newOrder: NewOrder = {
    idPayment: payment.id,
    dataPayer: {
      emailPayer: payment.payer?.email,
    },
    dataClient: {},
    dataProducts: {
      data: payment.additional_info?.items,
    },
    subtotal: payment.transaction_amount,
  };

  payment.id && (await insertNewOrder(newOrder));

  return Response.json({ success: true });
}
