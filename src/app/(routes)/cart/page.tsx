import { Wrapper } from "@/app/components";
import { api } from "@/app/lib/data";
import { cookies } from "next/headers";
import { Cart } from "./components";

export default async function CartPage() {
  const currentUserToken = cookies().get("currentUser")?.value;
  const me =
    currentUserToken &&
    (await api.getMe(
      currentUserToken,
      "?populate[carrito][populate][cart_items][populate][producto][populate][image][fields][0]=formats"
    ));

  return (
    <Wrapper>
      {me && (
        <div className=" flex flex-col md:flex-row mt-6">
          <Cart items={me.carrito.cart_items} token={currentUserToken} />
        </div>
      )}
    </Wrapper>
  );
}
