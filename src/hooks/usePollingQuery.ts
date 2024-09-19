import { useCallback, useEffect, useRef, useState } from "react";
import { isDocumentVisible } from "src/util";

export function usePollingQuery<T>(
  queryFn: (...args: any[]) => Promise<T>,
  refetchInterval = 10 * 1000
) {
  const minimumInterval = 1000;

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isFetchingRef = useRef<boolean>(false);

  const [queryState, setQueryState] = useState<{
    data: T | null;
    loading: boolean;
    error: Error | null;
  }>({
    data: null,
    loading: true,
    error: null,
  });

  const launchQuery = useCallback(async () => {
    if (isDocumentVisible() && !isFetchingRef.current) {
      try {
        const result = await queryFn();

        setQueryState({ data: result, error: null, loading: false });
      } catch (err) {
        setQueryState({
          error: err instanceof Error ? err : new Error(String(err)),
          data: null,
          loading: false,
        });
      } finally {
        isFetchingRef.current = false;
      }
    }
  }, [queryFn]);

  useEffect(() => {
    if (refetchInterval <= minimumInterval) {
      setQueryState({
        data: null,
        loading: false,
        error: new Error(
          `Minimum accepted value of refetchInterval is ${minimumInterval}!`
        ),
      });
      return;
    }

    launchQuery();
    timerRef.current = setInterval(launchQuery, refetchInterval);

    return () => {
      clearInterval(timerRef.current);
      isFetchingRef.current = false;
    };
  }, [refetchInterval, launchQuery]);

  return {
    ...queryState,
  };
}
