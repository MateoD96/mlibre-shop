import { Breadcrumbs, Wrapper } from "@/app/components";
import { apiProduct } from "./utils/data";
import { Product } from "./components";

interface Props {
  params: {
    product: string;
  };
}

export default async function ProductPage({ params }: Props) {
  const { product } = params;
  const dataProd = await apiProduct.getProduct(product);
  const { data } = dataProd;

  if (!data) return <h3>No se obtuvieron resultados</h3>;

  return (
    <Wrapper>
      <Breadcrumbs
        breadcrumbs={[
          {
            label:
              data.attributes.subsub_categorie.data.attributes.sub_categoria
                .data.attributes.title,
            href: `/cat/${data.attributes.subsub_categorie.data.attributes.sub_categoria.data.attributes.slug}`,
          },
          {
            label: data.attributes.subsub_categorie.data.attributes.slug,
            href: `/shop/${data.attributes.subsub_categorie.data.attributes.sub_categoria.data.attributes.slug}/${data.attributes.subsub_categorie.data.attributes.slug}`,
          },
        ]}
      />
      <Product product={data} />
    </Wrapper>
  );
}
