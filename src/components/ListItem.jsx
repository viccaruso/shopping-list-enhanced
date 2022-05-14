import { useState } from 'react';
import { useList } from '../context/ListContext';

export default function ListItem({ item }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isChecked, setIsChecked] = useState(item.complete);
  const [formValue, setFormValue] = useState('');
  const { handleToggleComplete, handleDeleteItem } = useList();

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
    console.log(event.target.value);
    setIsEditing(!isEditing);
  };

  let content;

  if (isEditing) {
    content = (
      <>
        <form onSubmit={saveEdit}>
          <input
            type="text"
            value={item.item}
            onChange={(e) => setFormValue(e.target.value)}
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
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
