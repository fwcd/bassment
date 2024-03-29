import { AudioPlayerProps } from '@bassment/components/audio/AudioPlayer/AudioPlayer.props';
import React, { createRef, useCallback, useEffect } from 'react';

export function AudioPlayer({
  isPlayingRequested,
  track,
  url,
  seekMs,
  onRequestPlaying,
  onRequestBack,
  onRequestForward,
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

  // Update now playing info via Media Session API
  // TODO: Artwork
  useEffect(() => {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track?.title,
      artist: track?.artists.map(a => a.name).join(', '),
      album: track?.albums.map(a => a.name).join(', '),
    });
  }, [track]);

  // TODO: Update progress info via Media Session API

  // Set up hooks for responding to control updates via the Media Session API
  useEffect(() => {
    navigator.mediaSession.setActionHandler('play', () => {
      if (onRequestPlaying) {
        onRequestPlaying(true);
      }
    });
    navigator.mediaSession.setActionHandler('pause', () => {
      if (onRequestPlaying) {
        onRequestPlaying(false);
      }
    });
    navigator.mediaSession.setActionHandler('nexttrack', () => {
      if (onRequestForward) {
        onRequestForward();
      }
    });
    navigator.mediaSession.setActionHandler('previoustrack', () => {
      if (onRequestBack) {
        onRequestBack();
      }
    });
  }, [onRequestPlaying, onRequestForward, onRequestBack]);

  // Handle updates from the <audio> player itself
  // (e.g. if the user manipulates the controls directly through the browser)
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
