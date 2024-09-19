import { TCurrentTrack, TParsedCurrentTrack } from './types';

export const currentTrackEndpoint = `https://api.spotify.com/v1/me/player/currently-playing`;
export const apiTokenEndpoint = `https://accounts.spotify.com/api/token`;
export const queryRefetchInterval = 10*1000;

export const parseCurrentTrack = (data: TCurrentTrack | undefined): TParsedCurrentTrack => {
  if (!data || !data.item) {
    return {
      track: null,
      timestamp: null,
      is_playing: false,
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
      uri: item.uri,
    },
    timestamp,
    is_playing: true,
  };
};
