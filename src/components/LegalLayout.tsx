import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

interface LegalLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const LegalLayout = ({ title, subtitle, children }: LegalLayoutProps) => {
  return (
    <div className="bg-black min-h-screen text-white no-scrollbar font-sans">
      <NavBar />
      <main className="pt-32 pb-24 px-6 md:px-20 max-w-[1000px] mx-auto">
        <div className="border-b border-white/10 pb-12 mb-16">
          <h1 className="text-[10vw] md:text-[6rem] font-black italic uppercase leading-[0.8] tracking-tighter">
            {title} <br/> <span className="text-orange-500">{subtitle}</span>
          </h1>
          <p className="mt-8 font-mono text-zinc-500 text-[10px] tracking-[0.4em] uppercase">
            Protocol Updated: March 2026 // Archive Status: Secure
          </p>
        </div>
        
        <div className="prose prose-invert prose-orange max-w-none 
          prose-h3:uppercase prose-h3:italic prose-h3:font-black prose-h3:tracking-tighter prose-h3:text-2xl
          prose-p:text-zinc-400 prose-p:text-sm prose-p:leading-relaxed prose-p:uppercase prose-p:tracking-widest
          prose-li:text-zinc-500 prose-li:text-xs prose-li:uppercase">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegalLayout;