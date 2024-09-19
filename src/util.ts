import { Context, useContext } from "react";
import { apiTokenEndpoint } from "./constants";

export const isDocumentVisible = (): boolean => {
  try {
    return (
      typeof document === "undefined" ||
      document.visibilityState === undefined ||
      document.visibilityState === "visible"
    );
  } catch (err) {
    return false;
  }
};

export const getAccessToken = async (
  authToken: string,
  refreshToken: string
) => {
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

export const useContextWithError = <T>(context: Context<T>) => {
  const contextValue = useContext<T>(context);

  if (!contextValue) {
    throw new Error(
      `useCurrentTrack must be used within a SpotifyConnectContextProvider`
    );
  }

  return contextValue;
};
