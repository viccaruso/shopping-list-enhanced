import { useState } from 'react';
import { useList } from '../context/ListContext';

export default function AddItem() {
  const { handleAddItem } = useList();
  const [textContent, setTextContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddItem(textContent);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="New item"
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
        ></input>
        <button type="submit">Add item</button>
      </form>
    </>
  );
}
