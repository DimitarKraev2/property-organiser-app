import React, { useState } from 'react';
import { Property } from '../../types';
import { useProperties } from '../../context/PropertyContext';

interface Props {
  property: Property;
  onClose: () => void;
}

const EditPropertyModal: React.FC<Props> = ({ property, onClose }) => {
  const { updateProperty } = useProperties();
  const [edited, setEdited] = useState<Property>({ ...property });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEdited((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'bedrooms' || name === 'bathrooms' ? Number(value) : value,
    }));
  };

  const handleSave = async () => {
    await updateProperty(edited);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg shadow-xl p-6 w-full max-w-xl text-white relative">
        <h2 className="text-lg font-semibold mb-4">Edit Property</h2>

        <label className="text-sm mb-1 block">Address</label>
        <input
          name="address"
          value={edited.address}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm mb-3"
        />

        <label className="text-sm mb-1 block">Price (£)</label>
        <input
          name="price"
          type="number"
          step="500"
          value={edited.price}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm mb-3"
        />

        <label className="text-sm mb-1 block">Status</label>
        <select
          name="status"
          value={edited.status}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm mb-3"
        >
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="sold">Sold</option>
        </select>

        <label className="text-sm mb-1 block">Notes</label>
        <textarea
          name="notes"
          value={edited.notes || ''}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm mb-4"
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded text-sm">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPropertyModal;
