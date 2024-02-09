import { SubsubCategories } from "@/app/lib/definitions";
import { Grid, Card } from "@/app/components";
import Image from "next/image";
import Link from "next/link";

interface Props {
  subCategories?: SubsubCategories;
}

export function CardsSubcategories({ subCategories }: Props) {
  const elements = subCategories?.data;

  return (
    <div className=" my-6">
      <Grid>
        {elements &&
          elements.map(({ id, attributes }) => (
            <Card key={id}>
              <Link href={`/shop/${attributes.slug}`}>
                <div className=" relative h-[30vh]">
                  {attributes.url_image.data && (
                    <Image
                      className=" object-cover"
                      src={
                        attributes.url_image.data.attributes.formats.medium.url
                      }
                      alt={attributes.url_image.data.attributes.name}
                      fill={true}
                    />
                  )}
                </div>
                <p className=" p-4">{attributes.title}</p>
              </Link>
            </Card>
          ))}
      </Grid>
    </div>
  );
}
