import * as React from 'react';
import { ItemType } from './App';
import { ActionType } from './itemReducer';

type Props = {
  items: ItemType[];
  dispatchItems: React.Dispatch<ActionType>;
};

const ItemList: React.FC<Props> = (props) => {
  const [itemName, setItemName] = React.useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.dispatchItems({
      command: 'add',
      payload: { item: { name: itemName } },
    });
    setItemName('');
  };

  const handleDelete = (name: string) => {
    props.dispatchItems({
      command: 'remove',
      payload: { name },
    });
  };

  return (
    <React.Fragment>
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
      <form onSubmit={(e) => handleSubmit(e)}>
        <input value={itemName} onChange={(e) => setItemName(e.target.value)} />
        <button>Create</button>
      </form>
    </React.Fragment>
  );
};

export default ItemList;
