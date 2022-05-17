export interface Tag {
  id?: number;
  categoryId?: number;
  value?: string;
  description?: string | null;
  coverArtId?: number | null;
}

export interface KeyedTag {
  id?: number;
  key?: string;
  displayName?: string;
  value?: string;
}
