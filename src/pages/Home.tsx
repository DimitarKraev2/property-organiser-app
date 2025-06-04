import React, { useState } from 'react';
import { useProperties } from '../context/PropertyContext';
import PropertyCard from '../components/property/PropertyCard';
import { useNavigate } from 'react-router-dom';
import { ukCounties } from '../data/mockData';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { properties, loading } = useProperties();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [countyFilter, setCountyFilter] = useState<string>('');

  const filtered = properties.filter((p) => {
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchCounty = !countyFilter || p.county === countyFilter;
    return matchStatus && matchCounty;
  });

  const statuses = ['all', 'active', 'pending', 'sold'];
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'pending': return 'bg-yellow-500';
      case 'sold': return 'bg-red-600';
      default: return 'bg-gray-700';
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl text-white font-semibold mb-6">Properties</h1>

      <div className="mb-6 p-4 bg-gray-900 rounded-lg shadow">
        <h2 className="text-white text-lg font-medium mb-3 border-b border-gray-700 pb-2">Filter by County</h2>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setCountyFilter('')}
            className={`px-4 py-1 rounded-full ${countyFilter === '' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            All Counties
          </button>
          {ukCounties.map((c) => (
            <button
              key={c.id}
              onClick={() => setCountyFilter(c.name)}
              className={`px-4 py-1 rounded-full ${countyFilter === c.name ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 p-4 bg-gray-900 rounded-lg shadow">
        <h2 className="text-white text-lg font-medium mb-3 border-b border-gray-700 pb-2">Filter by Status</h2>
        <div className="flex gap-2 flex-wrap">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-1 rounded-full text-sm transition ${
                statusFilter === status
                  ? `${getStatusColor(status)} text-white`
                  : 'bg-gray-700 text-gray-300'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-400">No properties to show.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
