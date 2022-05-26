export interface PartialArtist {
  id: number;
  name: string;
}

export interface Artist extends PartialArtist {
  coverArtId: number | null;
  description: string | null;
}
