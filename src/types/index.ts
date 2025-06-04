export interface Property {
  id: string;
  imageUrl: string;
  address: string;
  price: number;
  county: string;
  bedrooms?: number;
  bathrooms?: number;
  description?: string;
  status?: 'active' | 'pending' | 'sold';
  createdAt: string;
  propertyType?: 'house' | 'flat' | 'bungalow' | 'land' | 'commercial';
}

export interface County {
  id: string;
  name: string;
}