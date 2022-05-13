import { useList } from '../context/ListContext';

export default function ShoppingList() {
  const { listState } = useList();
  console.log(listState);
  return (
    <>
      {listState.map((item) => (
        <p key={item.id}>{item.item}</p>
      ))}
    </>
  );
}
