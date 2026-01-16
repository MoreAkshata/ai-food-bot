
import React, { useState } from 'react';

interface CheckoutModalProps {
  total: number;
  onClose: () => void;
  onConfirm: (details: { name: string; phone: string; address: string }) => void;
  onCancelAndClear?: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ total, onClose, onConfirm, onCancelAndClear }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API delay
    setTimeout(() => {
      onConfirm(formData);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
          <h2 className="font-serif text-xl font-bold text-white">Delivery Details</h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-all text-sm"
              placeholder="e.g. Rahul Sharma"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5 ml-1">Phone Number</label>
            <input
              required
              type="tel"
              pattern="[0-9]{10}"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-all text-sm"
              placeholder="10-digit mobile number"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5 ml-1">Delivery Address</label>
            <textarea
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-all text-sm resize-none h-24"
              placeholder="Building name, Street, Landmark..."
            />
          </div>

          <div className="pt-4 space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-amber-600/20 transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Placing Order...
                </>
              ) : (
                `Confirm Order • ₹${total}`
              )}
            </button>
            
            <button
              type="button"
              onClick={() => {
                if (onCancelAndClear) onCancelAndClear();
                onClose();
              }}
              className="w-full py-2 text-xs font-bold text-zinc-500 hover:text-red-500 transition-colors"
            >
              Cancel & Clear Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
