interface Props {
  children: React.ReactNode;
}

export function Wrapper({ children }: Props) {
  return (
    <div className="w-full sm:w-[80%] mx-auto p-3 sm:px-0">{children}</div>
  );
}
