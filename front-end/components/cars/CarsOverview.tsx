import React, { useState } from 'react';
import CarFilter from '@components/cars/CarFilter';
import { Car } from '@types';

interface Props {
  cars: Car[];
}

interface FilterCriteria {
  field: string;
  value: string;
}

const CarsOverviewTable: React.FC<Props> = ({ cars = [] }) => {  // provide default empty array
  const [filter, setFilter] = useState<FilterCriteria>({ field: '', value: '' });

  // Ensure cars is an array before filtering
  const carArray = Array.isArray(cars) ? cars : [];

  const filteredCars = carArray.filter(car => {
    if (!filter.field || !filter.value) return true;
    
    const carValue = car[filter.field as keyof Car];
    if (carValue === undefined) return false;
    
    return String(carValue)
      .toLowerCase()
      .includes(filter.value.toLowerCase());
  });

  return (
    <div>
      <CarFilter onFilterChange={setFilter} />
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Chassis Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Brand
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Model
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Condition
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCars.map((car) => (
              <tr key={car.chassisNumber} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {car.chassisNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {car.brand}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {car.model}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {car.condition}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {car.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {car.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarsOverviewTable;