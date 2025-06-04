import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, ArrowLeft } from 'lucide-react';
import { fetchPropertyFromUrl } from '../utils/supabase';
import { useProperties } from '../context/PropertyContext';
import { ukCounties } from '../data/mockData';

const AddProperty: React.FC = () => {
  const navigate = useNavigate();
  const { addProperty } = useProperties();

  const [formMode, setFormMode] = useState<'manual' | 'url'>('url');
  const [urlInput, setUrlInput] = useState('');
  const [urlLoading, setUrlLoading] = useState(false);
  const [urlError, setUrlError] = useState<string | null>(null);

  const [property, setProperty] = useState({
    address: '',
    price: 0,
    county: '',
    imageUrl: '',
    bedrooms: 0,
    bathrooms: 0,
    propertyType: 'house',
    status: 'active',
    description: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProperty((prev) => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sanitized = {
      ...property,
      notes: typeof property.notes === 'string' ? property.notes : '',
    };
    await addProperty(sanitized);
    navigate('/');
  };

  const handleUrlFetch = async () => {
    try {
      setUrlLoading(true);
      setUrlError(null);
      const data = await fetchPropertyFromUrl(urlInput);
      setProperty((prev) => ({ ...prev, ...data }));
    } catch (error) {
      setUrlError('Failed to fetch property details.');
    } finally {
      setUrlLoading(false);
    }
  };

  return (
    <div className="p-6">
      <button onClick={() => navigate(-1)} className="flex items-center text-sm text-white mb-4">
        <ArrowLeft className="mr-2 w-4 h-4" /> Back
      </button>

      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-md ${formMode === 'manual' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          onClick={() => setFormMode('manual')}
        >
          Manual Entry
        </button>
        <button
          className={`px-4 py-2 rounded-md ${formMode === 'url' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          onClick={() => setFormMode('url')}
        >
          Import from URL
        </button>
      </div>

      {formMode === 'url' && (
        <div className="bg-gray-800 p-4 rounded-xl space-y-4">
          <input
            type="text"
            placeholder="https://www.rightmove.co.uk/..."
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="w-full rounded-md bg-gray-900 border border-gray-600 px-3 py-2 text-sm text-white placeholder-gray-400"
          />
          <button
            onClick={handleUrlFetch}
            disabled={urlLoading || !urlInput}
            className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
          >
            <Upload className="w-4 h-4" />
            {urlLoading ? 'Fetching...' : 'Fetch Property Details'}
          </button>
          {urlError && <p className="text-red-500 text-sm">{urlError}</p>}
        </div>
      )}

      {(formMode === 'manual' || (formMode === 'url' && property.address)) && (
        <form onSubmit={handleSubmit} className="mt-6 bg-gray-800 p-4 rounded-xl space-y-4">
          <div>
            <label className="text-white text-sm mb-1 block">Address</label>
            <input name="address" value={property.address} onChange={handleChange} className="w-full bg-gray-900 border border-gray-600 text-white rounded-md px-3 py-2 text-sm" />
          </div>

          <div>
            <label className="text-white text-sm mb-1 block">Price (£)</label>
            <input
              name="price"
              type="number"
              step="500"
              value={property.price}
              onChange={handleChange}
              className="w-full appearance-none bg-gray-900 border border-gray-600 text-white rounded-md px-3 py-2 text-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="text-white text-sm mb-1 block">Image URL</label>
            <input name="imageUrl" value={property.imageUrl} onChange={handleChange} className="w-full bg-gray-900 border border-gray-600 text-white rounded-md px-3 py-2 text-sm" />
          </div>

          <div>
            <label className="text-white text-sm mb-1 block">County</label>
            <select name="county" value={property.county} onChange={handleChange} className="w-full bg-gray-900 border border-gray-600 text-white rounded-md px-3 py-2 text-sm">
              <option value="">Select a county</option>
              {ukCounties.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm mb-1 block">Bedrooms</label>
              <input name="bedrooms" type="number" value={property.bedrooms} onChange={handleChange} className="w-full bg-gray-900 border border-gray-600 text-white rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-white text-sm mb-1 block">Bathrooms</label>
              <input name="bathrooms" type="number" value={property.bathrooms} onChange={handleChange} className="w-full bg-gray-900 border border-gray-600 text-white rounded-md px-3 py-2 text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm mb-1 block">Property Type</label>
              <select name="propertyType" value={property.propertyType} onChange={handleChange} className="w-full bg-gray-900 border border-gray-600 text-white rounded-md px-3 py-2 text-sm">
                <option value="house">House</option>
                <option value="flat">Flat</option>
              </select>
            </div>
            <div>
              <label className="text-white text-sm mb-1 block">Status</label>
              <select name="status" value={property.status} onChange={handleChange} className="w-full bg-gray-900 border border-gray-600 text-white rounded-md px-3 py-2 text-sm">
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="sold">Sold</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-white text-sm mb-1 block">Description</label>
            <textarea name="description" value={property.description} onChange={handleChange} className="w-full bg-gray-900 border border-gray-600 text-white rounded-md px-3 py-2 text-sm" />
          </div>

          <div>
            <label className="text-white text-sm mb-1 block">Notes</label>
            <textarea name="notes" value={property.notes} onChange={handleChange} className="w-full bg-gray-900 border border-gray-600 text-white rounded-md px-3 py-2 text-sm" />
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
              Add Property
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddProperty;
