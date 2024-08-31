import { createContext } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
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
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SpotifyConnectContext.Provider
        value={{
          clientId,
          clientSecret,
          refreshToken,
        }}
      >
        {children}
      </SpotifyConnectContext.Provider>
    </QueryClientProvider>
  );
};
