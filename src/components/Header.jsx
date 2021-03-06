import React from 'react';
import { useList } from '../context/ListContext';

export default function Header() {
  const { listState, handleClearList } = useList();

  return (
    <header>
      <h1>Shopping List</h1>
      <div>
        <p>{`You have ${listState.length} items in your shopping list.`}</p>
        <button type="button" onClick={handleClearList}>
          Clear list
        </button>
      </div>
    </header>
  );
}
