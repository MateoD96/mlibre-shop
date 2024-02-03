"use client";

import { useState } from "react";

export function useToggle() {
  const [active, setActive] = useState(false);

  const toggle = () => (active ? setActive(false) : setActive(true));

  return {
    toggle,
    active,
    setActive,
  };
}
