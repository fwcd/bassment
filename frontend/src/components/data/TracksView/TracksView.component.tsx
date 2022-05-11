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

  const filteredTracks =
    searchText.length > 0
      ? tracks.filter(track =>
          Object.values(track).some(
            v =>
              typeof v === 'string' &&
              v.toLowerCase().includes(searchText.toLowerCase().trim()),
          ),
        )
      : tracks;

  // TODO: Other view on mobile
  return <TrackTable tracks={filteredTracks} onPlay={player.play} />;
}
