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
    case 'UPDATE_ITEM':
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, item: action.payload.item };
        }
        return item;
      });
    case 'DELETE_ITEM':
      return state.filter((item) => item.id !== action.payload.id);
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

  function handleDeleteItem(id) {
    dispatch({
      type: 'DELETE_ITEM',
      payload: { id },
    });
  }

  function handleUpdateItem(id, item) {
    dispatch({
      type: 'UPDATE_ITEM',
      payload: { item, id },
    });
  }

  return (
    <ListContext.Provider
      value={{
        handleAddItem,
        handleToggleComplete,
        handleClearList,
        handleDeleteItem,
        handleUpdateItem,
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
