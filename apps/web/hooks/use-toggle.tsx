import { useCallback, useState } from "react";

export default function useToggle(initialValue: boolean) {
  const [state, setState] = useState(initialValue);

  const toggle = useCallback(() => setState((s) => !s), []);

  return [state, toggle, setState] as const;
}
