import { TracksView } from '@bassment/components/data/TracksView';
import { ApiContext } from '@bassment/contexts/Api';
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

  return <TracksView tracks={tracks} updateTracks={updateTracks} />;
}
