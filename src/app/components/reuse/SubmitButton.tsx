"use client";

import { useFormStatus } from "react-dom";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function SubmitButton({ children, className }: Props) {
  const status = useFormStatus();

  return (
    <button
      type="submit"
      className={`${className} ${status.pending ? " cursor-not-allowed" : ""}`}
      disabled={status.pending}
    >
      {status.pending ? "..." : children}
    </button>
  );
}
