export function ErrorForm({ error }: { error: string }) {
  return (
    <div className="text-red-500 text-xs relative mb-2">
      <p className=" absolute top-0">{error}</p>
    </div>
  );
}
