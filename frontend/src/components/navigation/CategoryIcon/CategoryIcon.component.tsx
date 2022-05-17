import { ThemedIcon } from '@bassment/components/display/ThemedIcon';
import { Category } from '@bassment/models/Category';
import React from 'react';

interface CategoryIconProps {
  category?: Category;
  size?: number;
  color?: string;
}

export function CategoryIcon({ category, size, color }: CategoryIconProps) {
  let iconName: string;

  switch (category?.key) {
    case 'genre':
      iconName = 'star-outline';
      break;
    case 'mood':
      iconName = 'moon-outline';
      break;
    default:
      iconName = 'pricetags-outline';
      break;
  }

  return <ThemedIcon name={iconName} size={size} color={color} />;
}
