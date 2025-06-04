import React, { useState } from 'react';
import { useProperties } from '../context/PropertyContext';
import CountyFilter from '../components/property/CountyFilter';
import PropertyCard from '../components/property/PropertyCard';

const Dashboard: React.FC = () => {
  const { properties, loading, error, deleteProperty } = useProperties();
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null);

  const filteredProperties = selectedCounty
    ? properties.filter((p) => p.county === selectedCounty)
    : properties;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-white text-xl">Loading properties...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-white text-xl">No properties found.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <CountyFilter selectedCounty={selectedCounty} onSelectCounty={setSelectedCounty} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {filteredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} onDelete={deleteProperty} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
