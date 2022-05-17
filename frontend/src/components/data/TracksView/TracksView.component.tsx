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
          [
            `${track.id}`,
            track.title,
            ...track.artists.map(a => a.name),
            ...track.albums.map(a => a.name),
            ...track.tags.map(t => t.value),
            track.comment,
            track.year,
          ].some(v =>
            v
              ? v.toLowerCase().includes(searchText.toLowerCase().trim())
              : false,
          ),
        )
      : tracks;

  // TODO: Other view on mobile
  return <TrackTable tracks={filteredTracks} onPlay={player.play} />;
}
