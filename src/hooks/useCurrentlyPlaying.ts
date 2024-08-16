"use client";

import { Context, useCallback, useContext, useState } from "react";
import { useQuery } from "react-query";
import {
  apiTokenEndpoint,
  currentlyPlayingEndpoint,
  queryRefetchInterval,
} from "../../src/constants";
import { SpotifyConnectContext } from "../context/SpotifyConnect.context";
import { TCurrentlyPlayingTrack } from "../types";

const useContextWithError = <T>(context: Context<T>) => {
  const contextValue = useContext<T>(context);

  if (!contextValue) {
    throw new Error(
      `useCurrentlyPlaying must be used within a SpotifyConnectContextProvider`
    );
  }

  return contextValue;
};

export const useCurrentlyPlaying = (refetchInterval = queryRefetchInterval) => {
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
      }).toString()
    });

    if (response.status === 401) {
      throw new Error("Invalid refresh token");
    }

    return response.json();
  }, []);

  return useQuery<TCurrentlyPlayingTrack>(
    ["currently-playing"],
    async () => {
      const fetchCurrentlyPlaying = async ({
        accessToken,
      }: {
        accessToken: string;
      }) => {
        const response = await fetch(currentlyPlayingEndpoint, {
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

        return fetchCurrentlyPlaying({ accessToken: access_token });
      } else {
        return fetchCurrentlyPlaying({ accessToken });
      }
    },
    {
      refetchInterval,
      retry: false,
    }
  );
};
