export enum FileKind {
  Generic = 'generic',
  Audio = 'audio',
  CoverArt = 'coverArt',
}

export interface FileInfo {
  id?: number;
  kind?: FileKind;
  name?: string;
  mediaType?: string;
}
