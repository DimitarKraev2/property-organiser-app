import { Property, County } from '../types';

export const mockProperties: Property[] = [
  {
    id: '1',
    imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
    address: '5 West Street, Cheltenham',
    price: 2000000,
    county: 'Cheltenham',
    bedrooms: 4,
    bathrooms: 3,
    description: 'Luxurious property in the heart of Cheltenham with modern amenities',
    status: 'active',
    createdAt: new Date().toISOString(),
    propertyType: 'house',
  },
  {
    id: '2',
    imageUrl: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
    address: '17 High Street, Stroud',
    price: 950000,
    county: 'Stroud',
    bedrooms: 3,
    bathrooms: 2,
    description: 'Beautiful family home with garden in Stroud',
    status: 'active',
    createdAt: new Date().toISOString(),
    propertyType: 'house',
  },
  {
    id: '3',
    imageUrl: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
    address: '42 Southgate Street, Gloucester',
    price: 750000,
    county: 'Gloucester',
    bedrooms: 2,
    bathrooms: 2,
    description: 'Stunning apartment in central Gloucester',
    status: 'pending',
    createdAt: new Date().toISOString(),
    propertyType: 'flat',
  },
  {
    id: '4',
    imageUrl: 'https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg',
    address: '8 Market Place, Cirencester',
    price: 1200000,
    county: 'Cirencester',
    bedrooms: 5,
    bathrooms: 3,
    description: 'Historic property with modern features',
    status: 'active',
    createdAt: new Date().toISOString(),
    propertyType: 'house',
  }
];

export const ukCounties: County[] = [
  { id: '1', name: 'Cheltenham' },
  { id: '2', name: 'Stroud' },
  { id: '3', name: 'Gloucester' },
  { id: '4', name: 'Cirencester' }
];