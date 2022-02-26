import * as React from 'react';
import { ItemType } from './App';
import { ActionType } from './itemReducer';

type Props = {
  items: ItemType[];
  dispatchItems: React.Dispatch<ActionType>;
};

const ItemList: React.FC<Props> = (props) => {
  // Name of the new item
  const [itemName, setItemName] = React.useState<string>('');

  // Command to create new item
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.dispatchItems({
      command: 'add',
      payload: { item: { name: itemName } },
    });
    setItemName('');
  };

  // Command to delete an existent item
  const handleDelete = (name: string) => {
    props.dispatchItems({
      command: 'remove',
      payload: { name },
    });
  };

  return (
    <React.Fragment>
      <h2>Create items</h2>
      {/* List of items*/}
      {props.items.map((item) => (
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '0.5rem',
            justifyContent: 'space-between',
          }}
        >
          <div>{item.name}</div>
          <button onClick={(e) => handleDelete(item.name)}>eliminar</button>
        </div>
      ))}
      {/* Form to create new Items*/}
      <form onSubmit={(e) => handleSubmit(e)}>
        <input value={itemName} onChange={(e) => setItemName(e.target.value)} />
        <button>Create</button>
      </form>
    </React.Fragment>
  );
};

export default ItemList;
