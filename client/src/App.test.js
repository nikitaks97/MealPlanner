import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { expect, test, beforeEach, vi } from 'vitest';
import App from './App';

// Mock fetch globally
global.fetch = vi.fn();

beforeEach(() => {
  // Reset all mocks before each test
  vi.resetAllMocks();
  
  // Setup default mock responses
  fetch.mockImplementation((url) => {
    if (url.includes('/api/meals')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      });
    }
    if (url.includes('/api/recipes')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      });
    }
    if (url.includes('/api/shopping-list')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      });
    }
    return Promise.reject(new Error('Unknown URL'));
  });
});

test('renders Meal Planner header', async () => {
  render(<App />);
  // Wait for component to load after API calls
  await waitFor(() => {
    const headers = screen.getAllByText(/Meal Planner/i);
    expect(headers.length).toBeGreaterThan(0);
  });
});

test('can add a meal', async () => {
  // Mock POST response for adding a meal
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ id: 1, name: 'Pizza Night' }),
    })
  );

  render(<App />);
  
  await waitFor(() => {
    const input = screen.getByPlaceholderText(/Add meal/i);
    fireEvent.change(input, { target: { value: 'Pizza Night' } });
    fireEvent.click(screen.getAllByText(/Add/i)[0]);
  });
});

test('can add a recipe', async () => {
  // Mock POST response for adding a recipe
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ id: 1, name: 'Spaghetti' }),
    })
  );

  render(<App />);
  
  await waitFor(() => {
    const input = screen.getByPlaceholderText(/Add recipe/i);
    fireEvent.change(input, { target: { value: 'Spaghetti' } });
    fireEvent.click(screen.getAllByText(/Add/i)[1]);
  });
});

test('can add a shopping list item', async () => {
  // Mock POST response for adding a shopping list item
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ id: 1, name: 'Tomatoes' }),
    })
  );

  render(<App />);
  
  await waitFor(() => {
    const input = screen.getByPlaceholderText(/Add item/i);
    fireEvent.change(input, { target: { value: 'Tomatoes' } });
    fireEvent.click(screen.getAllByText(/Add/i)[2]);
  });
});
