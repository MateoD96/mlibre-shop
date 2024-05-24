"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function SignUp() {
  useEffect(() => {
    localStorage.clear();
    redirect("/");
  }, []);

  return null;
}
