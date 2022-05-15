import { TracksView } from '@bassment/components/data/TracksView';
import { Dropzone } from '@bassment/components/input/Dropzone';
import { ApiContext } from '@bassment/contexts/Api';
import { Drop } from '@bassment/models/Drop';
import { AnnotatedTrack } from '@bassment/models/Track';
import React, { useCallback, useContext, useEffect, useState } from 'react';

export function TracksScreen() {
  const api = useContext(ApiContext);
  const [tracks, setTracks] = useState<AnnotatedTrack[]>([]);

  const updateTracks = useCallback(async () => {
    setTracks(await api.getAnnotatedTracks());
  }, [api]);

  // Update the tracks on the initial render
  useEffect(() => {
    updateTracks();
  }, [updateTracks]);

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
      updateTracks();
    },
    [api, updateTracks],
  );

  return (
    <Dropzone
      stretch
      label="Drop tracks to upload!"
      filterDrop={filterDrop}
      onDrop={onDrop}>
      <TracksView tracks={tracks} />
    </Dropzone>
  );
}
