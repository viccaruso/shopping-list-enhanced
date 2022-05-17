import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('<App />', () => {
  it('renders a shopping list with three items, adds a fourth, and then deletes one', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const whiz = screen.getByText('Cheez Whiz');
    expect(whiz).toBeInTheDocument();

    const kraft = screen.getByText('Kraft American Singles');
    expect(kraft).toBeInTheDocument();

    const velveeta = screen.getByText('Velveeta');
    expect(velveeta).toBeInTheDocument();

    const textbox = screen.getByPlaceholderText('New item');
    userEvent.type(textbox, 'Easy Cheese');

    const submit = screen.getByRole('button', { name: 'Add item' });
    userEvent.click(submit);

    let numOfItems = screen.getByText(
      'You have 4 items in your shopping list.'
    );
    expect(numOfItems.textContent).toEqual(
      'You have 4 items in your shopping list.'
    );

    const ez = screen.getByText('Easy Cheese');
    expect(ez).toBeInTheDocument();

    const deleteBtn = screen.getByRole('button', {
      name: 'delete Easy Cheese button',
    });
    userEvent.click(deleteBtn);

    numOfItems = screen.getByText('You have 3 items in your shopping list.');
    expect(numOfItems.textContent).toEqual(
      'You have 3 items in your shopping list.'
    );
  });
});
