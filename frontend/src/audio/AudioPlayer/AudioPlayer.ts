/**
 * A facility for managing audio playback (will be replaced
 * by the platform-specific implementation e.g. in *.web.ts).
 */
export class AudioPlayer {
  /** Whether playback is running. */
  readonly isPlaying: boolean = false;
  /** The elapsed milliseconds. */
  readonly elapsedMs: number = 0;

  /** Controls whether playback should be running. */
  async setPlaying(_isPlaying: boolean): Promise<void> {
    console.warn('Setting isPlaying is not supported!');
  }

  /** Seeks to the given position. */
  async seek(_elapsedMs: number): Promise<void> {
    console.warn('Seeking is not supported!');
  }

  /** Sets the audio data to be played. */
  async setBuffer(_buffer?: ArrayBuffer): Promise<void> {
    console.warn('Setting buffer is not supported!');
  }

  /** Adds a listener for playback state. */
  addPlayingListener(_listener: (isPlaying: boolean) => void): void {
    console.warn('Adding playing listener is not supported!');
  }
}
