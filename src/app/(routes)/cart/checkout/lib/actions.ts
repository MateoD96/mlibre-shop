"use server";

import { MercadoPagoConfig, Preference } from "mercadopago";
import { redirect } from "next/navigation";
import { AddresData, ProductsPay } from "../../lib/interfaces";
import { orderProduct, orderProducts } from "./utils";
import { CartItem } from "@/app/lib/definitions";
import { postData } from "@/app/lib/utils";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN_MP_TEST!,
});

export const createOrder = async (productsPayment: ProductsPay) => {
  const items = !Array.isArray(productsPayment.products)
    ? orderProduct(productsPayment.products as CartItem)
    : orderProducts(productsPayment.products as CartItem[]);

  const preferences = new Preference(client);

  const res = await preferences.create({
    body: {
      items,
    },
  });

  redirect(res.sandbox_init_point!);
};

///////////////////////////////

export const createClient = async (dataClient: AddresData, uuid: number) => {
  const currentUser = cookies().get("currentUser")?.value;
  const { insert } = postData();

  const newClient = {
    data: {
      users_permissions_user: uuid,
      clientInfo: {
        nameComplete: dataClient.namecomplete,
        tel: dataClient.tel,
      },
      addresInfo: {
        dep: dataClient.dep,
        mun: dataClient.location,
        barrio: dataClient.barrio,
        tipoCalle: dataClient.tipoCalle,
        numCalle: dataClient.numero,
        refAddres: dataClient.refDir,
      },
    },
  };

  const resp = await insert(`${process.env.URL_LOCAL}/clientes`, newClient, {
    Authorization: `Bearer ${currentUser}`,
  });

  resp.data && revalidateTag("me");
};
