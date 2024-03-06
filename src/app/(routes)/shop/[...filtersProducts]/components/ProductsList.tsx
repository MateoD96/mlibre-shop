import Image from "next/image";
import { Products } from "../lib/definitions";
import Link from "next/link";

interface Props {
  products: Products;
}

export async function ProductsList({ products }: Props) {
  return (
    <div className=" order-2 md:w-3/4 bg-white rounded-md py-4 w-full my-4">
      {products &&
        products.data?.map((data) => (
          <div
            key={data.id}
            className=" w-full my-3 border-b-[1.5px] pl-4 pb-4 flex"
          >
            <div className=" relative w-2/5 h-[12vh] sm:h-[15vh] lg:h-[20vh] sm:w-[30%]">
              <Link href={`/${data.attributes.slug}`}>
                <Image
                  className=" object-cover object-center"
                  src={data.attributes.image.data?.attributes.formats.large.url}
                  alt={data.attributes.image.data?.attributes.name}
                  fill={true}
                />
              </Link>
            </div>

            <div className="ml-4">
              <div>
                <h2 className=" text-xl font-light">{data.attributes.title}</h2>
              </div>
              <div className=" flex">
                <p>${data.attributes.price}</p>
                <p className=" ml-2 text-green-600">
                  {data.attributes?.descuento}
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
