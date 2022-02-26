import React, { useRef, useState } from 'react';
import { ItemType } from './App';
import { ActionType } from './selectedReducer';

type Props = {
  item: ItemType;
  info: { selected: boolean; count: number };
  dispatch: React.Dispatch<ActionType>;
};

const SelectableItem = ({ item, info, dispatch }: Props) => {
  // Commands to select or unselect items from selectedItems
  const handleSelect = (checked: boolean) => {
    if (checked) {
      dispatch({
        command: 'select',
        payload: {
          itemName: item.name,
        },
      });
    } else {
      dispatch({ command: 'unselect', payload: { itemName: item.name } });
    }
  };

  // Command to modify the *count* property of the item
  const handleQuantity = (quantity: number) => {
    dispatch({
      command: 'modify',
      payload: {
        itemName: item.name,
        count: quantity,
      },
    });
  };

  return (
    <div
      className="item-selectable"
      style={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <div style={{ flex: 1 }}>{item.name}</div>
      <input
        type="checkbox"
        // Important to use a prop as checked
        checked={info.selected}
        onChange={(e) => handleSelect(e.target.checked)}
      />
      <input
        type="number"
        // Important to use a prop as value
        value={info.count}
        onChange={(e) => handleQuantity(Number(e.target.value))}
        min="1"
        style={{ maxWidth: '3rem' }}
      />
    </div>
  );
};

export default SelectableItem;
