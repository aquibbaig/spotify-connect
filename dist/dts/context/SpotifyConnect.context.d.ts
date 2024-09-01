/// <reference types="react" />
import { TSpotifyConnectContext } from "../types";
export declare const SpotifyConnectContext: import("react").Context<TSpotifyConnectContext>;
export declare const SpotifyConnectContextProvider: ({ children, clientId, clientSecret, refreshToken, }: {
    children: React.ReactNode;
} & TSpotifyConnectContext) => import("react/jsx-runtime").JSX.Element;
