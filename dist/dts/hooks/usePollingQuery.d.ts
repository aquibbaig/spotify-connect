export declare function usePollingQuery<T>(queryFn: () => Promise<T>, refetchInterval?: number): {
    data: T;
    loading: boolean;
    error: Error;
};
