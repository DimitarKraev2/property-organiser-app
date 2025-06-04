import React, { useState } from 'react';
import { ExternalLink, Trash } from 'lucide-react';
import { useProperties } from '../../context/PropertyContext';
import { Property } from '../../types';
import EditPropertyModal from './EditPropertyModal';

interface Props {
  property: Property;
}

const statusColor = {
  active: 'bg-green-600',
  pending: 'bg-yellow-500',
  sold: 'bg-red-600'
};

const PropertyCard: React.FC<Props> = ({ property }) => {
  const { deleteProperty } = useProperties();
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className="bg-gray-900 rounded-xl shadow overflow-hidden relative">
      <div className="relative">
        <img
          src={property.imageUrl || 'https://via.placeholder.com/600x400'}
          alt={property.address}
          className="w-full h-48 object-cover"
        />

        {property.status && (
          <span className={`absolute top-2 left-2 px-2 py-1 text-xs font-bold text-white rounded ${statusColor[property.status]}`}>
            {property.status.toUpperCase()}
          </span>
        )}

        <button
          onClick={() => setShowEdit(true)}
          className="absolute top-2 right-2 bg-black bg-opacity-50 hover:bg-opacity-80 text-white p-1 rounded-full"
        >
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 text-white space-y-2">
        <h3 className="text-md font-semibold truncate">Check out this {property.bedrooms} bedroom detached...</h3>
        <p className="text-sm text-gray-400 flex items-center gap-1">
          <span>{property.county}</span>
        </p>
        <p className="text-sm text-gray-300 flex items-center gap-1">
          <span className="font-semibold">{property.bedrooms}</span> Bedrooms
        </p>

        <div className="pt-1">
          <p className="text-sm text-gray-400">Price</p>
          <p className="text-lg font-bold">£{property.price.toLocaleString()}</p>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={() => deleteProperty(property.id)}
            className="text-gray-400 hover:text-red-500"
          >
            <Trash className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showEdit && (
        <EditPropertyModal property={property} onClose={() => setShowEdit(false)} />
      )}
    </div>
  );
};

export default PropertyCard;
