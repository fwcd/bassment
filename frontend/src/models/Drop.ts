/** A value transferred via drag-n-drop. */
interface BaseDrop {
  type: string;
}

export interface DropFile {
  name: string;
  size: number;
  content: () => Promise<ArrayBuffer>;
}

export interface FileDrop extends BaseDrop {
  type: 'file';
  files: DropFile[];
}

export interface ItemDrop<D> extends BaseDrop {
  type: 'item';
  items: D[];
}

export type Drop = FileDrop | ItemDrop<any>;
