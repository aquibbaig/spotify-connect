// src/constants.ts
var currentlyPlayingEndpoint = `https://api.spotify.com/v1/me/player/currently-playing`;
var apiTokenEndpoint = `https://accounts.spotify.com/api/token`;
var queryRefetchInterval = 10 * 1e3;
var parseCurrentlyPlayingTrack = (data) => {
  if (!data || !data.item) {
    return {
      track: null,
      timestamp: null,
      is_playing: false
    };
  }
  const { item, progress_ms, timestamp } = data;
  return {
    track: {
      id: item.id,
      name: item.name,
      artist: item.artists,
      album: item.album.name,
      image: item.album.images[0].url,
      duration: item.duration_ms,
      progress: progress_ms,
      uri: item.uri
    },
    timestamp,
    is_playing: true
  };
};

// src/context/SpotifyConnect.context.tsx
import { createContext } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { jsx } from "react/jsx-runtime";
var SpotifyConnectContext = createContext({
  clientId: "",
  clientSecret: "",
  refreshToken: ""
});
var SpotifyConnectContextProvider = ({
  children,
  clientId,
  clientSecret,
  refreshToken
}) => {
  const queryClient = new QueryClient();
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(
    SpotifyConnectContext.Provider,
    {
      value: {
        clientId,
        clientSecret,
        refreshToken
      },
      children
    }
  ) });
};

// src/hooks/useCurrentlyPlaying.ts
import * as querystring from "querystring";
import { useCallback, useContext, useState } from "react";
import { useQuery } from "react-query";
var useContextWithError = (context) => {
  const contextValue = useContext(context);
  if (!contextValue) {
    throw new Error(
      `useCurrentlyPlaying must be used within a SpotifyConnectContextProvider`
    );
  }
  return contextValue;
};
var useCurrentlyPlaying = (refetchInterval = queryRefetchInterval) => {
  const { clientId, clientSecret, refreshToken } = useContextWithError(
    SpotifyConnectContext
  );
  const [accessToken, setAccessToken] = useState();
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const getAccessToken = useCallback(async () => {
    const response = await fetch(apiTokenEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: querystring.stringify({
        grant_type: "refresh_token",
        refresh_token: refreshToken
      })
    });
    if (response.status === 401) {
      throw new Error("Invalid refresh token");
    }
    return response.json();
  }, []);
  return useQuery(
    ["currently-playing"],
    async () => {
      const fetchCurrentlyPlaying = async ({
        accessToken: accessToken2
      }) => {
        const response = await fetch(currentlyPlayingEndpoint, {
          headers: {
            Authorization: `Bearer ${accessToken2}`
          }
        });
        if (response.status === 204 || response.status > 400) {
          return { is_playing: false };
        }
        return await response.json();
      };
      if (!accessToken) {
        const { access_token } = await getAccessToken();
        setAccessToken(access_token);
        if (!access_token) {
          throw new Error("Invalid access token");
        }
        return fetchCurrentlyPlaying({ accessToken: access_token });
      } else {
        return fetchCurrentlyPlaying({ accessToken });
      }
    },
    {
      refetchInterval,
      retry: false
    }
  );
};
export {
  SpotifyConnectContextProvider,
  parseCurrentlyPlayingTrack,
  useCurrentlyPlaying
};
//# sourceMappingURL=index.mjs.map