import { TrackTable } from '@bassment/components/data/TrackTable';
import { AudioPlayerContext } from '@bassment/contexts/AudioPlayer';
import { SearchContext } from '@bassment/contexts/Search';
import { AnnotatedTrack } from '@bassment/models/Track';
import React, { useContext } from 'react';

interface TracksViewProps {
  tracks: AnnotatedTrack[];
}

export function TracksView({ tracks }: TracksViewProps) {
  const { searchText } = useContext(SearchContext);
  const player = useContext(AudioPlayerContext);

  // TODO: Other view on mobile
  return (
    <TrackTable tracks={tracks} filter={searchText} onPlay={player.play} />
  );
}
