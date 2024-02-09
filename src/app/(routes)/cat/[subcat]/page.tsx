import { api } from "@/app/lib/data";
import { BannerSubcategory, CardsSubcategories } from "./components";
import { Wrapper } from "@/app/components";
import Link from "next/link";

interface Props {
  params: {
    subcat: string;
  };
  searchParams: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const { data } = await api.getSubcategory(params.subcat);
  if (data)
    return {
      title: data?.attributes.title,
    };
}

export default async function SubCategoryPage({ params }: Props) {
  const { data } = await api.getSubcategory(params.subcat);

  if (!data) {
    return <h1>No hay publicaciones que coincidan con tu busqueda</h1>;
  }

  return (
    <>
      <Wrapper>
        <h2 className=" my-4">{data.attributes.title}</h2>
      </Wrapper>

      <BannerSubcategory image={data.attributes.url_image.data}>
        <Wrapper>
          <div className="z-10 top-6 absolute flex flex-col justify-between h-2/5">
            <h3 className=" text-md sm:text-xl md:text-3xl bg-yellow-200 p-2 rounded-md">
              {data.attributes.description}
            </h3>
            <Link
              href={"#"}
              className=" uppercase font-bold p-2 rounded-md bg-yellow-400 text-center w-60"
            >
              En oferta
            </Link>
          </div>
        </Wrapper>
      </BannerSubcategory>

      <Wrapper>
        <CardsSubcategories subCategories={data.attributes.subsub_categories} />
      </Wrapper>
    </>
  );
}
