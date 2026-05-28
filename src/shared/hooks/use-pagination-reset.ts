import { useEffect, useRef } from "react";

interface UsePaginationResetArgs {
  resetKeys: ReadonlyArray<unknown>;
  onReset: () => void;
}

export function usePaginationReset({ resetKeys, onReset }: UsePaginationResetArgs) {
  const first = useRef(true);
  const onResetRef = useRef(onReset);
  onResetRef.current = onReset;
  const key = resetKeys.join("|");

  // biome-ignore lint/correctness/useExhaustiveDependencies: `key` is the intended reset trigger
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    onResetRef.current();
  }, [key]);
}
