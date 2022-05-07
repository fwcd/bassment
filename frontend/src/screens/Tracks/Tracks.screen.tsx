import { TrackTable } from '@bassment/components/data/TrackTable';
import { ApiContext } from '@bassment/contexts/Api';
import { Track } from '@bassment/models/Track';
import React, { useCallback, useContext, useEffect, useState } from 'react';

export function TracksScreen() {
  const api = useContext(ApiContext);
  const [tracks, setTracks] = useState<Track[]>([]);

  const updateTracks = useCallback(async () => {
    setTracks(await api.getTracks());
  }, [api]);

  // Update the tracks on the initial render
  useEffect(() => {
    updateTracks();
  }, [updateTracks]);

  return <TrackTable tracks={tracks} />;
}
