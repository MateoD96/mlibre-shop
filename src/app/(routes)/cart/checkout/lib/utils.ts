import { CartItem } from "@/app/lib/definitions";

const getProduct = (prod: CartItem) => {
  return {
    id: String(prod.id),
    title: prod.producto.title,
    quantity: prod.cantidad,
    unit_price: prod.producto.price,
  };
};

export const orderProduct = (product: CartItem) => {
  return Array(product).map((prod) => getProduct(prod));
};

export const orderProducts = (products: CartItem[]) => {
  return products.map((prod) => getProduct(prod));
};
