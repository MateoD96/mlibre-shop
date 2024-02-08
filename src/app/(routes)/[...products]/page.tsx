interface Props {
  params: {
    products: string;
  };
}

// filtrar con los multiples parametros

export default function ProductsPage({ params }: Props) {
  return <div>{JSON.stringify(params.products)}</div>;
}
