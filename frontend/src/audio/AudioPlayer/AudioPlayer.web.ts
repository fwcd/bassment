/** A web implementation of an audio playing using the Web Audio API. */
export class AudioPlayer {
  private readonly audioCtx: AudioContext;

  private buffer?: AudioBuffer;
  private bufferSrc?: AudioBufferSourceNode;

  private startTime?: number;
  private startMs: number = 0;
  private _isPlaying: boolean = false;

  private listeners: ((isPlaying: boolean) => void)[] = [];
  private endEventListener = () => {
    this._isPlaying = false;
    for (const listener of this.listeners) {
      listener(this._isPlaying);
    }
  };

  constructor() {
    this.audioCtx = new AudioContext();
  }

  get isPlaying(): boolean {
    return this._isPlaying;
  }

  get elapsedMs(): number {
    if (this.startTime) {
      return this.startMs + (this.audioCtx.currentTime - this.startTime) * 1000;
    } else {
      return this.startMs;
    }
  }

  get totalMs(): number {
    return (this.buffer?.duration ?? 0) * 1000;
  }

  async setPlaying(isPlaying: boolean): Promise<void> {
    const buffer = this.buffer;

    if (buffer) {
      this.bufferSrc?.removeEventListener('ended', this.endEventListener);
      this.bufferSrc?.disconnect();

      if (isPlaying) {
        const bufferSrc = this.audioCtx.createBufferSource();
        bufferSrc.buffer = buffer;
        bufferSrc.start(0, this.startMs / 1000);
        bufferSrc.connect(this.audioCtx.destination);
        bufferSrc.addEventListener('ended', this.endEventListener);
        this.startTime = this.audioCtx.currentTime;
        this.bufferSrc = bufferSrc;
      } else {
        this.startMs = this.elapsedMs;
        this.startTime = undefined;
        this.bufferSrc = undefined;
      }

      this._isPlaying = isPlaying;
    }
  }

  /** Seeks to the given position. */
  async seek(elapsedMs: number): Promise<void> {
    this.startMs = elapsedMs;
    this.setPlaying(this._isPlaying);
  }

  /** Sets the audio data to be played. */
  setBuffer(buffer?: ArrayBuffer): Promise<void> {
    return new Promise((resolve, reject) => {
      this.bufferSrc?.disconnect();
      this._isPlaying = false;
      this.startMs = 0;

      if (buffer) {
        this.audioCtx.decodeAudioData(
          buffer,
          audioBuffer => {
            this.buffer = audioBuffer;
            resolve();
          },
          error => {
            reject(error);
          },
        );
      } else {
        this.buffer = undefined;
        resolve();
      }
    });
  }

  /** Adds a listener for playback state. */
  addPlayingListener(listener: (isPlaying: boolean) => void): void {
    this.listeners.push(listener);
  }
}
