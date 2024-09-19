import { useCallback, useEffect, useMemo } from "react";
import { currentTrackEndpoint, queryRefetchInterval } from "../constants";
import { SpotifyConnectContext } from "../context/SpotifyConnect.context";
import { TCurrentTrack } from "../types";
import { getAccessToken, useContextWithError } from "../util";
import { usePollingQuery } from "./usePollingQuery";

export const useCurrentTrack = (refetchInterval = queryRefetchInterval) => {
  const { clientId, clientSecret, refreshToken, accessToken, setAccessToken } =
    useContextWithError(SpotifyConnectContext);

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
    const fetchCurrentTrack = async ({
      accessToken,
    }: {
      accessToken: string;
    }) => {
      if (!accessToken) return;

      const response = await fetch(currentTrackEndpoint, {
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
      return {
        data: null,
        loading: true,
        error: null,
      };
    } else {
      return fetchCurrentTrack({ accessToken });
    }
  }, [accessToken, basic, refreshToken]);

  return usePollingQuery<TCurrentTrack>(queryFn, refetchInterval);
};
