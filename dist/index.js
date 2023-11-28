var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  SpotifyConnectContextProvider: () => SpotifyConnectContextProvider,
  parseCurrentlyPlayingTrack: () => parseCurrentlyPlayingTrack,
  useCurrentlyPlaying: () => useCurrentlyPlaying
});
module.exports = __toCommonJS(src_exports);

// src/constants.ts
var currentlyPlayingEndpoint = `https://api.spotify.com/v1/me/player/currently-playing`;
var apiTokenEndpoint = `https://accounts.spotify.com/api/token`;
var queryRefetchInterval = 10 * 1e3;
var parseCurrentlyPlayingTrack = (data) => {
  if (!data || !data.item) {
    return {
      track: null,
      timestamp: null,
      is_playing: false
    };
  }
  const { item, progress_ms, timestamp } = data;
  return {
    track: {
      id: item.id,
      name: item.name,
      artist: item.artists,
      album: item.album.name,
      image: item.album.images[0].url,
      duration: item.duration_ms,
      progress: progress_ms,
      uri: item.uri
    },
    timestamp,
    is_playing: true
  };
};

// src/context/SpotifyConnect.context.tsx
var import_react = require("react");
var import_react_query = require("react-query");
var import_jsx_runtime = require("react/jsx-runtime");
var SpotifyConnectContext = (0, import_react.createContext)({
  clientId: "",
  clientSecret: "",
  refreshToken: ""
});
var SpotifyConnectContextProvider = ({
  children,
  clientId,
  clientSecret,
  refreshToken
}) => {
  const queryClient = new import_react_query.QueryClient();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_query.QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    SpotifyConnectContext.Provider,
    {
      value: {
        clientId,
        clientSecret,
        refreshToken
      },
      children
    }
  ) });
};

// src/hooks/useCurrentlyPlaying.ts
var querystring = __toESM(require("querystring"));
var import_react2 = require("react");
var import_react_query2 = require("react-query");
var useContextWithError = (context) => {
  const contextValue = (0, import_react2.useContext)(context);
  if (!contextValue) {
    throw new Error(
      `useCurrentlyPlaying must be used within a SpotifyConnectContextProvider`
    );
  }
  return contextValue;
};
var useCurrentlyPlaying = (refetchInterval = queryRefetchInterval) => {
  const { clientId, clientSecret, refreshToken } = useContextWithError(
    SpotifyConnectContext
  );
  const [accessToken, setAccessToken] = (0, import_react2.useState)();
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const getAccessToken = (0, import_react2.useCallback)(async () => {
    const response = await fetch(apiTokenEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: querystring.stringify({
        grant_type: "refresh_token",
        refresh_token: refreshToken
      })
    });
    if (response.status === 401) {
      throw new Error("Invalid refresh token");
    }
    return response.json();
  }, []);
  return (0, import_react_query2.useQuery)(
    ["currently-playing"],
    async () => {
      const fetchCurrentlyPlaying = async ({
        accessToken: accessToken2
      }) => {
        const response = await fetch(currentlyPlayingEndpoint, {
          headers: {
            Authorization: `Bearer ${accessToken2}`
          }
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
      retry: false
    }
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SpotifyConnectContextProvider,
  parseCurrentlyPlayingTrack,
  useCurrentlyPlaying
});
//# sourceMappingURL=index.js.map