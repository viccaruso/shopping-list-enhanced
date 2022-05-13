import { createContext, useContext, useReducer } from 'react';

const startingState = [
  { id: 1, item: 'Cheez Whiz' },
  { id: 2, item: 'Kraft American Singles' },
  { id: 3, item: 'Velveeta' },
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
  const [listState, dispatch] = useReducer(listReducer, startingState);

  function handleAddItem(item) {
    console.log('Dispatching ADD_ITEM');
    dispatch({
      type: 'ADD_ITEM',
      payload: { item },
    });
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
