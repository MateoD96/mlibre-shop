import { URLImageData } from "@/app/lib/definitions";
import Image from "next/image";

interface Props {
  image: URLImageData;
  children?: React.ReactNode;
}

export function BannerSubcategory({ image, children }: Props) {
  return (
    <div className="w-full h-[30vh] md:h-[50vh] relative">
      {children && children}
      <Image
        className=" object-cover"
        src={image.attributes.url}
        alt={image.attributes.name}
        /*  width={image.attributes.width}
        height={image.attributes.height} */
        fill={true}
        priority={true}
      />
    </div>
  );
}
