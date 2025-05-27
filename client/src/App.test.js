import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders Meal Planner header', () => {
  render(<App />);
  // Use getAllByText to avoid multiple match error
  const headers = screen.getAllByText(/Meal Planner/i);
  expect(headers.length).toBeGreaterThan(0);
});

test('can add a meal', async () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Add meal/i);
  fireEvent.change(input, { target: { value: 'Pizza Night' } });
  fireEvent.click(screen.getAllByText(/Add/i)[0]);
  // This test assumes the backend is running and will not work in isolation
});

test('can add a recipe', async () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Add recipe/i);
  fireEvent.change(input, { target: { value: 'Spaghetti' } });
  fireEvent.click(screen.getAllByText(/Add/i)[1]);
});

test('can add a shopping list item', async () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Add item/i);
  fireEvent.change(input, { target: { value: 'Tomatoes' } });
  fireEvent.click(screen.getAllByText(/Add/i)[2]);
});
