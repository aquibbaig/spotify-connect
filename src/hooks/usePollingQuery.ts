import { useEffect, useRef, useState } from "react";
import { isDocumentVisible } from "src/util";

export function usePollingQuery<T>(
  queryFn: (...args: any[]) => Promise<T>,
  refetchInterval = 10 * 1000
) {
  const minimumInterval = 1000;

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  if (refetchInterval <= minimumInterval) {
    return {
      data: null,
      loading: false,
      error: new Error(
        `Minimum accepted value of refetchInterval is ${minimumInterval}!`
      ),
    };
  }

  useEffect(() => {
    async function launchQuery() {
      if (isDocumentVisible()) {
        setLoading(true);
        try {
          const result = await queryFn();
          setData(result);
        } catch (err) {
          setError(err instanceof Error ? err : new Error(String(err)));
        } finally {
          setLoading(false);
        }
      }
    }

    launchQuery();
    timerRef.current = setInterval(launchQuery, refetchInterval);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [refetchInterval, queryFn]);

  return {
    data,
    loading,
    error,
  };
}
