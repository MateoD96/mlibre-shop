"use server";

import { postData } from "@/app/lib/utils";
import { cookies } from "next/headers";
import { verifyAuth } from "../../hub/lib/auth";
import { redirect } from "next/navigation";
import { api } from "@/app/lib/data";
import { CartItem } from "@/app/lib/definitions";

interface ProdInfo {
  prodId?: number;
  stock: number;
  price: number;
}

export async function updateQtyItem(
  item: CartItem,
  qtyBuy: number,
  token: string,
  { price, stock }: ProdInfo
) {
  const { update } = postData();
  const stockVerify =
    stock > item.cantidad && item.cantidad + qtyBuy <= stock ? true : false;
  const sbt = stockVerify && (item.cantidad + qtyBuy) * price;

  const updated = {
    data: {
      cantidad: item.cantidad + qtyBuy,
      subtotal: sbt,
    },
  };

  stockVerify &&
    (await update(`${process.env.URL_LOCAL}/cart-items/${item.id}`, updated, {
      Authorization: `Bearer ${token}`,
    }));
}

//////////////////

export async function insertNewItemCart(
  { prodId, price, stock }: ProdInfo,
  qtyBuy: number
) {
  const token = cookies().get("currentUser")?.value;
  const tokenVerify =
    token && (await verifyAuth(token).catch((err) => console.log(err)));

  if (!tokenVerify) {
    redirect("/hub/login");
  }

  const me = await api.getMe(
    token,
    "?populate[carrito][populate][cart_items][populate][producto][fields][0]=id"
  );

  const prodExist = me.carrito.cart_items?.find(
    (item) => item.producto.id === prodId
  );

  if (prodExist) {
    await updateQtyItem(prodExist, qtyBuy, token, { price, stock });
    redirect("/cart");
  }

  const newItem = {
    data: {
      carrito: me.carrito.id,
      producto: prodId,
      cantidad: qtyBuy,
      subtotal: price * qtyBuy,
    },
  };

  const { insert } = postData();

  const res = await insert(`${process.env.URL_LOCAL}/cart-items`, newItem, {
    Authorization: `Bearer ${token}`,
  });

  if (res) {
    redirect("/cart");
  }
}

////////////////////////

export async function createNewCart(uuid: number, jwt: string) {
  const { insert } = postData();

  const cart = {
    data: {
      users_permissions_user: uuid,
    },
  };

  await insert(`${process.env.URL_LOCAL}/carritos`, cart, {
    Authorization: `Bearer ${jwt}`,
  });
}
