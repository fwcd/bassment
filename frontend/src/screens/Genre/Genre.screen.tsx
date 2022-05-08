import { SidebarNavigatorParams } from '@bassment/AppContainer';
import { TracksView } from '@bassment/components/data/TracksView';
import { ApiContext } from '@bassment/contexts/Api';
import { AnnotatedTrack } from '@bassment/models/Track';
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useState } from 'react';

export function ArtistScreen() {
  const route: RouteProp<SidebarNavigatorParams, 'artist'> = useRoute();

  const api = useContext(ApiContext);
  const [tracks, setTracks] = useState<AnnotatedTrack[]>([]);

  const updateTracks = useCallback(async () => {
    // TODO
  }, []);

  // Update the tracks on the initial render
  useEffect(() => {
    updateTracks();
  }, [updateTracks]);

  return <TracksView tracks={tracks} />;
}
