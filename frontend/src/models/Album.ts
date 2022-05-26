export interface PartialAlbum {
  id: number;
  name: string;
}

export interface Album extends PartialAlbum {
  coverArtId: number | null;
  description: string | null;
}
