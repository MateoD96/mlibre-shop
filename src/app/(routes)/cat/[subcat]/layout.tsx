export default function LayoutCategories({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    subcat: string;
  };
}) {
  return <div>{children}</div>;
}
