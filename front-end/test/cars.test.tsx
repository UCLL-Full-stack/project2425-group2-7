import { render, screen, fireEvent } from '@testing-library/react';
import { test, beforeEach } from 'node:test';
import '@testing-library/jest-dom/extend-expect';
import CarsOverviewTable from '@components/cars/CarsOverview';
import { Car } from '@types';



const mockCars: Car[] = [
  {
    chassisNumber: 123,
    brand: "BMW",
    model: "M3",
    condition: "new",
    status: "available",
    price: 50000
  },
  {
    chassisNumber: 456,
    brand: "Audi",
    model: "A4",
    condition: "used",
    status: "sold",
    price: 30000
  }
];

beforeEach(() => {
  sessionStorage.clear();
});

test('shows login message when no token is present', () => {
  render(<CarsOverviewTable cars={mockCars} />);

    expect(screen.getByText('You cannot access this page. Please login first')).toBeInTheDocument();
});

test('renders table when token is present', () => {
  sessionStorage.setItem('loggedInUser', JSON.stringify({ token: 'mock-token' }));
  render(<CarsOverviewTable cars={mockCars} />);
  
  expect(screen.getByText('Chassis Number')).toBeInTheDocument();
  expect(screen.getByText('Brand')).toBeInTheDocument();
  expect(screen.getByText('Model')).toBeInTheDocument();
  expect(screen.getByText('123')).toBeInTheDocument();
  expect(screen.getByText('BMW')).toBeInTheDocument();
  expect(screen.getByText('M3')).toBeInTheDocument();
});

test('handles empty cars array', () => {
  sessionStorage.setItem('loggedInUser', JSON.stringify({ token: 'mock-token' }));
  render(<CarsOverviewTable cars={[]} />);
  
  expect(screen.getByText('Chassis Number')).toBeInTheDocument();
  expect(screen.queryByText('123')).not.toBeInTheDocument();
});

test('filters cars when filter is applied', () => {
  sessionStorage.setItem('loggedInUser', JSON.stringify({ token: 'mock-token' }));
  render(<CarsOverviewTable cars={mockCars} />);

  // Initially both cars should be visible
  expect(screen.getByText('BMW')).toBeInTheDocument();
  expect(screen.getByText('Audi')).toBeInTheDocument();

  // Trigger filter
  fireEvent.click(screen.getByTestId('filter-button'));

  // After filtering, only BMW should be visible
  expect(screen.getByText('BMW')).toBeInTheDocument();
  expect(screen.queryByText('Audi')).not.toBeInTheDocument();
});