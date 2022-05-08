export interface PartialGenre {
  id?: number;
  name?: string;
}

export interface Genre extends PartialGenre {
  description?: string | null;
}
