import React, { useEffect, useReducer } from 'react';
import { ItemType } from './App';
import SelectableItem from './SelectableItem';
import selectedReducer from './selectedReducer';

type Props = {
  items: Array<ItemType>;
};

const ItemSelector = ({ items }: Props) => {
  // List of selected items, not only the already selected items are shown.
  // We keep a reference to every item that has been selected at any time, so we
  // can have a record of the previous *count* value and a *selected* indicator
  const [selectedItems, dispatchSelectedItems] = useReducer(
    selectedReducer,
    []
  );

  // When the list of items is updated (when an item was created or removed) we
  // update the selectedItems to only keep references to current items
  useEffect(() => {
    dispatchSelectedItems({ command: 'update', payload: { items } });
  }, [items]);

  return (
    <React.Fragment>
      <h2>Select items</h2>
      {items.map((item) => {
        // Look if this item already exist on our selectedItems
        const existent = selectedItems.find(
          (selectedItem) => selectedItem.name === item.name
        );
        return (
          // Item with the capability of being quantified and selected
          <SelectableItem
            item={item}
            dispatch={dispatchSelectedItems}
            info={{
              // We provide default values to only track the items that we care
              selected: existent?.selected ?? false,
              count: existent?.count ?? 1,
            }}
          />
        );
      })}
    </React.Fragment>
  );
};

export default ItemSelector;
