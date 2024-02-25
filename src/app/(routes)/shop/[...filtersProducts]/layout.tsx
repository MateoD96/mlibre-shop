interface Props {
  children: React.ReactNode;
  params: {
    filtersProducts: string[];
  };
}

export default async function LayoutShop({ children, params }: Props) {
  return <div>{children}</div>;
}
