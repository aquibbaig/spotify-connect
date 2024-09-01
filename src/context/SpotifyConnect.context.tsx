import { createContext } from "react";
import { TSpotifyConnectContext } from "../types";

export const SpotifyConnectContext = createContext<TSpotifyConnectContext>({
  clientId: "",
  clientSecret: "",
  refreshToken: "",
});

export const SpotifyConnectContextProvider = ({
  children,
  clientId,
  clientSecret,
  refreshToken,
}: {
  children: React.ReactNode;
} & TSpotifyConnectContext) => {
  return (
    <SpotifyConnectContext.Provider
      value={{
        clientId,
        clientSecret,
        refreshToken,
      }}
    >
      {children}
    </SpotifyConnectContext.Provider>
  );
};
