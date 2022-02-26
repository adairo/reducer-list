import React, { useReducer } from 'react';
import ItemList from './ItemList';
import itemReducer from './itemReducer';
import ItemSelector from './ItemSelector';

export interface ItemType {
  name: string;
}

const App = () => {
  const [items, dispatchItems] = useReducer(itemReducer, []);
  return (
    <React.Fragment>
      <ItemList items={items} dispatchItems={dispatchItems} />
      <ItemSelector items={items} />
    </React.Fragment>
  );
};

export default App;
