import { TracksView } from '@bassment/components/data/TracksView';
import { AudioPlayerContext } from '@bassment/contexts/AudioPlayer';
import React, { useContext } from 'react';

export function HistoryScreen() {
  const player = useContext(AudioPlayerContext);
  const tracks = [...(player.queue?.history ?? [])].reverse();

  return <TracksView tracks={tracks} />;
}
