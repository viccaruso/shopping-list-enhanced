import AddItem from './components/AddItem';
import Header from './components/Header';
import ShoppingList from './components/ShoppingList';
import { ListProvider } from './context/ListContext';

export default function App() {
  return (
    <ListProvider>
      <Header />
      <AddItem />
      <ShoppingList />
    </ListProvider>
  );
}
