import { SidebarNavigatorParams } from '@bassment/AppContainer';
import { TracksView } from '@bassment/components/data/TracksView';
import { ApiContext } from '@bassment/contexts/Api';
import { AnnotatedTrack } from '@bassment/models/Track';
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useState } from 'react';

export function PlaylistScreen() {
  const route: RouteProp<SidebarNavigatorParams, 'playlist'> = useRoute();

  const api = useContext(ApiContext);
  const [tracks, setTracks] = useState<AnnotatedTrack[]>([]);

  const updateTracks = useCallback(async () => {
    setTracks(await api.getAnnotatedPlaylistTracks(route.params.id));
  }, [api, route.params.id]);

  // Update the tracks on the initial render
  useEffect(() => {
    updateTracks();
  }, [updateTracks]);

  return <TracksView tracks={tracks} updateTracks={updateTracks} />;
}
