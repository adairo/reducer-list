import { ItemType } from './App';

export type CountableItemType = ItemType & { count: number };

export type ActionType =
  | { command: 'select'; payload: { item: CountableItemType } }
  | { command: 'unselect'; payload: { itemName: string } }
  | { command: 'modify'; payload: { itemName: string; count: number } }
  | { command: 'update'; payload: { items: ItemType[] } };

const selectedReducer = (state: CountableItemType[], action: ActionType) => {
  switch (action.command) {
    case 'select':
      return state.concat(action.payload.item);
    case 'unselect':
      return state.filter((item) => item.name !== action.payload.itemName);
    case 'modify':
      return state.map((item) =>
        item.name === action.payload.itemName
          ? { ...item, count: action.payload.count }
          : item
      );
    case 'update':
      return state.filter((itemSelected) =>
        action.payload.items.find((item) => item.name === itemSelected.name)
      );
    default:
      return state;
  }
};

export default selectedReducer;
