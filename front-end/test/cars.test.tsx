import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CarsOverviewTable from '@components/cars/CarsOverview';
import React from 'react';


jest.mock('@components/cars/CarFilter', () => {
  return function MockCarFilter({ onFilterChange }: { onFilterChange: (filter: any) => void }) {
    return (
      <div data-testid="car-filter">
        <button 
          onClick={() => onFilterChange({ field: 'brand', value: 'BMW' })}
          data-testid="apply-filter"
        >
          Filter
        </button>
      </div>
    );
  };
});

const mockCars = [
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

describe('CarsOverviewTable', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('shows login message when no token is present', () => {
    render(<CarsOverviewTable cars={mockCars} />);
    expect(screen.getByText(/you cannot access this page/i)).toBeInTheDocument();
  });

  it('renders table when token is present', () => {
    sessionStorage.setItem('loggedInUser', JSON.stringify({ token: 'mock-token' }));
    render(<CarsOverviewTable cars={mockCars} />);
    
    // Check headers
    expect(screen.getByText(/chassis number/i)).toBeInTheDocument();
    expect(screen.getByText(/brand/i)).toBeInTheDocument();
    expect(screen.getByText(/model/i)).toBeInTheDocument();

    // Check data
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('BMW')).toBeInTheDocument();
    expect(screen.getByText('M3')).toBeInTheDocument();
  });

  it('handles empty cars array', () => {
    sessionStorage.setItem('loggedInUser', JSON.stringify({ token: 'mock-token' }));
    render(<CarsOverviewTable cars={[]} />);
    
    // Headers should still be present
    expect(screen.getByText(/chassis number/i)).toBeInTheDocument();
    
    // Data should not be present
    expect(screen.queryByText('123')).not.toBeInTheDocument();
    expect(screen.queryByText('BMW')).not.toBeInTheDocument();
  });

  it('filters cars when filter is applied', async () => {
    sessionStorage.setItem('loggedInUser', JSON.stringify({ token: 'mock-token' }));
    render(<CarsOverviewTable cars={mockCars} />);

    // Initial state - both cars should be visible
    expect(screen.getByText('BMW')).toBeInTheDocument();
    expect(screen.getByText('Audi')).toBeInTheDocument();

    // Apply filter
    const filterButton = screen.getByTestId('apply-filter');
    filterButton.click();

    // After filter - only BMW should be visible
    expect(screen.getByText('BMW')).toBeInTheDocument();
    expect(screen.queryByText('Audi')).not.toBeInTheDocument();
  });

  it('handles invalid token in sessionStorage', () => {
    sessionStorage.setItem('loggedInUser', 'invalid-json');
    render(<CarsOverviewTable cars={mockCars} />);
    expect(screen.getByText(/you cannot access this page/i)).toBeInTheDocument();
  });

  it('handles missing token property in sessionStorage', () => {
    sessionStorage.setItem('loggedInUser', JSON.stringify({}));
    render(<CarsOverviewTable cars={mockCars} />);
    expect(screen.getByText(/you cannot access this page/i)).toBeInTheDocument();
  });
});