import { apiTokenEndpoint } from "./constants";

export type TSpotifyConnectContext = {
  clientId: string | undefined;
  clientSecret: string | undefined;
  refreshToken: string | undefined;
  accessToken: string | undefined;
  setAccessToken: React.Dispatch<
    React.SetStateAction<TSpotifyConnectContext["accessToken"]>
  >;
};

export type TSpotifyTrack = {
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

export type TCurrentTrack = {
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

export type TParsedCurrentTrack = {
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

export const getAccessToken = async (
  authToken: string,
  refreshToken: string
): Promise<{ access_token: string }> => {
  const response = await fetch(apiTokenEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Basic ${authToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }).toString(),
  });

  if (response.status === 401) {
    throw new Error("Invalid refresh token");
  }

  return response.json();
};
