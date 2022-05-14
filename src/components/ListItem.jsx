import { useState } from 'react';
import { useList } from '../context/ListContext';

export default function ListItem({ item }) {
  const [isChecked, setIsChecked] = useState(item.complete);
  const { handleToggleComplete, handleDeleteItem } = useList();

  const handleCheckbox = (event) => {
    handleToggleComplete(item.id, event.target.checked);
    setIsChecked(event.target.checked);
  };

  const handleDelete = () => {
    handleDeleteItem(item.id);
  };

  return (
    <div>
      <input
        type={'checkbox'}
        checked={isChecked}
        onChange={(event) => handleCheckbox(event)}
      />
      <span
        style={
          isChecked
            ? { textDecoration: 'line-through' }
            : { textDecoration: 'none' }
        }
      >
        {item.item}
      </span>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
