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
  updateTracks?: () => void;
}

export function TracksView({ tracks, updateTracks }: TracksViewProps) {
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
        if (drop.kind === 'file' && drop.file) {
          await api.uploadAutotaggedTrack(drop.file);
        }
      }
      if (updateTracks) {
        updateTracks();
      }
    },
    [api, updateTracks],
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
