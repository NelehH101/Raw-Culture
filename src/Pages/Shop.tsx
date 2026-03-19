import { useState, useEffect } from 'react';
import { X, ArrowUpRight, ChevronRight } from 'lucide-react';
import NavBar from '../components/NavBar';
import ShopHeader from '../components/ShopHeader';
import ProductCard from '../components/ProductCard';
import CurvedLoop from '../components/Loop';
import { products } from '../data/products';
import FooterSlider from '../components/FooterSlider';
import Footer from '../components/Footer';

const ShopPage = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  
  // Split products: 4 for the top grid, the rest for below the orange block
  const topProducts = products.slice(0, 4);
  const remainingProducts = products.slice(4);

  // Prevent background scroll when category menu is open
  useEffect(() => {
    if (isCategoryOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isCategoryOpen]);

  return (
    <div className="bg-black min-h-screen no-scrollbar overflow-x-hidden">
      <NavBar />
      
      {/* CATEGORY OVERLAY MENU */}
      <div className={`fixed inset-0 z-[500] transition-all duration-700 ${isCategoryOpen ? 'visible' : 'invisible pointer-events-none'}`}>
        <div className={`absolute inset-0 bg-black/90 backdrop-blur-2xl transition-opacity duration-700 ${isCategoryOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsCategoryOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-full md:w-[500px] bg-zinc-950 border-l border-white/5 p-12 transform transition-transform duration-700 ease-out ${isCategoryOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <button onClick={() => setIsCategoryOpen(false)} className="text-white/30 hover:text-orange-500 transition-colors mb-20">
            <X size={40} strokeWidth={1} />
          </button>
          <h2 className="text-white text-5xl font-black italic uppercase tracking-tighter mb-12">Categories</h2>
          <nav className="space-y-4">
            {['Archive', 'Limited', 'Essentials', 'Accessories'].map((cat) => (
              <button key={cat} className="group flex items-center justify-between w-full border-b border-white/5 pb-6 text-zinc-500 hover:text-orange-500 transition-all">
                <span className="text-2xl font-bold uppercase tracking-widest">{cat}</span>
                <ChevronRight className="transform group-hover:translate-x-2 transition-transform" />
              </button>
            ))}
          </nav>
        </div>
      </div>

      <ShopHeader />

      <div className="relative z-10 bg-black py-4">
        <CurvedLoop
          marqueeText="✦ FIND THE ✦ COLLECTION ✦ GET IT RAW ✦ "
          speed={1.5}
          curveAmount={0}
          className="italic font-black text-orange-500 uppercase tracking-[0.3em]"
        />
      </div>

      {/* REDUCED PADDING HERE (pt-6 instead of pt-24) */}
      <main className="max-w-[1800px] mx-auto px-6 md:px-20 pt-6 pb-24">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-12 gap-4">
          <h2 className="text-white text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.9]">
            New <br /> Arrivals
          </h2>
          <span className="text-zinc-500 text-sm font-bold uppercase tracking-[0.2em]">
            {products.length} Items Total
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* VIDEO CARD */}
          <div className="md:col-span-2 md:row-span-2 relative rounded-[40px] overflow-hidden bg-zinc-900 border border-white/5 group h-[600px] md:h-full">
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-60">
              <source src="/2.mp4" type="video/mp4" />
            </video>
            <div className="absolute bottom-12 left-8">
              <h3 className="text-white text-6xl font-black italic uppercase tracking-tight leading-[0.85]">
                The <br /> <span className="text-orange-500">Raw</span> <br /> Collection
              </h3>
            </div>
          </div>

          {/* TOP 4 PRODUCTS */}
          {topProducts.map((item) => (
            <div key={item.id} className="h-[500px]">
              <ProductCard {...item} />
            </div>
          ))}

          {/* ORANGE BLOCK (STRETCHED UNDER PRODUCTS) */}
          <div 
            className="md:col-span-2 relative bg-orange-500 rounded-[40px] p-10 cursor-pointer overflow-hidden transition-all duration-500 hover:bg-orange-600 active:scale-[0.98] flex flex-col justify-between h-[400px]"
            onClick={() => setIsCategoryOpen(true)}
          >
            <div className="absolute inset-6 border border-white/20 rounded-[30px] pointer-events-none" />
            <div className="relative flex justify-end">
              <ArrowUpRight className="text-white" size={48} strokeWidth={3} />
            </div>
            <div className="relative">
              <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.5em] mb-2 block italic">Access_Protocol</span>
              <h2 className="text-white text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.75]">All Products</h2>
            </div>
          </div>

          {/* REMAINING PRODUCTS */}
          {remainingProducts.map((item) => (
            <div key={item.id} className="h-[500px]">
              <ProductCard {...item} />
            </div>
          ))}
        </div>
      </main>

      <FooterSlider />
      <Footer />
    </div>
  );
};

export default ShopPage;