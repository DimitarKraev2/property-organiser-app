import React from 'react';
import { ukCounties } from '../../data/mockData';

interface CountyFilterProps {
  selectedCounty: string | null;
  onSelectCounty: (county: string | null) => void;
}

const CountyFilter: React.FC<CountyFilterProps> = ({ selectedCounty, onSelectCounty }) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3">Filter by County</h2>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectCounty(null)}
          className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
            selectedCounty === null
              ? 'bg-primary-600 text-white'
              : 'bg-dark-300 text-gray-300 hover:bg-dark-400'
          }`}
        >
          All Counties
        </button>
        
        {ukCounties.map((county) => (
          <button
            key={county.id}
            onClick={() => onSelectCounty(county.name)}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              selectedCounty === county.name
                ? 'bg-primary-600 text-white'
                : 'bg-dark-300 text-gray-300 hover:bg-dark-400'
            }`}
          >
            {county.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CountyFilter;