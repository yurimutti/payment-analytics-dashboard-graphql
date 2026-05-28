import { type ChangeEvent, useState } from "react";

type UseSearchQuery = [string, (event: ChangeEvent<HTMLInputElement>) => void, () => void];

function useSearchQuery(onFetch: (query: string) => void, initial?: string): UseSearchQuery {
  const [query, setQuery] = useState(initial ?? "");

  const change = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onFetch(value);
    setQuery(value);
  };

  const reset = () => {
    const value = initial ?? "";
    onFetch(value);
    setQuery(value);
  };

  return [query, change, reset];
}

export default useSearchQuery;
