import React, { useState } from 'react';

interface FilterProps {
  onFilterChange: (filter: FilterCriteria) => void;
}

interface FilterCriteria {
  field: string;
  value: string;
}

const CarFilter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [selectedField, setSelectedField] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const filterFields = [
    { value: 'brand', label: 'Brand' },
    { value: 'model', label: 'Model' },
    { value: 'chassisNumber', label: 'Chassis Number' },
    { value: 'condition', label: 'Condition' },
    { value: 'status', label: 'Status' },
    { value: 'price', label: 'Price' }
  ];

  const handleApplyFilter = () => {
    if (selectedField && filterValue) {
      onFilterChange({
        field: selectedField,
        value: filterValue
      });
    }
  };

  const handleClearFilter = () => {
    setSelectedField('');
    setFilterValue('');
    onFilterChange({ field: '', value: '' });
  };

  return (
    <div className="filter-section">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Filter by:
        </label>
        <select
          value={selectedField}
          onChange={(e) => setSelectedField(e.target.value)}
          className="border rounded px-3 py-2 text-gray-700"
        >
          <option value="">Select field</option>
          {filterFields.map((field) => (
            <option key={field.value} value={field.value}>
              {field.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Value:
        </label>
        <input
          type="text"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder="Enter filter value"
          className="border rounded px-3 py-2 text-gray-700"
        />
      </div>

      <button
        onClick={handleApplyFilter}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Apply Filter
      </button>

      <button
        onClick={handleClearFilter}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Clear Filter
      </button>
    </div>
  );
};

export default CarFilter;