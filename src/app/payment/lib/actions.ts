
import { postData } from "@/app/lib/utils";
import { NewOrder } from "./definitions";

export const insertNewOrder = async (order: NewOrder) => {
  const { insert } = postData();

  const data = {};

  //const resp = await insert(`${process.env.URL_LOCAL}/pedidos`, data);
};
