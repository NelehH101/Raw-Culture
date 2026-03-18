import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Package } from 'lucide-react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const TrackOrders = () => {
  const [orderHistory, setOrderHistory] = useState<any[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem('raw_order_history');
    if (savedHistory) {
      const parsed = JSON.parse(savedHistory);
      setOrderHistory(parsed);
      // Automatically expand the most recent order
      if (parsed.length > 0) setExpandedOrder(parsed[0].id);
    }
  }, []);

  const toggleOrder = (id: string) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  return (
    <div className="bg-black min-h-screen text-white no-scrollbar font-sans">
      <NavBar />

      <main className="pt-32 pb-24 px-6 md:px-20 max-w-[1100px] mx-auto min-h-[80vh]">
        {/* HEADER */}
        <div className="mb-16 border-b border-white/10 pb-12">
          <h1 className="text-[10vw] md:text-[6rem] font-black italic uppercase leading-[0.8] tracking-tighter">
            ARCHIVE <br /> <span className="text-orange-500">MANIFESTS</span>
          </h1>
          <p className="mt-8 font-mono text-zinc-500 text-[10px] tracking-[0.4em] uppercase">
            Historical Records Found: {orderHistory.length}
          </p>
        </div>

        {orderHistory.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-white/10 rounded-[40px] opacity-50">
            <p className="text-zinc-600 font-black italic uppercase tracking-widest text-lg">No Protocols Logged</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orderHistory.map((order) => {
              const isExpanded = expandedOrder === order.id;

              return (
                <div
                  key={order.id}
                  className={`border transition-all duration-500 rounded-[32px] overflow-hidden ${isExpanded ? 'border-orange-500/30 bg-zinc-900/40' : 'border-white/5 bg-zinc-900/10 hover:border-white/20'
                    }`}
                >
                  {/* --- LIST ITEM HEADER (Clickable) --- */}
                  <button
                    onClick={() => toggleOrder(order.id)}
                    className="w-full p-8 flex flex-wrap items-center justify-between gap-6 text-left"
                  >
                    <div className="flex items-center gap-6">
                      <div className={`p-4 rounded-2xl transition-colors ${isExpanded ? 'bg-orange-500 text-white' : 'bg-zinc-800 text-zinc-500'}`}>
                        <Package size={20} />
                      </div>
                      <div>
                        <h3 className="text-xl font-black italic uppercase tracking-tighter">{order.id}</h3>
                        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{order.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="hidden md:block text-right">
                        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Amount</p>
                        <p className="text-lg font-black italic">R {order.total}</p>
                      </div>
                      <div className="px-4 py-1 rounded-full border border-white/10 bg-black text-[9px] font-black uppercase tracking-[0.2em] text-orange-500">
                        {order.status}
                      </div>
                      <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                        <ChevronDown className="text-zinc-500" size={20} />
                      </motion.div>
                    </div>
                  </button>

                  {/* --- EXPANDED DETAILS --- */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                      >
                        <div className="px-8 pb-8 pt-4 border-t border-white/5">
                          {/* Progress Tracker */}
                          <div className="py-12 px-4 mb-8 bg-black/40 rounded-[24px] border border-white/5">
                            <div className="relative w-full h-[1px] bg-zinc-800 mb-8">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${order.progress}%` }}
                                className="absolute top-0 left-0 h-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.4)]"
                              />
                              <div className="absolute top-0 w-full flex justify-between -translate-y-1/2">
                                {[0, 1, 2, 3].map((s) => (
                                  <div key={s} className={`w-2 h-2 rounded-full ${(s * 33.3) <= order.progress ? 'bg-orange-500 scale-125' : 'bg-zinc-800'}`} />
                                ))}
                              </div>
                            </div>
                            <div className="flex justify-between text-[8px] font-black uppercase tracking-[0.3em] text-zinc-500">
                              <span>Confirmed</span>
                              <span>Processing</span>
                              <span className="text-orange-500">Dispatched</span>
                              <span>Delivered</span>
                            </div>
                          </div>

                          {/* Items Grid */}
                          <div className="grid grid-cols-1 gap-3 w-full">
                            {order.items.map((item: any) => (
                              <div
                                key={item.id}
                                className="flex gap-6 p-4 rounded-[28px] border border-white/5 items-center w-full group hover:bg-white/[0.02] transition-all duration-500"
                              >
                                {/* Container background and shadow removed for a "floating" effect */}
                                <div className="w-16 h-20 md:w-20 md:h-24 shrink-0 overflow-hidden rounded-lg">
                                  <img
                                    src={item.img}
                                    className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700"
                                    alt={item.name}
                                  />
                                </div>

                                <div className="flex-grow">
                                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pr-4">
                                    <div>
                                      <h4 className="text-md md:text-lg font-black italic uppercase tracking-tighter leading-tight text-white group-hover:text-orange-500 transition-colors">
                                        {item.name}
                                      </h4>
                                      <p className="text-[11px] text-zinc-500 uppercase font-mono mt-1 tracking-[0.2em]">
                                        QTY: {item.qty} // R {item.price}
                                      </p>
                                    </div>

                                    <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-800 md:text-right">
                                      ARCHIVE_ID_{item.id}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="mt-8 flex justify-end gap-4">
                            <button className="px-6 py-3 bg-white text-black text-[9px] font-black uppercase italic tracking-widest hover:bg-orange-500 hover:text-white transition-colors">
                              Download Invoice
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default TrackOrders;