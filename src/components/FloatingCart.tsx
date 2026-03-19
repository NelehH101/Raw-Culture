import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const FloatingCart = () => {
  const { totalItems, setIsCartOpen, isCartOpen } = useCart();

  // Hide the floating button if the cart drawer is already open
  if (isCartOpen) return null;

  return (
    <button
      onClick={() => setIsCartOpen(true)}
      className="fixed bottom-23 left-6 z-[150] group flex items-center justify-center"
      aria-label="Open Cart"
    >
      {/* Outer Glow/Pulse Ring (Only shows if cart has items) */}
      {totalItems > 0 && (
        <span className="absolute inset-0 rounded-full bg-orange-500/20 animate-ping duration-[2000ms]" />
      )}

      {/* Main Button Body */}
      <div className="relative flex items-center justify-center w-16 h-16 bg-zinc-950 border border-white/10 rounded-full shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:border-orange-500/50 group-active:scale-95">
        
        {/* The Icon */}
        <ShoppingBag 
          size={24} 
          className={`transition-colors duration-500 ${totalItems > 0 ? 'text-orange-500' : 'text-white'}`} 
        />

        {/* Item Counter Badge */}
        {totalItems > 0 && (
          <div className="absolute -top-1 -right-1 flex items-center justify-center min-w-[22px] h-[22px] px-1 bg-orange-500 text-white text-[10px] font-black italic rounded-full shadow-[0_0_15px_rgba(249,115,22,0.4)] animate-in zoom-in duration-300">
            {totalItems}
          </div>
        )}
      </div>

      {/* Hover Label */}
      <span className="absolute left-20 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 text-white text-[10px] font-black uppercase tracking-widest py-2 px-4 rounded-lg pointer-events-none border border-white/5 whitespace-nowrap">
        View Archive
      </span>
    </button>
  );
};

export default FloatingCart;