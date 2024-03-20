import { CartItem } from "@/app/lib/definitions";
import Image from "next/image";
import { ActionsItem } from "./ActionsItem";

export function ItemCart({ item,token }: { item: CartItem,token: string}) {
  const img = item.producto.image.formats.thumbnail;

  return (
    <div className=" min-h-[20vh] bg-white p-2 mb-4 flex items-center">
      <div className="relative w-[4rem] h-[8vh] md:w-[7rem] md:h-[12vh]">
        <Image
          className=" object-cover"
          src={img.url}
          alt={img.name}
          fill={true}
        />
      </div>

      <div className=" flex w-[80%] ml-4 justify-between">
        <div>
          <h3 className=" w-full text-sm md:text-md font-medium mx-1">
            {item.producto.title}
          </h3>
          <ActionsItem item={item} token={token} />
        </div>

        <div>{item.cantidad}</div>

        <div>
          <p>{item.subtotal}</p>
        </div>
      </div>
    </div>
  );
}
