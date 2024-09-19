import { TSpotifyConnectContext } from "../types";
export declare const SpotifyConnectContext: import("react").Context<TSpotifyConnectContext>;
export declare const SpotifyConnectContextProvider: ({ children, clientId, clientSecret, refreshToken, }: {
    children: React.ReactNode;
} & Pick<TSpotifyConnectContext, "clientId" | "clientSecret" | "refreshToken">) => import("react/jsx-runtime").JSX.Element;
