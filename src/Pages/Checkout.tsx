import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { 
  ArrowLeft, ShieldCheck, Trash2, 
  Package, Loader2, CheckCircle2, ArrowRight 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import confetti from 'canvas-confetti';

const Checkout = () => {
  const { cart, totalPrice, totalItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  
  // States for transaction flow
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [currentOrderID, setCurrentOrderID] = useState('');

  // Protection: Redirect if cart is empty (unless we just finished an order)
  useEffect(() => {
    if (cart.length === 0 && status === 'idle') {
      navigate('/shop');
    }
  }, [cart, navigate, status]);

  const handleExecuteTransaction = () => {
    if (cart.length === 0) return;
    
    setStatus('processing');

    // 1. Generate unique Archive ID
    const newID = `RAW-${Math.random().toString(36).toUpperCase().substring(2, 12)}`;
    setCurrentOrderID(newID);

    // 2. Prepare the Order Manifest for History
    const orderSnapshot = {
      id: newID,
      date: new Date().toLocaleDateString('en-US', { 
        month: 'long', day: '2-digit', year: 'numeric' 
      }).toUpperCase(),
      status: "PROCESSING",
      progress: 25, // Starting stage
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        img: item.image, 
        qty: item.quantity
      })),
      total: totalPrice.toFixed(2)
    };

    // 3. Simulate Secure Handshake (3 seconds)
    setTimeout(() => {
      // --- LOGIC: SAVE TO HISTORY ARRAY ---
      const existingHistory = JSON.parse(localStorage.getItem('raw_order_history') || '[]');
      const updatedHistory = [orderSnapshot, ...existingHistory]; // Add to top of list
      localStorage.setItem('raw_order_history', JSON.stringify(updatedHistory));
      
      // Clear active cart context
      clearCart();

      // Trigger Success UI
      setStatus('success');

      // Trigger Archive-themed Confetti
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f97316', '#ffffff', '#18181b']
      });
    }, 3000);
  };

  // --- VIEW: SUCCESS OVERLAY ---
  if (status === 'success') {
    return (
      <div className="bg-black min-h-screen text-white flex items-center justify-center p-6 no-scrollbar">
        <div className="max-w-2xl w-full bg-zinc-900/30 border border-white/5 rounded-[50px] p-12 text-center backdrop-blur-3xl animate-in zoom-in-95 duration-700">
          <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(249,115,22,0.3)]">
            <CheckCircle2 size={40} className="text-white" />
          </div>

          <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-4 leading-none">
            Transaction <br /> <span className="text-orange-500">Confirmed</span>
          </h1>
          
          <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.3em] mb-12">
            Order ID: {currentOrderID}
          </p>

          <div className="bg-black/40 rounded-3xl p-8 mb-12 border border-white/5 text-left space-y-4">
            <div className="flex items-center gap-4 text-sm font-bold italic">
              <Package className="text-orange-500" size={18} />
              <span>Archive Preparation Initialized</span>
            </div>
            <p className="text-zinc-500 text-[10px] leading-relaxed uppercase tracking-widest">
              Your items are being pulled from the vaults. Your manifest has been permanently added to your order history.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Link 
              to="/trackorders" 
              className="inline-flex items-center justify-center gap-3 bg-orange-500 text-white px-10 py-5 rounded-2xl font-black italic uppercase transition-all active:scale-95 shadow-[0_10px_30px_rgba(249,115,22,0.2)]"
            >
              View History Manifest <ArrowRight size={18} />
            </Link>
            
            <Link 
              to="/shop" 
              className="inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 rounded-2xl font-black italic uppercase hover:bg-zinc-200 transition-all"
            >
              Return to Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW: STANDARD CHECKOUT ---
  return (
    <div className="bg-black min-h-screen text-white flex flex-col no-scrollbar font-sans">
      <NavBar />
      <main className="max-w-[1200px] mx-auto px-6 pt-32 pb-20 w-full flex flex-col gap-12">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
          <div>
            <Link to="/shop" className="text-zinc-500 hover:text-white flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-6 transition-all group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
              Back to Archive
            </Link>
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.8]">
              Final <br /> <span className="text-orange-500">Checkout</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full h-fit">
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse bg-orange-500`} />
            <span className="text-[9px] font-black uppercase tracking-widest text-orange-500">
              Secure Line Active
            </span>
          </div>
        </div>

        {/* MANIFEST LIST */}
        <section className="bg-zinc-900/30 border border-white/5 rounded-[40px] p-8 md:p-12 backdrop-blur-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none">
            <Package size={200} />
          </div>
          <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-10">Dispatch Manifest [{totalItems}]</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[400px] overflow-y-auto pr-2 no-scrollbar mb-10">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-6 items-center bg-zinc-950/50 p-5 rounded-3xl border border-white/5 group">
                <div className="w-20 h-20 bg-black rounded-2xl p-2 flex-shrink-0 border border-white/5 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-grow">
                  <h4 className="text-white font-black italic uppercase text-sm leading-none mb-1">{item.name}</h4>
                  <p className="text-orange-500 font-bold text-xs">{item.price}</p>
                </div>
                {status === 'idle' && (
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="p-2 text-zinc-700 hover:text-red-500 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="pt-10 border-t border-white/5 flex justify-between items-end">
            <span className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">Total Vault Value</span>
            <p className="text-5xl font-black italic tracking-tighter text-white">R {totalPrice.toFixed(2)}</p>
          </div>
        </section>

        {/* EXECUTE BUTTON */}
        <section className="bg-zinc-900/10 border border-white/5 rounded-[40px] p-8 md:p-12">
          <button 
            onClick={handleExecuteTransaction}
            disabled={status !== 'idle'}
            className={`w-full group py-8 rounded-[2.5rem] font-black italic uppercase text-xl transition-all flex items-center justify-center gap-4 shadow-2xl overflow-hidden relative
              ${status === 'processing' ? 'bg-zinc-800 text-zinc-500 cursor-wait' : 'bg-white text-black hover:bg-orange-500 hover:text-white'}`}
          >
            <span className="relative z-10">
              {status === 'idle' && "Execute Transaction"}
              {status === 'processing' && "Verifying Handshake..."}
            </span>
            {status === 'processing' ? (
              <Loader2 className="animate-spin relative z-10" />
            ) : (
              <ShieldCheck size={26} className="relative z-10 group-hover:rotate-12 transition-transform" />
            )}
            
            {/* Hover Gradient Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400 transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
          </button>
          
          <p className="text-center mt-6 text-[8px] text-zinc-700 font-black uppercase tracking-[0.4em]">
             Global Logistics Protocol // Secure Archival Transmission
          </p>
        </section>
      </main>
    </div>
  );
};

export default Checkout;