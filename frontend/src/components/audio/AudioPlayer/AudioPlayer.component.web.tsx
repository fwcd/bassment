import { AudioPlayerProps } from '@bassment/components/audio/AudioPlayer/AudioPlayer.props';
import React, { createRef, useCallback, useEffect } from 'react';

export function AudioPlayer({
  isPlayingRequested,
  url,
  seekMs,
  onUpdatePlaying,
  onUpdateElapsedMs,
  onUpdateTotalMs,
  onEnded,
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

  // Update play/pause state when requested
  useEffect(() => {
    if (isPlayingRequested !== undefined) {
      if (isPlayingRequested && url) {
        elementRef.current?.play();
      } else {
        elementRef.current?.pause();
      }
    }
  }, [elementRef, isPlayingRequested, url]);

  // Seek to position if it changes
  useEffect(() => {
    if (elementRef.current && seekMs !== undefined) {
      elementRef.current.currentTime = seekMs / 1000;
    }
  }, [elementRef, seekMs]);

  const onTimeUpdate = useCallback(() => {
    if (onUpdateElapsedMs && elementRef.current) {
      onUpdateElapsedMs(elementRef.current.currentTime * 1000);
    }
  }, [elementRef, onUpdateElapsedMs]);

  const onPlay = useCallback(() => {
    if (onUpdatePlaying && elementRef.current) {
      onUpdatePlaying(true);
    }
  }, [elementRef, onUpdatePlaying]);

  const onPause = useCallback(() => {
    if (onUpdatePlaying && elementRef.current) {
      onUpdatePlaying(false);
    }
  }, [elementRef, onUpdatePlaying]);

  return (
    <audio
      src={url}
      ref={elementRef}
      onTimeUpdate={onTimeUpdate}
      onPlay={onPlay}
      onPause={onPause}
      onEnded={onEnded}
    />
  );
}
