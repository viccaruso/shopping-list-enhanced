import { createContext, useContext, useReducer } from 'react';

const startingState = [
  { id: 1, item: 'Cheez Whiz', complete: false },
  { id: 2, item: 'Kraft American Singles', complete: false },
  { id: 3, item: 'Velveeta', complete: true },
];

function listReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return [
        ...state,
        { id: Date.now(), item: action.payload.item, complete: false },
      ];
    case 'TOGGLE_COMPLETE':
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, complete: action.payload.complete };
        }
        return item;
      });
    case 'CLEAR_LIST':
      return [];
    default:
      throw new Error('Invalid action performed in list reducer');
  }
}

export const ListContext = createContext();

export function ListProvider({ children }) {
  const [listState, dispatch] = useReducer(listReducer, startingState);

  function handleAddItem(item) {
    dispatch({
      type: 'ADD_ITEM',
      payload: { item },
    });
  }

  function handleToggleComplete(id, boolean) {
    dispatch({
      type: 'TOGGLE_COMPLETE',
      payload: { id, complete: boolean },
    });
  }

  function handleClearList() {
    dispatch({
      type: 'CLEAR_LIST',
    });
  }

  return (
    <ListContext.Provider
      value={{
        handleAddItem,
        handleToggleComplete,
        handleClearList,
        listState,
      }}
    >
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
