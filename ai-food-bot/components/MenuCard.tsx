
import React from 'react';
import { MenuItem } from '../types';

interface MenuCardProps {
  item: MenuItem;
  onClick: (item: MenuItem) => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ item, onClick }) => {
  return (
    <button 
      onClick={() => onClick(item)}
      className="text-left min-w-[240px] max-w-[240px] bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-xl transition-all hover:scale-[1.02] hover:border-amber-500/50 group"
    >
      <div className="relative h-32 overflow-hidden">
        <img 
          src={item.imageUrl} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
          <span className="text-[10px] font-bold text-white uppercase tracking-widest">Tap to Order</span>
        </div>
      </div>
      <div className="p-3">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-serif text-sm font-bold text-amber-500 group-hover:text-amber-400 truncate pr-2">{item.name}</h4>
          <span className="text-xs font-bold text-zinc-400">{item.price}</span>
        </div>
        <p className="text-[11px] text-zinc-400 line-clamp-2 mb-2">{item.description}</p>
        <div className="flex flex-wrap gap-1">
          {item.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[9px] bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
};

export default MenuCard;
