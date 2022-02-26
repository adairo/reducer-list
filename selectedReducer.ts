import { ItemType } from './App';

export type CountableSelectableItemType = ItemType & {
  count: number;
  selected: boolean;
};

// We should use and id insted of the name of the activity
export type ActionType =
  | { command: 'select'; payload: { itemName: string } }
  | { command: 'unselect'; payload: { itemName: string } }
  | { command: 'modify'; payload: { itemName: string; count: number } }
  | { command: 'update'; payload: { items: ItemType[] } };

const selectedReducer = (
  state: CountableSelectableItemType[],
  action: ActionType
) => {
  switch (action.command) {
    case 'select':
      // Search for that item in the list of selectedItems
      const indexFound = state.findIndex(
        (item) => item.name === action.payload.itemName
      );
      // if we found it, just turn the selected property on
      if (indexFound !== -1) {
        return state.map((item, index) =>
          indexFound === index ? { ...item, selected: true } : item
        );
      }
      // Otherwise just concatenate the new item as selected
      return state.concat({
        name: action.payload.itemName,
        count: 1,
        selected: true,
      });
    case 'unselect':
      // return the items with the specified item with the selected off
      return state.map((item) =>
        item.name === action.payload.itemName
          ? { ...item, selected: false }
          : item
      );
    // modify the count value for an item
    case 'modify':
      return state.map((item) =>
        item.name === action.payload.itemName
          ? { ...item, count: action.payload.count }
          : item
      );
    case 'update':
      // Update to only keep references to existent items
      return state.filter((itemSelected) =>
        action.payload.items.find((item) => item.name === itemSelected.name)
      );
    default:
      return state;
  }
};

export default selectedReducer;
