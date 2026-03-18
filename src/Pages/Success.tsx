import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti'; // Optional: npm install canvas-confetti

const Success = () => {
  useEffect(() => {
    // Trigger a subtle 'Raw' themed confetti or animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f97316', '#ffffff', '#18181b']
    });
  }, []);

  const orderID = Math.random().toString(36).toUpperCase().substring(2, 12);

  return (
    <div className="bg-black min-h-screen text-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-zinc-900/30 border border-white/5 rounded-[50px] p-12 text-center backdrop-blur-3xl animate-in zoom-in-95 duration-700">
        <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(249,115,22,0.3)]">
          <CheckCircle2 size={40} className="text-white" />
        </div>

        <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-4">
          Transaction <br /> <span className="text-orange-500">Confirmed</span>
        </h1>
        
        <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.3em] mb-12">
          Order ID: RAW-{orderID}
        </p>

        <div className="bg-black/40 rounded-3xl p-8 mb-12 border border-white/5 text-left space-y-4">
          <div className="flex items-center gap-4 text-sm font-bold italic">
            <Package className="text-orange-500" size={18} />
            <span>Archive Preparation Initialized</span>
          </div>
          <p className="text-zinc-500 text-xs leading-relaxed uppercase tracking-widest">
            Your items are being pulled from the vaults. A shipping manifest has been dispatched to your encrypted email.
          </p>
        </div>

        <Link 
          to="/shop" 
          className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-2xl font-black italic uppercase hover:bg-orange-500 hover:text-white transition-all active:scale-95"
        >
          Return to Archive <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
};

export default Success;