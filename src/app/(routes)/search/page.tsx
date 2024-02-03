interface Props {
  searchParams: {
    q: string;
  };
}

export default async function SearchPage({ searchParams }: Props) {
  return <div>Search: {searchParams.q}</div>;
}
