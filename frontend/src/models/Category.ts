import { Tag } from '@bassment/models/Tag';

export interface Category {
  id: number;
  key: string;
  displayName: string;
  predefined: boolean;
  hidden: boolean;
  description: string | null;
}

export interface CategoryTreeNode extends Category {
  children: CategoryTreeNode[];
  tags: Tag[];
}
