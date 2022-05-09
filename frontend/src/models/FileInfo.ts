export enum FileKind {
  Generic = 'generic',
  Audio = 'audio',
  CoverArt = 'coverArt',
}

export interface PartialFileInfo {
  id?: number;
  name?: string;
  mediaType?: string;
}

export interface FileInfo {
  kind?: FileKind;
}
