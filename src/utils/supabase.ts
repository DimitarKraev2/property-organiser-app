import { createClient } from '@supabase/supabase-js';
import { Property } from '../types';

const supabaseUrl = 'https://biaqqwweuqacqoeurhpt.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpYXFxd3dldXFhY3FvZXVyaHB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5Mjk2MzMsImV4cCI6MjA2MzUwNTYzM30.uQMxhg04aJOhJY4ePSNoPu4pn7VxAfrWC2xF0XGKxm0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 🏡 Get all properties
export const getProperties = async (): Promise<Property[]> => {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }

  return data || [];
};

// ➕ Add a new property (with sanitization)
export const addNewProperty = async (
  property: Omit<Property, 'id' | 'created_at'>
): Promise<Property> => {
  const clean = {
    address: property.address || '',
    price: Number(property.price) || 0,
    county: property.county || '',
    bedrooms: Number(property.bedrooms) || 0,
    bathrooms: Number(property.bathrooms) || 0,
    imageUrl: property.imageUrl || '',
    propertyType: property.propertyType || 'house',
    status: property.status || 'active',
    description: property.description || '',
    notes: typeof property.notes === 'string' ? property.notes : '',
  };

  const { data, error } = await supabase
    .from('properties')
    .insert([clean])
    .single();

  if (error) {
    console.error('Error adding property:', error);
    throw error;
  }

  return data;
};

// ❌ Delete property
export const deletePropertyById = async (id: string): Promise<void> => {
  const { error } = await supabase.from('properties').delete().eq('id', id);

  if (error) {
    console.error('Error deleting property:', error);
    throw error;
  }
};

// 🔁 Update property
export const updatePropertyInSupabase = async (
  updated: Property
): Promise<void> => {
  const { error } = await supabase
    .from('properties')
    .update({
      address: updated.address,
      price: Number(updated.price) || 0,
      county: updated.county,
      bedrooms: Number(updated.bedrooms) || 0,
      bathrooms: Number(updated.bathrooms) || 0,
      imageUrl: updated.imageUrl,
      propertyType: updated.propertyType,
      status: updated.status,
      description: updated.description,
      notes: typeof updated.notes === 'string' ? updated.notes : '',
    })
    .eq('id', updated.id);

  if (error) {
    console.error('Error updating property:', error);
    throw error;
  }
};

// 🌐 Fetch property details from URL using the backend API
export async function fetchPropertyFromUrl(url: string): Promise<Partial<Property>> {
  try {
    const response = await fetch(`http://localhost:3001/api/scrape-property?url=${encodeURIComponent(url)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch property details from scraper API');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in fetchPropertyFromUrl:', error);
    throw error;
  }
}
