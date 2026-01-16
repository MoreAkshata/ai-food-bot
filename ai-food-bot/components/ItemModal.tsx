
import React, { useState } from 'react';
import { MenuItem } from '../types';

interface ItemModalProps {
  item: MenuItem;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number) => void;
}

const ItemModal: React.FC<ItemModalProps> = ({ item, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="relative h-64">
          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-md transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">{item.category}</span>
              <h2 className="font-serif text-2xl font-bold text-white">{item.name}</h2>
            </div>
            <span className="text-xl font-bold text-amber-500">{item.price}</span>
          </div>
          
          <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
            {item.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {item.tags.map(tag => (
              <span key={tag} className="text-[10px] bg-zinc-800 border border-zinc-700 text-zinc-300 px-2 py-1 rounded-md">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center bg-zinc-800 rounded-xl p-1">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="p-2 text-zinc-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                </svg>
              </button>
              <span className="w-8 text-center font-bold text-white">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                className="p-2 text-zinc-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
              </button>
            </div>

            <button 
              onClick={() => {
                onAddToCart(item, quantity);
                onClose();
              }}
              className="flex-1 bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-amber-600/20 transition-all active:scale-95"
            >
              Add to Order • ₹{item.priceValue * quantity}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
