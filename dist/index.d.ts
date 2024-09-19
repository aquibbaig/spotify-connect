import * as react_jsx_runtime from 'react/jsx-runtime';

type TSpotifyConnectContext = {
    clientId: string | undefined;
    clientSecret: string | undefined;
    refreshToken: string | undefined;
    accessToken: string | undefined;
    setAccessToken: React.Dispatch<React.SetStateAction<TSpotifyConnectContext["accessToken"]>>;
};
type TSpotifyTrack = {
    album: {
        album_type: string;
        artists: [
            {
                external_urls: {
                    spotify: string;
                };
                href: string;
                id: string;
                name: string;
                type: string;
                uri: string;
            }
        ];
        available_markets: string[];
        external_urls: {
            spotify: string;
        };
        href: string;
        id: string;
        images: Array<{
            height: number;
            url: string;
            width: number;
        }>;
        name: string;
        release_date: string;
        release_date_precision: string;
        total_tracks: number;
        type: string;
        uri: string;
    };
    artists: Array<{
        external_urls: {
            spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
    }>;
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
        isrc: string;
    };
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
};
type TCurrentTrack = {
    timestamp: number;
    context: {
        external_urls: {
            spotify: string;
        };
        href: string;
        type: string;
        uri: string;
    };
    item: TSpotifyTrack;
    progress_ms: number;
    currently_playing_type: string;
    actions: {
        disallows: {
            resuming: boolean;
        };
    };
    is_playing: boolean;
};
type TRecentTracks = {
    cursors: {
        after: number;
        before: number;
    };
    href: string;
    items: {
        context: {
            type: string;
            href: string;
            uri: string;
            external_urls: {
                spotify: string;
            };
            played_at: string;
            track: TSpotifyTrack;
        };
    }[];
    limit: 20;
    next: string;
};
type TParsedCurrentTrack = {
    track: {
        id: TSpotifyTrack["id"];
        name: TSpotifyTrack["name"];
        artist: TSpotifyTrack["artists"];
        album: TSpotifyTrack["album"]["name"];
        image: TSpotifyTrack["album"]["images"][0]["url"];
        duration: TSpotifyTrack["duration_ms"];
        progress: number;
        uri: TSpotifyTrack["uri"];
    } | null;
    timestamp: number | null;
    is_playing: boolean;
};

declare const parseCurrentTrack: (data: TCurrentTrack | undefined) => TParsedCurrentTrack;

declare const SpotifyConnectContextProvider: ({ children, clientId, clientSecret, refreshToken, }: {
    children: React.ReactNode;
} & Pick<TSpotifyConnectContext, "clientId" | "clientSecret" | "refreshToken">) => react_jsx_runtime.JSX.Element;

declare const useCurrentTrack: (refetchInterval?: number) => {
    data: TCurrentTrack;
    loading: boolean;
    error: Error | null;
};

declare const useRecentTracks: (refetchInterval?: number, limit?: number) => {
    data: TRecentTracks;
    loading: boolean;
    error: Error | null;
};

export { SpotifyConnectContextProvider, type TSpotifyTrack, parseCurrentTrack, useCurrentTrack, useRecentTracks };
