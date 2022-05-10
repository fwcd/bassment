import { AudioPlayerProps } from '@bassment/components/audio/AudioPlayer/AudioPlayer.props';
import React, { createRef, useCallback, useEffect } from 'react';

export function AudioPlayer({
  isPlaying,
  url,
  onUpdatePlaying,
  onUpdateElapsedMs,
  onUpdateTotalMs,
}: AudioPlayerProps) {
  const elementRef = createRef<HTMLAudioElement>();

  useEffect(() => {
    if (
      onUpdateTotalMs &&
      elementRef.current &&
      !isNaN(elementRef.current.duration)
    ) {
      onUpdateTotalMs(elementRef.current.duration * 1000);
    }
  }, [elementRef, url, onUpdateTotalMs]);

  useEffect(() => {
    if (isPlaying && url) {
      elementRef.current?.play();
    } else {
      elementRef.current?.pause();
    }
  }, [elementRef, isPlaying, url]);

  const onTimeUpdate = useCallback(() => {
    if (onUpdateElapsedMs && elementRef.current) {
      onUpdateElapsedMs(elementRef.current.currentTime * 1000);
    }
  }, [elementRef, onUpdateElapsedMs]);

  const onEnded = useCallback(() => {
    if (onUpdatePlaying && elementRef.current) {
      onUpdatePlaying(false);
    }
  }, [elementRef, onUpdatePlaying]);

  return (
    <audio
      src={url}
      ref={elementRef}
      onTimeUpdate={onTimeUpdate}
      onEnded={onEnded}
    />
  );
}
