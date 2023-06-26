import _ from "lodash";
import { useCallback } from "react";

export default function useDebounce(delay = 750) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(
    _.debounce((setQuery: () => void) => setQuery(), delay),
    []
  );
}
