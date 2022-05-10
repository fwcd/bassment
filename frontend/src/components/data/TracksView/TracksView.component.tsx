import { TrackTable } from '@bassment/components/data/TrackTable';
import { Dropzone } from '@bassment/components/input/Dropzone';
import { ApiContext } from '@bassment/contexts/Api';
import { AudioPlayerContext } from '@bassment/contexts/AudioPlayer';
import { SearchContext } from '@bassment/contexts/Search';
import { Drop } from '@bassment/models/Drop';
import { AnnotatedTrack } from '@bassment/models/Track';
import React, { useCallback, useContext } from 'react';

interface TracksViewProps {
  tracks: AnnotatedTrack[];
}

export function TracksView({ tracks }: TracksViewProps) {
  const { searchText } = useContext(SearchContext);
  const api = useContext(ApiContext);
  const player = useContext(AudioPlayerContext);

  const filterDrop = useCallback(
    (drops: Drop[]) => drops.some(d => d.kind === 'file'),
    [],
  );

  const onDrop = useCallback(
    async (drops: Drop[]) => {
      for (const drop of drops) {
        if (drop.kind === 'file') {
          await api.uploadAutotaggedTrack(drop.name!, drop.content!);
        }
      }
      // TODO: Trigger refresh of tracks?
    },
    [api],
  );

  // TODO: Other view on mobile
  return (
    <Dropzone
      label="Drop tracks to upload!"
      filterDrop={filterDrop}
      onDrop={onDrop}>
      <TrackTable tracks={tracks} filter={searchText} onPlay={player.play} />
    </Dropzone>
  );
}
