interface Props {
  params: {
    subcat: string;
  };
}

export default function SubCategorie({ params }: Props) {
  const idSubcat = params.subcat;

  return <div>Subcat: {idSubcat}</div>;
}
