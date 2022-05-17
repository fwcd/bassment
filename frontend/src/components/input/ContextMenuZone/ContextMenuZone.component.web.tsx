import { Clickable } from '@bassment/components/input/Clickable';
import { ContextMenuZoneProps } from '@bassment/components/input/ContextMenuZone/ContextMenuZone.props';
import { envConstants } from '@bassment/constants/env';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
  renderers,
} from 'react-native-popup-menu';

export function ContextMenuZone({ options, children }: ContextMenuZoneProps) {
  const [isOpen, setOpen] = useState(false);

  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <View>
      <Clickable onContextMenu={open}>{children}</Clickable>
      <Menu opened={isOpen} onSelect={close} onBackdropPress={close}>
        <MenuTrigger />
        <MenuOptions>
          {options.map(option => (
            <MenuOption onSelect={option.onSelect} text={option.label} />
          ))}
        </MenuOptions>
      </Menu>
    </View>
  );
}
