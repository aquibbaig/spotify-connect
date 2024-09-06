import { createContext, useState } from "react";
import { TSpotifyConnectContext } from "../types";

export const SpotifyConnectContext = createContext<TSpotifyConnectContext>({
  clientId: "",
  clientSecret: "",
  refreshToken: "",
  accessToken: "",
  setAccessToken: () => {},
});

export const SpotifyConnectContextProvider = ({
  children,
  clientId,
  clientSecret,
  refreshToken,
}: {
  children: React.ReactNode;
} & TSpotifyConnectContext) => {
  const [accessToken, setAccessToken] =
    useState<TSpotifyConnectContext["accessToken"]>("");

  return (
    <SpotifyConnectContext.Provider
      value={{
        clientId,
        clientSecret,
        refreshToken,
        accessToken,
        setAccessToken,
      }}
    >
      {children}
    </SpotifyConnectContext.Provider>
  );
};
