import { Context } from "react";
export declare const isDocumentVisible: () => boolean;
export declare const getAccessToken: (authToken: string, refreshToken: string) => Promise<any>;
export declare const useContextWithError: <T>(context: Context<T>) => T;
