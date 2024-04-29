"use server";

import { MercadoPagoConfig, Preference } from "mercadopago";
import { redirect } from "next/navigation";
import { BuyItem, DataPayment } from "../../lib/interfaces";
import { orderProduct, orderProducts } from "./utils";
import { CartItem } from "@/app/lib/definitions";

const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN_MP_TEST!,
});

export const createOrder = async (dataPayment: DataPayment) => {
  const items = !Array.isArray(dataPayment.productsPay)
    ? orderProduct(dataPayment.productsPay as CartItem)
    : orderProducts(dataPayment.productsPay as CartItem[]);

  const preferences = new Preference(client);

  const res = await preferences.create({
    body: {
      items,
      payer: {
        name: dataPayment.dataClient.namecomplete,
        address: {
          street_name: dataPayment.dataClient.calle,
          street_number: Number(dataPayment.dataClient.refDir),
        },
        phone: {
          number: dataPayment.dataClient.tel,
        },
      },
      back_urls: {
        success: "http://localhost:3000/cart",
      },
    },
  });

  redirect(res.sandbox_init_point!);
};
