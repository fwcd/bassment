import { TracksView } from '@bassment/components/data/TracksView';
import { DropZone } from '@bassment/components/input/DropZone';
import { AudioPlayerContext } from '@bassment/contexts/AudioPlayer';
import React, { useContext } from 'react';

export function QueueScreen() {
  const player = useContext(AudioPlayerContext);
  const tracks = player.queue?.tracks ?? [];

  return <TracksView tracks={tracks} />;
}
