import { Send, Globe, MapPin, ArrowUpRight } from 'lucide-react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <div className="bg-black min-h-screen text-white flex flex-col">
      <NavBar />
      
      {/* Added pb-60 to ensure enough scroll space at the bottom. 
          The flex-grow ensures the footer stays at the bottom even on huge screens.
      */}
      <main className="max-w-[1800px] mx-auto px-6 md:px-20 pt-48 pb-60 flex-grow">
        
        {/* HEADER BLOCK */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
          <div className="space-y-4">
            <span className="text-orange-500 font-black uppercase text-[10px] tracking-[0.5em] block animate-in fade-in slide-in-from-left-4 duration-700">
              // ESTABLISH CONNECTION
            </span>
            <h2 className="text-white text-7xl md:text-9xl font-black italic uppercase leading-[0.8] tracking-tighter animate-in fade-in slide-in-from-bottom-6 duration-1000">
              Get In <br /> <span className="text-orange-500 transition-colors duration-700 cursor-default">Touch</span>
            </h2>
          </div>
          <div className="hidden md:block text-right animate-in fade-in duration-1000 delay-300">
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] max-w-[200px] leading-relaxed">
              Available for <br /> collaborations and <br /> archive inquiries 24/7.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* LEFT: Tactical Info Cards */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-zinc-900/30 border border-white/5 p-10 rounded-[40px] backdrop-blur-md group hover:border-orange-500/30 transition-all duration-500">
              <Globe className="text-orange-500 mb-8 transition-transform group-hover:rotate-12" size={24} />
              <h4 className="text-white font-black italic uppercase text-2xl mb-3 tracking-tighter">Global HQ</h4>
              <p className="text-zinc-500 text-sm font-medium tracking-tight leading-relaxed uppercase">
                Cape Town, South Africa <br /> 
                <span className="text-zinc-700">Available Worldwide.</span>
              </p>
            </div>

            <div className="bg-zinc-900/30 border border-white/5 p-10 rounded-[40px] backdrop-blur-md group hover:border-orange-500/30 transition-all duration-500">
              <MapPin className="text-orange-500 mb-8 transition-transform group-hover:scale-110" size={24} />
              <h4 className="text-white font-black italic uppercase text-2xl mb-6 tracking-tighter">Socials</h4>
              <div className="flex flex-col gap-4">
                {['Instagram', 'Twitter', 'Behance'].map((social) => (
                  <a key={social} href="#" className="text-zinc-500 text-sm font-bold uppercase hover:text-orange-500 flex items-center justify-between group/link transition-colors">
                    {social} <ArrowUpRight size={16} className="opacity-0 group-hover/link:opacity-100 transition-all -translate-x-2 group-hover/link:translate-x-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: High-Contrast Form */}
          <div className="lg:col-span-8 bg-zinc-900/10 border border-white/5 p-8 md:p-20 rounded-[50px] backdrop-blur-2xl">
            <form className="space-y-16" onSubmit={(e) => e.preventDefault()}>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="relative group">
                  <label className="text-[9px] font-black text-orange-500/50 uppercase tracking-widest mb-2 block">Personnel ID</label>
                  <input 
                    type="text" 
                    placeholder="IDENTIFICATION / NAME" 
                    className="w-full bg-transparent border-b border-white/10 py-4 text-white font-black italic placeholder:text-zinc-800 focus:outline-none focus:border-orange-500 transition-colors uppercase tracking-tighter text-xl"
                  />
                </div>
                <div className="relative group">
                  <label className="text-[9px] font-black text-orange-500/50 uppercase tracking-widest mb-2 block">Encrypted Comms</label>
                  <input 
                    type="email" 
                    placeholder="COMS / EMAIL" 
                    className="w-full bg-transparent border-b border-white/10 py-4 text-white font-black italic placeholder:text-zinc-800 focus:outline-none focus:border-orange-500 transition-colors uppercase tracking-tighter text-xl"
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="text-[9px] font-black text-orange-500/50 uppercase tracking-widest mb-2 block">Data Packet</label>
                <textarea 
                  rows={4}
                  placeholder="ENCODE MESSAGE..." 
                  className="w-full bg-transparent border-b border-white/10 py-4 text-white font-black italic placeholder:text-zinc-800 focus:outline-none focus:border-orange-500 transition-colors uppercase tracking-tighter resize-none text-xl"
                />
              </div>

              <div className="pt-4">
                <button className="group relative w-full md:w-auto bg-white hover:bg-orange-500 text-black hover:text-white px-16 py-8 rounded-3xl font-black italic uppercase tracking-tighter flex items-center justify-center gap-6 transition-all duration-500 active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  <span className="text-xl">Dispatch Message</span>
                  <Send size={20} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                </button>
              </div>
            </form>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;