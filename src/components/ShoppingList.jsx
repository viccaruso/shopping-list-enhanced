import { useList } from '../context/ListContext';

export default function ShoppingList() {
  const shoppingList = useList();
  console.log(shoppingList);
  return (
    <>
      {shoppingList.listState.map((item) => (
        <p key={item.id}>{item.item}</p>
      ))}
    </>
  );
}
