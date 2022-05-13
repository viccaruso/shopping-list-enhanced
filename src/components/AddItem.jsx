import React from 'react';

export default function AddItem() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="New item"></input>
        <button type="submit">Add item</button>
      </form>
    </>
  );
}
