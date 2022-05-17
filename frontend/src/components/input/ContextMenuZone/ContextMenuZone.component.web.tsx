import { Clickable } from '@bassment/components/input/Clickable';
import { ContextMenuZoneProps } from '@bassment/components/input/ContextMenuZone/ContextMenuZone.props';
import React, { useCallback, useState } from 'react';
import { Menu, MenuOptions, MenuOption } from 'react-native-popup-menu';

export function ContextMenuZone({ options, children }: ContextMenuZoneProps) {
  const [isOpen, setOpen] = useState(false);

  const onContextMenu = useCallback(() => setOpen(true), []);

  return (
    <Clickable onContextMenu={onContextMenu}>
      {children}
      <Menu opened={isOpen}>
        <MenuOptions>
          {options.map(option => (
            <MenuOption onSelect={option.onSelect} text={option.label} />
          ))}
        </MenuOptions>
      </Menu>
    </Clickable>
  );
}
