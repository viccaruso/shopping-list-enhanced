import { useState } from 'react';
import { useList } from '../context/ListContext';

export default function ListItem({ item }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isChecked, setIsChecked] = useState(item.complete);
  const [value, setValue] = useState(item.item);
  const { handleToggleComplete, handleDeleteItem, handleUpdateItem } =
    useList();

  const handleCheckbox = (event) => {
    handleToggleComplete(item.id, event.target.checked);
    setIsChecked(event.target.checked);
  };

  const handleDelete = () => {
    handleDeleteItem(item.id);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveEdit = (event) => {
    event.preventDefault();
    handleUpdateItem(item.id, value);
    setIsEditing(false);
  };

  let content;

  if (isEditing) {
    content = (
      <>
        <form onSubmit={saveEdit}>
          <input
            htmlFor="submit"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit">Save</button>
        </form>
      </>
    );
  } else {
    content = (
      <>
        <span
          style={
            isChecked
              ? { textDecoration: 'line-through' }
              : { textDecoration: 'none' }
          }
        >
          {item.item}
        </span>
        <button onClick={toggleEdit}>Edit</button>
      </>
    );
  }

  return (
    <div>
      <input
        type={'checkbox'}
        checked={isChecked}
        onChange={(event) => handleCheckbox(event)}
      />
      {content}
      <button aria-label={`delete ${item.item} button`} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
