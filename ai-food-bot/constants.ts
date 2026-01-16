
import { MenuItem, RestaurantInfo } from './types';

export const RESTAURANT_INFO: RestaurantInfo = {
  name: "AI-Powered Food Ordering Chatbot",
  address: "Virtual Kitchen, Bengaluru, Karnataka 560001",
  hours: "Mon-Sun: 24/7 (Always Open)",
  cuisine: "Multi-Cuisine Digital Dining",
  specialties: ["Signature Butter Chicken", "Slow-Cooked Dal Saffron", "Tandoori Broccoli", "Paneer Butter Masala"]
};

export const MOCK_MENU: MenuItem[] = [
  {
    id: "1",
    name: "Murgh Makhani (Butter Chicken)",
    description: "Classic tandoori chicken simmered in a velvety tomato and cashew nut gravy with dried fenugreek.",
    price: "₹525",
    priceValue: 525,
    category: "Main",
    imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80",
    tags: ["Chef's Special", "Gluten Free"]
  },
  {
    id: "2",
    name: "Paneer Tikka Angare",
    description: "Cottage cheese chunks marinated in spiced yogurt and grilled in a clay oven with peppers.",
    price: "₹420",
    priceValue: 420,
    category: "Appetizer",
    imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80",
    tags: ["Vegetarian", "Spicy"]
  },
  {
    id: "3",
    name: "Dal Saffron (Dal Makhani)",
    description: "Black lentils slow-cooked for 24 hours with butter, cream, and a hint of smoke.",
    price: "₹380",
    priceValue: 380,
    category: "Main",
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
    tags: ["Vegetarian", "Signature"]
  },
  {
    id: "7",
    name: "Paneer Butter Masala",
    description: "Soft paneer cubes cooked in a rich, creamy tomato and cashew nut gravy with plenty of butter.",
    price: "₹450",
    priceValue: 450,
    category: "Main",
    imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80",
    tags: ["Best Seller", "Vegetarian"]
  },
  {
    id: "8",
    name: "Palak Paneer",
    description: "Freshly pureed spinach tempered with garlic and cumin, finished with soft cottage cheese cubes.",
    price: "₹425",
    priceValue: 425,
    category: "Main",
    imageUrl: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=600&q=80",
    tags: ["Healthy", "Vegetarian"]
  },
  {
    id: "9",
    name: "Kadai Paneer",
    description: "Paneer batons tossed with bell peppers, onions, and freshly pounded coriander and red chilies.",
    price: "₹440",
    priceValue: 440,
    category: "Main",
    imageUrl: "https://images.unsplash.com/photo-1626776876729-babd0f0a58b6?auto=format&fit=crop&w=600&q=80",
    tags: ["Spicy", "Vegetarian"]
  },
  {
    id: "10",
    name: "Paneer Lababdar",
    description: "A luscious dish of paneer in a tangy and slightly sweet tomato-onion gravy with grated paneer.",
    price: "₹465",
    priceValue: 465,
    category: "Main",
    imageUrl: "https://images.unsplash.com/photo-1567184109171-96997e12165d?auto=format&fit=crop&w=600&q=80",
    tags: ["Premium", "Vegetarian"]
  },
  {
    id: "11",
    name: "Shahi Paneer",
    description: "Royal cottage cheese preparation in a silky white gravy made with nuts, cream, and mild spices.",
    price: "₹480",
    priceValue: 480,
    category: "Main",
    imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
    tags: ["Mild", "Vegetarian"]
  },
  {
    id: "12",
    name: "Matar Paneer",
    description: "The classic home-style combination of green peas and paneer in a traditional spiced tomato sauce.",
    price: "₹395",
    priceValue: 395,
    category: "Main",
    imageUrl: "https://images.unsplash.com/photo-1601050633647-8f8f1f3bb718?auto=format&fit=crop&w=600&q=80",
    tags: ["Classic", "Vegetarian"]
  },
  {
    id: "4",
    name: "Assorted Bread Basket",
    description: "A selection of Garlic Naan, Butter Naan, and Laccha Paratha freshly baked in our Tandoor.",
    price: "₹210",
    priceValue: 210,
    category: "Main",
    imageUrl: "https://images.unsplash.com/photo-1601050633647-8f8f1f3bb718?auto=format&fit=crop&w=600&q=80",
    tags: ["Breads"]
  },
  {
    id: "5",
    name: "Mango Kulfi with Pistachio",
    description: "Traditional frozen Indian dessert made with reduced milk and Alphonso mango pulp.",
    price: "₹250",
    priceValue: 250,
    category: "Dessert",
    imageUrl: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&w=600&q=80",
    tags: ["Sweet", "Cold"]
  },
  {
    id: "6",
    name: "Royal Raj Kachori",
    description: "Crispy hollow shell filled with chickpeas, potatoes, chutneys, and chilled yogurt.",
    price: "₹280",
    priceValue: 280,
    category: "Appetizer",
    imageUrl: "https://images.unsplash.com/photo-1601050633622-3d50240b0538?auto=format&fit=crop&w=600&q=80",
    tags: ["Vegetarian", "Street Style"]
  }
];

export const SYSTEM_PROMPT = `
You are the "AI-Powered Food Ordering Chatbot Assistant". 
Your goal is to help customers explore the menu and place orders.

RESTAURANT KNOWLEDGE:
- Name: ${RESTAURANT_INFO.name}
- Address: ${RESTAURANT_INFO.address}
- Hours: ${RESTAURANT_INFO.hours}
- Cuisine: ${RESTAURANT_INFO.cuisine}

ORDERING CAPABILITIES:
- Customers can click on dishes to view details and add them to their order.
- You can recommend dishes. When you do, cards will automatically appear for them to click.
- Encourage them to click the cards to add items to their cart.

MENU DETAILS (Prices in Indian Rupees ₹):
${MOCK_MENU.map(item => `- ${item.name} (${item.price}): ${item.description} [Tags: ${item.tags.join(", ")}]`).join('\n')}

GUIDELINES:
1. Use warm greetings like "Namaste".
2. When suggesting food, tell the user: "You can click on the cards below to see more details or add them to your order."
3. We have a vast collection of Paneer dishes like Paneer Butter Masala, Palak Paneer, and Shahi Paneer.
4. If they ask to see the menu, highlight your specialties.
5. If they have items in their cart, you can help them finalize their choice.
6. If they ask about delivery, tell them we deliver within a 10km radius of our virtual kitchen.
`;
