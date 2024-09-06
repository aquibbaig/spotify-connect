export declare function usePollingQuery<T>(queryFn: (...args: any[]) => Promise<T>, refetchInterval?: number): {
    data: T;
    loading: boolean;
    error: Error;
};
