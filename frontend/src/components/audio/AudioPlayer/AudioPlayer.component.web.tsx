import { AudioPlayerProps } from '@bassment/components/audio/AudioPlayer/AudioPlayer.props';
import React, { createRef, useEffect } from 'react';

export function AudioPlayer(props: AudioPlayerProps) {
  const elementRef = createRef<HTMLAudioElement>();

  useEffect(() => {
    if (props.isPlaying && props.url) {
      elementRef.current?.play();
    } else {
      elementRef.current?.pause();
    }
  }, [elementRef, props.isPlaying, props.url]);

  return <audio src={props.url} ref={elementRef} />;
}
