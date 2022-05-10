import { AudioPlayerProps } from '@bassment/components/audio/AudioPlayer/AudioPlayer.props';
import React, { createRef, useCallback, useEffect } from 'react';

export function AudioPlayer({
  isPlaying,
  url,
  seekMs,
  onUpdatePlaying,
  onUpdateElapsedMs,
  onUpdateTotalMs,
}: AudioPlayerProps) {
  const elementRef = createRef<HTMLAudioElement>();

  // Update duration when track changes
  useEffect(() => {
    if (
      onUpdateTotalMs &&
      elementRef.current &&
      !isNaN(elementRef.current.duration)
    ) {
      onUpdateTotalMs(elementRef.current.duration * 1000);
    }
  }, [elementRef, url, onUpdateTotalMs]);

  // Update play/pause state when isPlaying changes
  useEffect(() => {
    if (isPlaying && url) {
      elementRef.current?.play();
    } else {
      elementRef.current?.pause();
    }
  }, [elementRef, isPlaying, url]);

  // Seek to position if it changes
  useEffect(() => {
    if (elementRef.current && seekMs) {
      elementRef.current.currentTime = seekMs / 1000;
    }
  }, [elementRef, seekMs]);

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
