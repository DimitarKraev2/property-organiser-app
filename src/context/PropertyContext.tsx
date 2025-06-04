import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Property } from '../types';
import {
  getProperties,
  addNewProperty,
  deletePropertyById,
  updatePropertyInSupabase,
} from '../utils/supabase';

interface PropertyContextType {
  properties: Property[];
  loading: boolean;
  error: string | null;
  addProperty: (property: Omit<Property, 'id' | 'created_at'>) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
  refreshProperties: () => Promise<void>;
  updateProperty: (property: Property) => Promise<void>;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadProperties = async () => {
    try {
      setLoading(true);
      const data = await getProperties();
      setProperties(data);
    } catch (err) {
      setError('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const addProperty = async (property: Omit<Property, 'id' | 'created_at'>) => {
    try {
      await addNewProperty(property);
      await loadProperties();
    } catch (err) {
      setError('Failed to add property');
    }
  };

  const deleteProperty = async (id: string) => {
    try {
      await deletePropertyById(id);
      await loadProperties();
    } catch (err) {
      setError('Failed to delete property');
    }
  };

  const updateProperty = async (updated: Property) => {
    try {
      await updatePropertyInSupabase(updated);
      setProperties((prev) =>
        prev.map((p) => (p.id === updated.id ? { ...p, ...updated } : p))
      );
    } catch (err) {
      console.error('Failed to update property in Supabase:', err);
      setError('Failed to update property');
    }
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        loading,
        error,
        addProperty,
        deleteProperty,
        refreshProperties: loadProperties,
        updateProperty,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperties = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
};
