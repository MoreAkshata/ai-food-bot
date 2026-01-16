
export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  recommendations?: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  priceValue: number; // Added for cart calculations
  category: 'Appetizer' | 'Main' | 'Dessert' | 'Drink';
  imageUrl: string;
  tags: string[];
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface RestaurantInfo {
  name: string;
  address: string;
  hours: string;
  cuisine: string;
  specialties: string[];
}
