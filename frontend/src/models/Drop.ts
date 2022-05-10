/** A value transferred via drag-n-drop. */
interface BaseDrop {
  kind: string;
}

export interface FileDrop extends BaseDrop {
  kind: 'file';
  file?: File;
}

export interface ValueDrop<V> extends BaseDrop {
  kind: 'any';
  value: V;
}

export type Drop = FileDrop | ValueDrop<any>;
