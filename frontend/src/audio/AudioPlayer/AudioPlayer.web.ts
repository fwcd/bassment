/** A web implementation of an audio playing using the Web Audio API. */
export class AudioPlayer {
  private readonly audioCtx: AudioContext;
  private buffer?: AudioBuffer;
  private bufferSrc?: AudioBufferSourceNode;
  private startTime?: number;
  private seekMs: number = 0;
  private _isPlaying: boolean = false;

  constructor() {
    this.audioCtx = new AudioContext();
  }

  get isPlaying(): boolean {
    return this._isPlaying;
  }

  async setPlaying(isPlaying: boolean): Promise<void> {
    const buffer = this.buffer;

    if (buffer) {
      this.bufferSrc?.disconnect();

      if (isPlaying) {
        const bufferSrc = this.audioCtx.createBufferSource();
        bufferSrc.buffer = buffer;
        bufferSrc.start(0, this.seekMs / 1000);
        bufferSrc.connect(this.audioCtx.destination);
        this.startTime = this.audioCtx.currentTime;
        this.bufferSrc = bufferSrc;
      } else {
        if (this.startTime) {
          this.seekMs += (this.audioCtx.currentTime - this.startTime) * 1000;
        }
        this.startTime = undefined;
        this.bufferSrc = undefined;
      }

      this._isPlaying = isPlaying;
    }
  }

  /** Seeks to the given position. */
  async seek(elapsedMs: number): Promise<void> {
    this.seekMs = elapsedMs;
    this.setPlaying(this._isPlaying);
  }

  /** Sets the audio data to be played. */
  setBuffer(buffer?: ArrayBuffer): Promise<void> {
    return new Promise((resolve, reject) => {
      this.bufferSrc?.disconnect();
      this._isPlaying = false;
      this.seekMs = 0;

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
    this.bufferSrc?.addEventListener('ended', () => {
      listener(/* isPlaying */ false);
    });
  }
}
