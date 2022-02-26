import React, { useEffect, useReducer } from 'react';
import { ItemType } from './App';
import SelectableItem from './SelectableItem';
import selectedReducer from './selectedReducer';

type Props = {
  items: Array<ItemType>;
};

const ItemSelector = ({ items }: Props) => {
  const [selectedItems, dispatchSelectedItems] = useReducer(
    selectedReducer,
    []
  );

  useEffect(() => {
    dispatchSelectedItems({ command: 'update', payload: { items } });
  }, [items]);

  console.log('selected:');
  selectedItems.forEach((item) => console.log(item));

  return (
    <React.Fragment>
      <h2>Select the elements</h2>
      {items.map((item) => {
        const some = selectedItems.find(
          (selectedItem) => selectedItem.name === item.name
        );
        return (
          <SelectableItem
            item={item}
            dispatch={dispatchSelectedItems}
            info={{ selected: !!some, count: some?.count ?? 1 }}
          />
        );
      })}
    </React.Fragment>
  );
};

export default ItemSelector;
