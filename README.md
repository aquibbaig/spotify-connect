# spotify-connect

Integrate Spotify analytics into your React application to provide real-time analytics.
This guide demonstrates how to use the Spotify API to retrieve and parse data on the currently playing track in your React or React Server Components application.

## Currently supported APIs
- **Currently Playing Track API:** Retrieve information about the track currently being played by a Spotify user. 
  - Endpoint: [https://api.spotify.com/v1/me/player/currently-playing](https://api.spotify.com/v1/me/player/currently-playing)

## Requirements
To get started, you'll need the following:

- **client_id:** Spotify app client ID
- **client_secret:** Spotify app client secret
- **refresh_token:** Spotify app refresh token. You can generate one as explained in various articles on the web. [Example](https://medium.com/@benwiz/how-to-create-a-spotify-refresh-token-the-easy-way-b41a66c7fdd4)

## Available Response Data Parsing Methods
The response from the Spotify API can be parsed using the following method:

```javascript
parseCurrentlyPlayingTrack(data)

Returns:
{
  track: {
    id: item.id,
    name: item.name,
    artist: item.artists,
    album: item.album.name,
    image: item.album.images[0].url,
    duration: item.duration_ms,
    progress: progress_ms,
    uri: item.uri,
  },
  timestamp,
}
```

## Usage
1. In the root of your application or wherever you want to use spotify-connect utilities, import the `SpotifyConnectContextProvider`.
```javascript
<SpotifyConnectContextProvider
  clientId={SPOTIFY_CLIENT_ID}
  clientSecret={SPOTIFY_CLIENT_SECRET}
  refreshToken={SPOTIFY_REFRESH_TOKEN}
>
```

2. Now you can use the utilities in your components as follows.
```javascript
  const { data } = useCurrentlyPlaying()

  options: {
    refetchInterval: (milliseconds, default = 5000 or 5seconds)
  }
```
