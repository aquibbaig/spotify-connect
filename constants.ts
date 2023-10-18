import { TCurrentlyPlayingTrack } from './types';

export const currentlyPlayingEndpoint = `https://api.spotify.com/v1/me/player/currently-playing`;
export const apiTokenEndpoint = `https://accounts.spotify.com/api/token`;
export const queryRefetchInterval = 5000;

export const parseCurrentlyPlayingTrack = (data: TCurrentlyPlayingTrack) => {
  if (!data || !data.item) {
    return null;
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
      uri: item.uri,
    },
    timestamp,
  };
};
