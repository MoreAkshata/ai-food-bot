
import React, { useState, useRef, useEffect } from 'react';
import { Message, MenuItem, CartItem } from './types';
import { MOCK_MENU, RESTAURANT_INFO } from './constants';
import { getGeminiResponse } from './services/geminiService';
import MessageBubble from './components/MessageBubble';
import MenuCard from './components/MenuCard';
import ItemModal from './components/ItemModal';
import MenuOverlay from './components/MenuOverlay';
import CheckoutModal from './components/CheckoutModal';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: "Namaste! Welcome to the AI-Powered Food Ordering Chatbot. I'm your digital concierge. Would you like to see our menu or do you have something specific in mind?",
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedItems, setSuggestedItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, suggestedItems]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const lowerInput = inputText.toLowerCase();
    
    // Simple local check for "cancel" intents before hitting API
    if (lowerInput.includes('cancel my order') || lowerInput.includes('clear my cart') || lowerInput.includes('empty my cart')) {
      const userMsg: Message = { role: 'user', text: inputText, timestamp: new Date() };
      setMessages(prev => [...prev, userMsg]);
      setInputText('');
      clearCart();
      return;
    }

    const userMessage: Message = {
      role: 'user',
      text: inputText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const botText = await getGeminiResponse(userMessage.text, history);

      const botMessage: Message = {
        role: 'model',
        text: botText || "I'm sorry, I'm having trouble connecting to the system right now. Please try again.",
        timestamp: new Date(),
      };

      const lowercaseBotText = botText?.toLowerCase() || "";
      const relevantMenu = MOCK_MENU.filter(item => 
        lowercaseBotText.includes(item.name.toLowerCase()) || 
        userMessage.text.toLowerCase().includes(item.name.toLowerCase()) ||
        (userMessage.text.toLowerCase().includes('recommend') && botText?.includes(item.name))
      );

      setSuggestedItems(relevantMenu.length > 0 ? relevantMenu.slice(0, 4) : []);
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        role: 'model',
        text: "I apologize, but I encountered an error. Could you please rephrase your request?",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = (item: MenuItem, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { ...item, quantity }];
    });

    const confirmMsg: Message = {
      role: 'model',
      text: `Excellent choice! I've added ${quantity}x ${item.name} to your order. Would you like to add some freshly baked Garlic Naan to go with that?`,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, confirmMsg]);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = (silent = false) => {
    setCart([]);
    setShowCart(false);
    setShowCheckout(false);
    if (!silent) {
      const botMsg: Message = {
        role: 'model',
        text: "Your order has been cancelled and the items have been removed from your list. Let me know if you'd like to browse the menu again!",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);
    }
  };

  const handleConfirmOrder = (details: { name: string; phone: string; address: string }) => {
    const total = cart.reduce((acc, curr) => acc + (curr.priceValue * curr.quantity), 0);
    const orderItems = cart.map(item => `${item.quantity}x ${item.name}`).join(', ');

    const successMsg: Message = {
      role: 'model',
      text: `Thank you, ${details.name}! Your order for [${orderItems}] has been placed successfully. Total: ₹${total}. 

Our team is preparing your feast. We will deliver it to ${details.address} shortly. Our rider will contact you at ${details.phone} if needed.

Namaste and enjoy your meal!`,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, successMsg]);
    setCart([]);
    setShowCart(false);
    setShowCheckout(false);
  };

  const cartTotal = cart.reduce((acc, curr) => acc + (curr.priceValue * curr.quantity), 0);

  const quickPrompts = [
    "What are your best dishes?",
    "Show me vegetarian starters",
    "I want to order dessert",
    "Cancel my order"
  ];

  return (
    <div className="flex flex-col h-screen max-w-5xl mx-auto border-x border-zinc-800 bg-black overflow-hidden shadow-2xl relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/5 blur-[120px] rounded-full pointer-events-none -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-600/5 blur-[120px] rounded-full pointer-events-none -ml-32 -mb-32"></div>

      {/* Header */}
      <header className="p-4 md:p-6 border-b border-zinc-800 bg-black/80 backdrop-blur-md flex items-center justify-between z-20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-amber-500 p-0.5 flex items-center justify-center bg-zinc-900 shadow-lg shadow-amber-500/10">
            <span className="text-2xl">🤖</span>
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold text-amber-500 leading-none">AI Food Bot</h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Smart Ordering Assistant</p>
          </div>
        </div>
        
        <button 
          onClick={() => setShowCart(!showCart)}
          className="relative bg-zinc-900 border border-zinc-800 p-2.5 rounded-xl hover:border-amber-500/50 transition-all active:scale-95 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-amber-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">
              {cart.reduce((a, c) => a + c.quantity, 0)}
            </span>
          )}
        </button>
      </header>

      {/* Sidebar Overlays (Cart & Full Menu) */}
      {showCart && (
        <div className="absolute inset-0 z-40 flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowCart(false)}></div>
          <div className="relative w-full max-w-sm bg-zinc-900 border-l border-zinc-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <h2 className="font-serif text-xl font-bold text-white">Your Order</h2>
                {cart.length > 0 && (
                  <button 
                    onClick={() => clearCart()}
                    className="text-[10px] text-red-500/80 hover:text-red-500 font-bold uppercase tracking-widest px-2 py-1 rounded hover:bg-red-500/5 transition-all"
                  >
                    Clear All
                  </button>
                )}
              </div>
              <button onClick={() => setShowCart(false)} className="text-zinc-500 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-500 gap-4 opacity-50">
                  <span className="text-4xl">🛒</span>
                  <p className="text-sm text-center">Your order list is empty.<br/>Tell me what you're craving!</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 p-3 bg-zinc-800/50 rounded-2xl border border-zinc-800">
                    <img src={item.imageUrl} className="w-16 h-16 rounded-xl object-cover" />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="text-sm font-bold text-white">{item.name}</h4>
                        <button onClick={() => removeFromCart(item.id)} className="text-zinc-600 hover:text-red-500">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-zinc-400">{item.quantity} x {item.price}</span>
                        <span className="text-sm font-bold text-amber-500">₹{item.priceValue * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-zinc-800 bg-zinc-900/50">
              <div className="flex justify-between mb-4">
                <span className="text-zinc-400">Subtotal</span>
                <span className="text-xl font-bold text-white">₹{cartTotal}</span>
              </div>
              <button 
                onClick={() => setShowCheckout(true)}
                disabled={cart.length === 0}
                className="w-full bg-amber-600 hover:bg-amber-500 disabled:opacity-50 disabled:hover:bg-amber-600 text-white font-bold py-4 rounded-xl shadow-xl shadow-amber-600/20 transition-all active:scale-95"
              >
                Checkout Now
              </button>
            </div>
          </div>
        </div>
      )}

      {showMenu && (
        <MenuOverlay 
          onClose={() => setShowMenu(false)} 
          onSelectItem={(item) => {
            setSelectedItem(item);
            setShowMenu(false);
          }} 
        />
      )}

      {/* Main Chat Area */}
      <main ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth z-10">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} />
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl rounded-bl-none p-4 flex gap-1">
              <span className="w-1.5 h-1.5 bg-amber-500/60 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-amber-500/60 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-amber-500/60 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}

        {/* Actionable Menu Cards */}
        {suggestedItems.length > 0 && (
          <div className="mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-4">
              <h5 className="text-[10px] font-bold text-amber-500/80 uppercase tracking-widest whitespace-nowrap">
                Tap a card to view & order
              </h5>
              <div className="h-[1px] w-full bg-gradient-to-r from-amber-500/30 to-transparent"></div>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {suggestedItems.map(item => (
                <MenuCard 
                  key={item.id} 
                  item={item} 
                  onClick={(it) => setSelectedItem(it)} 
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Quick Prompt Suggester */}
      {messages.length < 10 && !isLoading && (
        <div className="px-4 md:px-6 py-2 overflow-x-auto whitespace-nowrap no-scrollbar flex gap-2">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => {
                setInputText(prompt);
                // Trigger send immediately for cancel prompt
                if (prompt === "Cancel my order") {
                  setTimeout(() => handleSendMessage(), 0);
                }
              }}
              className={`text-[11px] border px-4 py-2 rounded-full transition-all ${
                prompt === "Cancel my order" 
                ? "bg-red-500/10 border-red-500/30 text-red-500/70 hover:bg-red-500 hover:text-white"
                : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-amber-500 hover:border-amber-500/50"
              }`}
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Message Input & Action Bar */}
      <footer className="p-4 md:p-6 bg-black border-t border-zinc-800 z-20">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Search for dishes or ask recommendations..."
              className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-2xl px-5 py-4 pr-14 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all text-sm shadow-inner"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-xl transition-all ${
                !inputText.trim() || isLoading 
                  ? 'text-zinc-600' 
                  : 'text-amber-500 hover:bg-amber-500/10'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </div>
          
          <button
            type="button"
            onClick={() => setShowMenu(!showMenu)}
            className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl hover:border-amber-500/50 hover:bg-amber-600/10 text-amber-500 transition-all active:scale-95 flex items-center justify-center shadow-lg"
            title="Full Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </form>
        <p className="text-[9px] text-center text-zinc-600 mt-4 tracking-tight">
          Click the menu icon to browse all dishes • Order processing by AI-Powered Assistant
        </p>
      </footer>

      {/* Overlays */}
      {selectedItem && (
        <ItemModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
          onAddToCart={addToCart} 
        />
      )}

      {showCheckout && (
        <CheckoutModal
          total={cartTotal}
          onClose={() => setShowCheckout(false)}
          onConfirm={handleConfirmOrder}
          onCancelAndClear={() => clearCart()}
        />
      )}
    </div>
  );
};

export default App;
