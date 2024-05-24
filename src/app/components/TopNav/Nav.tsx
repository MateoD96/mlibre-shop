import { verifyAuth } from "@/app/(routes)/hub/lib/auth";
import { api } from "../../lib/data";
import { MobileBar, DesktopBar, LayoutMenu } from "../index";

export async function Nav({ tokenAuth }: { tokenAuth?: string }) {
  const tokenVerify =
    tokenAuth && (await verifyAuth(tokenAuth).catch((err) => console.log(err)));
  const categories = await api.getCategories();

  return (
    <LayoutMenu>
      <MobileBar categories={categories.data} userVerify={tokenVerify} />
      <DesktopBar categories={categories.data} userVerify={tokenVerify} />
    </LayoutMenu>
  );
}
