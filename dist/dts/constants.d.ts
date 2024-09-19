import { TCurrentTrack, TParsedCurrentTrack } from "./types";
export declare const currentTrackEndpoint = "https://api.spotify.com/v1/me/player/currently-playing";
export declare const recentTracksEndpoint = "https://api.spotify.com/v1/me/player/recently-played";
export declare const apiTokenEndpoint = "https://accounts.spotify.com/api/token";
export declare const queryRefetchInterval: number;
export declare const parseCurrentTrack: (data: TCurrentTrack | undefined) => TParsedCurrentTrack;
