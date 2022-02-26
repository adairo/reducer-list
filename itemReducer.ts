import { ItemType } from './App';

export type ActionType =
  | { command: 'add'; payload: { item: ItemType } }
  | { command: 'remove'; payload: { name: string } };

const itemReducer = (items: ItemType[], action: ActionType) => {
  switch (action.command) {
    case 'add':
      return [...items, action.payload.item];
    case 'remove':
      console.log(action.payload);
      return items.filter((item) => item.name !== action.payload.name);
    default:
      return [{ name: 'default', count: 0 }];
  }
};

export default itemReducer;
