import { useList } from '../context/ListContext';
import ListItem from './ListItem';

export default function ShoppingList() {
  const { listState } = useList();

  return (
    <>
      {listState.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </>
  );
}
