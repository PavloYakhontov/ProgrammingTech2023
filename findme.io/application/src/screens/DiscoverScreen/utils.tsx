import { CONSTANTS } from '@utils/constants/strings';
import React from 'react';

const numOfColumns = CONSTANTS.matchesNumOfColumns;

export const renderColumnsInSection = <T extends object>(Item: (model: T) => JSX.Element, Block: (items: Array<JSX.Element>) => JSX.Element) =>
  ({ item, index, section }: { item: any; index: number; section: any }) => {
    if (index % numOfColumns !== 0) return null;

    const items: Array<JSX.Element> = [];

    for (let i = index; i < index + numOfColumns; i++) {
      if (i >= section.data.length) {
        break;
      }

      items.push(Item(item));
    }
    return Block(items);
  };
