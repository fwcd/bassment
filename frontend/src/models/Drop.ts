/** A value transferred via drag-n-drop. */
interface BaseDrop {
  kind: string;
}

export interface FileDrop extends BaseDrop {
  kind: 'file';
  name?: string;
  size?: number;
  content?: ArrayBuffer;
}

export interface ValueDrop<V> extends BaseDrop {
  kind: 'any';
  value: V;
}

export type Drop = FileDrop | ValueDrop<any>;
