import React from 'react';
import { useList } from '../context/ListContext';

export default function Header() {
  const { listState } = useList();

  return (
    <header>
      <h1>Shopping List</h1>
      <div>
        <p>{`You have ${listState.length} items in your shopping list.`}</p>
        <button>Clear list</button>
      </div>
    </header>
  );
}
