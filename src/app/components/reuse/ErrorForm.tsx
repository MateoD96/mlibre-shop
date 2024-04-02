export function ErrorForm({ error }: { error: string }) {
  return (
    <div className=" text-red-500 text-xs my-1">
      <p>{error}</p>
    </div>
  );
}
