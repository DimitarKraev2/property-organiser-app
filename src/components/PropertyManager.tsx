import { useEffect, useState } from 'react';

interface Property {
  id: number;
  address: string;
  price: number;
  county: string;
}

export default function PropertyManager() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/properties`)
      .then(res => res.json())
      .then(data => {
        setProperties(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading properties...</p>;

  return (
    <div className="p-6 text-white">
      {properties.length ? (
        properties.map(p => (
          <div key={p.id}>
            <h2>{p.address}</h2>
            <p>£{p.price}</p>
            <p>{p.county}</p>
          </div>
        ))
      ) : (
        <p>No properties found.</p>
      )}
    </div>
  );
}
