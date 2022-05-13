import { useState } from 'react';
import { useList } from '../context/ListContext';

export default function ListItem({ item }) {
  const [isChecked, setIsChecked] = useState(item.complete);
  const { handleToggleComplete } = useList();

  const handleCheckbox = (event) => {
    handleToggleComplete(item.id, event.target.checked);
    setIsChecked(event.target.checked);
  };

  return (
    <div>
      <input
        type={'checkbox'}
        checked={isChecked}
        onChange={(event) => handleCheckbox(event)}
      />
      <span>{item.item}</span>
    </div>
  );
}
