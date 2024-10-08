export declare function usePollingQuery<T>(queryFn: (...args: any[]) => Promise<T>, refetchInterval?: number): {
    data: T | null;
    loading: boolean;
    error: Error | null;
};
