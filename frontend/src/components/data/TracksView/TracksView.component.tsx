import { TrackTable } from '@bassment/components/data/TrackTable';
import { SearchContext } from '@bassment/contexts/Search';
import { AnnotatedTrack } from '@bassment/models/Track';
import React, { useContext } from 'react';

interface TracksViewProps {
  tracks: AnnotatedTrack[];
}

export function TracksView(props: TracksViewProps) {
  const { searchText } = useContext(SearchContext);

  // TODO: Other view on mobile
  return <TrackTable tracks={props.tracks} filter={searchText} />;
}
