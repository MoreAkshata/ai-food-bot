
import React from 'react';
import { MenuItem } from '../types';
import { MOCK_MENU } from '../constants';

interface MenuOverlayProps {
  onClose: () => void;
  onSelectItem: (item: MenuItem) => void;
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({ onClose, onSelectItem }) => {
  const categories: MenuItem['category'][] = ['Appetizer', 'Main', 'Dessert', 'Drink'];

  return (
    <div className="absolute inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-zinc-950 border-l border-zinc-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
          <div>
            <h2 className="font-serif text-2xl font-bold text-amber-500">Digital Menu</h2>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Powered by AI Concierge</p>
          </div>
          <button onClick={onClose} className="p-2 text-zinc-500 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8">
          {categories.map(category => {
            const items = MOCK_MENU.filter(item => item.category === category);
            if (items.length === 0) return null;

            return (
              <div key={category} className="space-y-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em]">{category}s</h3>
                  <div className="h-[1px] flex-1 bg-zinc-800"></div>
                </div>
                <div className="grid gap-3">
                  {items.map(item => (
                    <button
                      key={item.id}
                      onClick={() => onSelectItem(item)}
                      className="flex items-center gap-4 p-3 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-amber-500/30 hover:bg-zinc-900/80 transition-all text-left group"
                    >
                      <img src={item.imageUrl} className="w-16 h-16 rounded-xl object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all" alt={item.name} />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-0.5">
                          <h4 className="text-sm font-bold text-zinc-100 truncate group-hover:text-amber-500 transition-colors">{item.name}</h4>
                          <span className="text-xs font-bold text-amber-500 ml-2">{item.price}</span>
                        </div>
                        <p className="text-[10px] text-zinc-500 line-clamp-2 leading-relaxed">{item.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="p-6 border-t border-zinc-800 bg-zinc-900/50 text-center">
          <p className="text-[10px] text-zinc-600 italic">Tap any dish to customize and add to order</p>
        </div>
      </div>
    </div>
  );
};

export default MenuOverlay;
