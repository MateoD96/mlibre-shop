import { getCategories } from "../../lib/data";
import { MobileBar, DesktopBar, LayoutMenu } from "../index";

export async function Nav() {
  const categories = await getCategories();

  return (
    <LayoutMenu>
      <MobileBar categories={categories.data} />
      <DesktopBar categories={categories.data} />
    </LayoutMenu>
  );
}
