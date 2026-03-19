import { X, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate

const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate(); // 2. Initialize navigate

  if (!isCartOpen) return null;

  // 3. Create a handle function
  const handleGoToCheckout = () => {
    setIsCartOpen(false); // Close the drawer first
    navigate('/checkout'); // Send them to the checkout page
  };

  return (
    <div className="fixed inset-0 z-[300] flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
      
      {/* Side Panel */}
      <div className="relative w-full max-w-[450px] h-full bg-zinc-950 border-l border-white/5 p-8 flex flex-col shadow-2xl animate-in slide-in-from-right duration-500">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-white text-3xl font-black italic uppercase tracking-tighter">Current Archive</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-white/30 hover:text-orange-500 transition-colors">
            <X size={32} strokeWidth={1} />
          </button>
        </div>

        {/* Scrollable Items */}
        <div className="flex-grow overflow-y-auto space-y-8 no-scrollbar">
          {cart.length === 0 ? (
            <p className="text-zinc-700 font-black italic uppercase text-center mt-20">Your archive is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-6 items-center group">
                <div className="w-24 h-24 bg-white/5 rounded-2xl overflow-hidden flex-shrink-0 border border-white/5 group-hover:border-orange-500/30 transition-colors">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                </div>
                <div className="flex-grow">
                  <h4 className="text-white font-black italic uppercase text-lg leading-none mb-1">{item.name}</h4>
                  <p className="text-orange-500 text-sm font-bold">{item.price}</p>
                  <div className="flex items-center gap-4 mt-3 text-white/40">
                    <span className="text-[10px] font-black uppercase tracking-widest">Qty: {item.quantity}</span>
                    <button onClick={() => removeFromCart(item.id)} className="hover:text-red-500 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-white/5 mt-auto">
          <div className="flex justify-between items-end mb-8">
            <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">Total Value</span>
            <span className="text-white text-4xl font-black italic tracking-tighter uppercase">R{totalPrice.toFixed(2)}</span>
          </div>
          
          {/* 4. Add the onClick handler here */}
          <button 
            onClick={handleGoToCheckout}
            disabled={cart.length === 0}
            className="w-full py-6 bg-white text-black font-black uppercase rounded-2xl hover:bg-orange-500 hover:text-white transition-all active:scale-95 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cart.length === 0 ? 'Archive Empty' : 'Secure Checkout'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;