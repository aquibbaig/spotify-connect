import { TRecentTracks } from "../types";
export declare const useRecentTracks: (refetchInterval?: number, limit?: number) => {
    data: TRecentTracks;
    loading: boolean;
    error: Error | null;
};
