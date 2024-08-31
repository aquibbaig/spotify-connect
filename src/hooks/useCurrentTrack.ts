import { Context, useCallback, useContext, useState } from "react";
import { useQuery } from "react-query";
import {
  apiTokenEndpoint,
  currentTrackEndpoint,
  queryRefetchInterval,
} from "../constants";
import { SpotifyConnectContext } from "../context/SpotifyConnect.context";
import { TCurrentTrack } from "../types";

const useContextWithError = <T>(context: Context<T>) => {
  const contextValue = useContext<T>(context);

  if (!contextValue) {
    throw new Error(
      `useCurrentTrack must be used within a SpotifyConnectContextProvider`
    );
  }

  return contextValue;
};

export const useCurrentTrack = (refetchInterval = queryRefetchInterval) => {
  const { clientId, clientSecret, refreshToken } = useContextWithError(
    SpotifyConnectContext
  );
  const [accessToken, setAccessToken] = useState<string>();

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const getAccessToken = useCallback(async () => {
    const response = await fetch(apiTokenEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
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
  }, []);

  return useQuery<TCurrentTrack>(
    ["current-track"],
    async () => {
      const fetchCurrentTrack = async ({
        accessToken,
      }: {
        accessToken: string;
      }) => {
        const response = await fetch(currentTrackEndpoint, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
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

        return fetchCurrentTrack({ accessToken: access_token });
      } else {
        return fetchCurrentTrack({ accessToken });
      }
    },
    {
      refetchInterval,
      retry: false,
    }
  );
};
