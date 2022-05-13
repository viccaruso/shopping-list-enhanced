import { createContext, useContext, useReducer } from 'react';

const listState = [
  { id: Date.now(), item: 'Cheez Whiz' },
  { id: Date.now(), item: 'Kraft American Singles' },
  { id: Date.now(), item: 'Velveeta' },
];

function listReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return [...state, { id: Date.now(), item: action.payload.item }];
    default:
      throw new Error('Invalid action performed in list reducer');
  }
}

export const ListContext = createContext();

export function ListProvider({ children }) {
  const [state, dispatch] = useReducer(listReducer, listState);

  function handleAddItem(item) {
    dispatch({
      type: 'ADD_ITEM',
      payload: item,
    });
    console.log(state);
  }

  return (
    <ListContext.Provider value={{ handleAddItem, listState }}>
      {children}
    </ListContext.Provider>
  );
}

export function useList() {
  const context = useContext(ListContext);

  if (context === undefined) {
    throw new Error('useList must be used within a ListProvider');
  }

  return context;
}
