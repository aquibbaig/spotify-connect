import { TCurrentTrack } from "../types";
export declare const useCurrentTrack: (refetchInterval?: number) => {
    data: TCurrentTrack;
    loading: boolean;
    error: Error | null;
};
