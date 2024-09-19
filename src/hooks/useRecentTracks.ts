import { useCallback, useEffect, useMemo } from "react";
import { recentTracksEndpoint } from "../constants";
import { SpotifyConnectContext } from "../context/SpotifyConnect.context";
import { TRecentTracks } from "../types";
import { getAccessToken, useContextWithError } from "../util";
import { usePollingQuery } from "./usePollingQuery";

const RECENT_TRACKS_REFETCH_INTERVAL = 30 * 1000;

export const useRecentTracks = (
  refetchInterval = RECENT_TRACKS_REFETCH_INTERVAL,
  limit = 5
) => {
  const { clientId, clientSecret, refreshToken, accessToken, setAccessToken } =
    useContextWithError(SpotifyConnectContext);

  if (limit > 20) {
    throw new Error(
      `Invalid limit provided limit=${limit}. It should not exceed 20.`
    );
  }

  const basic = useMemo(
    () => Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
    [clientId, clientSecret]
  );

  useEffect(() => {
    const fetchAndUpdateAccessToken = async () => {
      if (!accessToken) {
        const { access_token } = await getAccessToken(basic, refreshToken);
        if (!access_token) throw new Error("Invalid access token");
        setAccessToken(access_token);
      }
    };

    fetchAndUpdateAccessToken();
  }, [accessToken]);

  const queryFn = useCallback(async () => {
    const fetchRecentTracks = async ({
      accessToken,
    }: {
      accessToken: string;
    }) => {
      if (!accessToken) return;

      const response = await fetch(`${recentTracksEndpoint}?limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 401) {
        setAccessToken(null);
        return { is_playing: false };
      }

      if (response.status === 204 || response.status > 400) {
        return { is_playing: false };
      }

      return await response.json();
    };

    if (!accessToken) {
      return () => {};
    } else {
      return fetchRecentTracks({ accessToken });
    }
  }, [accessToken, basic, refreshToken]);

  return usePollingQuery<TRecentTracks>(queryFn, refetchInterval);
};
