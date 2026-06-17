'use client';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: textured
// Divider Style: D-RULE
// Typography Personality: mono-accent

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Shield, 
  Scissors, 
  PenTool, 
  Users, 
  Heart, 
  Clock, 
  ArrowRight, 
  Loader2, 
  CheckCheck, 
  ImageOff, 
  Menu, 
  X, 
  Instagram, 
  MessageSquare 
} from 'lucide-react';

// === SAFE IMAGE COMPONENT ===
function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-[#1A1A1A]/80 to-[#8B5A2B]/20 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

// === SCROLL REVEAL HOOK ===
const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

export default function Home() {
  // Navigation & Scroll State
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Contact Form State
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  // Section Refs for Animation Map
  const heroReveal = useScrollReveal(0.05);
  const featuresReveal = useScrollReveal(0.15);
  const productsReveal = useScrollReveal(0.1);
  const processReveal = useScrollReveal(0.15);
  const aboutReveal = useScrollReveal(0.15);
  const testimonialsReveal = useScrollReveal(0.15);
  const contactReveal = useScrollReveal(0.15);

  // Map Icons Dynamically
  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield': return <Shield className="text-[#C19A6B]" size={24} />;
      case 'Scissors': return <Scissors className="text-[#C19A6B]" size={24} />;
      case 'PenTool': return <PenTool className="text-[#C19A6B]" size={24} />;
      default: return <Shield className="text-[#C19A6B]" size={24} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] selection:bg-[#C19A6B]/30 selection:text-white">
      
      {/* === HEADER === */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#1A1A1A]/95 backdrop-blur-xl shadow-xl py-4 border-b border-white/5' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-[#C19A6B] flex items-center justify-center font-heading font-bold text-black text-xl tracking-tighter">
              H
            </div>
            <span className="font-heading text-xl font-bold tracking-widest text-white group-hover:text-[#C19A6B] transition-colors duration-300">
              HIDESMITH
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#hero" className="text-white/75 hover:text-[#C19A6B] font-mono text-xs tracking-widest uppercase transition-colors">Home</a>
            <a href="#features" className="text-white/75 hover:text-[#C19A6B] font-mono text-xs tracking-widest uppercase transition-colors">Craft</a>
            <a href="#products" className="text-white/75 hover:text-[#C19A6B] font-mono text-xs tracking-widest uppercase transition-colors">Gallery</a>
            <a href="#about" className="text-white/75 hover:text-[#C19A6B] font-mono text-xs tracking-widest uppercase transition-colors">Our Story</a>
            <a href="#contact" className="bg-[#C19A6B] text-black px-6 py-2.5 rounded-full font-mono text-xs font-bold tracking-wider hover:brightness-110 transition duration-300">
              Order Bespoke
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-white hover:text-[#C19A6B] transition-colors">
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden flex justify-end">
          <div className="w-[75%] max-w-sm bg-[#1A1A1A] h-full p-8 flex flex-col justify-between border-l border-white/10 shadow-2xl relative">
            <div>
              <div className="flex items-center justify-between mb-12">
                <span className="font-heading text-lg font-bold tracking-widest text-[#C19A6B]">HIDESMITH</span>
                <button onClick={() => setMobileMenuOpen(false)} className="text-white/60 hover:text-white">
                  <X size={24} />
                </button>
              </div>
              <nav className="flex flex-col gap-6">
                <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="text-xl font-heading text-white hover:text-[#C19A6B] transition-colors">Home</a>
                <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-xl font-heading text-white hover:text-[#C19A6B] transition-colors">The Standard</a>
                <a href="#products" onClick={() => setMobileMenuOpen(false)} className="text-xl font-heading text-white hover:text-[#C19A6B] transition-colors">Signature Pieces</a>
                <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-xl font-heading text-white hover:text-[#C19A6B] transition-colors">Our Story</a>
              </nav>
            </div>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="bg-[#C19A6B] text-black w-full py-4 text-center rounded-xl font-mono text-sm font-bold tracking-widest hover:brightness-110 transition duration-300">
              ORDER BESPOKE
            </a>
          </div>
        </div>
      )}


      {/* === HERO SECTION (HR-A Variant) === */}
      <section id="hero" ref={heroReveal.ref} className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-[#1A1A1A] via-[#1A1A1A]/95 to-[#8B5A2B]/10 px-6 overflow-hidden pt-24">
        <div className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] bg-[#8B5A2B]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-[#C19A6B]/5 rounded-full blur-[80px] pointer-events-none" />
        
        {/* Layered Textured Hero Background Integration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.12] max-w-5xl max-h-[70vh] rounded-[3xl] overflow-hidden rotate-2 pointer-events-none">
          <SafeImage src="https://images.unsplash.com/photo-1631396326628-3105f48b6f2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" alt="Bespoke Workspace" fill className="object-cover" priority />
        </div>

        <div className={`relative z-10 text-center max-w-4xl mx-auto transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="font-heading text-5xl md:text-8xl font-black text-white leading-[1.05] tracking-tight">
            Bespoke Leather Goods <span className="text-[#C19A6B]">Made to Last</span> a Lifetime
          </h1>
          <p className="text-white/60 mt-8 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-sans">
            Meticulously handcrafted in Lagos, combining rugged refinement with raw heritage craftsmanship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a href="#products" className="bg-[#C19A6B] text-black px-10 py-4 font-bold text-sm tracking-wider uppercase hover:brightness-110 hover:scale-105 transition-all duration-300 rounded-full">
              Explore the Collection
            </a>
            <a href="#about" className="border border-white/20 text-white px-10 py-4 font-medium text-sm tracking-wider uppercase hover:bg-white/5 transition-all duration-300 rounded-full">
              The Craft Story
            </a>
          </div>
        </div>
      </section>


      {/* === TRANSITION DIVIDER === */}
      <div className="py-16 flex items-center gap-8 px-8 max-w-6xl mx-auto">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C19A6B]/40 to-transparent" />
        <span className="text-[#C19A6B] font-mono text-xs tracking-[0.4em] uppercase whitespace-nowrap opacity-75">
          BUILT BY HAND, BUILT TO LAST.
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C19A6B]/40 to-transparent" />
      </div>


      {/* === FEATURES SECTION (F-NUMBERED Variant) === */}
      <section id="features" ref={featuresReveal.ref} className="py-28 px-6 bg-[#1A1A1A] relative">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <p className="text-[#C19A6B] font-mono text-xs tracking-[0.3em] uppercase mb-3">THE HIDESMITH STANDARD</p>
            <h2 className="font-heading text-4xl md:text-6xl font-black text-white">No shortcuts. No synthetic fillers. Just raw, honest craftsmanship.</h2>
          </div>
          
          <div className="divide-y divide-white/10 border-t border-b border-white/10">
            {[
              { title: "Full-Grain Leather", description: "We source the highest quality local and imported hides that age gracefully, developing a rich patina.", icon: "Shield" },
              { title: "Saddle Stitched by Hand", description: "Every single stitch is sewn meticulously using traditional hand methods that outlast machine stitching.", icon: "Scissors" },
              { title: "Bespoke Tailoring", description: "Personalize your hardware, pocket configurations, and monogram for an heirloom built uniquely for you.", icon: "PenTool" }
            ].map((f, i) => (
              <div key={i} className={`py-12 flex flex-col md:flex-row items-start gap-10 transition-all duration-1000 ${featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 150}ms` }}>
                <span className="font-mono text-[#C19A6B]/40 text-4xl font-black tracking-tighter shrink-0 w-16">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">{f.title}</h3>
                  <p className="text-white/50 text-base md:text-lg max-w-xl leading-relaxed">{f.description}</p>
                </div>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center shrink-0 text-[#C19A6B]/80 hover:bg-[#C19A6B]/10 transition-colors">
                  {getFeatureIcon(f.icon)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* === PRODUCTS SECTION (P-ASYMMETRIC Variant) === */}
      <section id="products" ref={productsReveal.ref} className="py-28 px-6 bg-[#212121]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-[#C19A6B] font-mono text-xs tracking-[0.3em] uppercase mb-3">OUR SIGNATURE PIECES</p>
              <h2 className="font-heading text-4xl md:text-6xl font-black text-white max-w-lg leading-tight">
                Individually handcrafted and numbered essentials.
              </h2>
            </div>
            <p className="text-white/40 max-w-xs text-sm md:text-base md:text-right font-sans leading-relaxed">
              Every single piece is prepared to order in our local studio, carrying its own stamp of origin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Featured Product: The Vanguard Duffle */}
            <div className={`md:col-span-7 group relative rounded-3xl overflow-hidden border border-white/10 hover:border-[#C19A6B]/50 transition-all duration-700 ${productsReveal.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="relative h-[480px]">
                <SafeImage src="https://images.unsplash.com/photo-1644258676710-ffb99d7d7a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" alt="The Vanguard Duffle" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-0 p-8 w-full">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="font-mono text-xs text-[#C19A6B] uppercase tracking-wider block mb-2">01 / Featured Duffle</span>
                      <h3 className="font-heading text-3xl font-black text-white">The Vanguard Duffle</h3>
                    </div>
                    <span className="text-[#C19A6B] font-heading text-2xl font-bold">₦420,000</span>
                  </div>
                  <p className="text-white/60 text-sm md:text-base mt-3 max-w-md leading-relaxed font-sans">
                    Indestructible full-grain leather travel duffle featuring brass hardware and a lifetime warranty.
                  </p>
                  <a href="#contact" className="inline-block mt-6 bg-[#C19A6B] text-black px-6 py-2.5 rounded-full font-mono text-xs font-bold tracking-wider hover:brightness-110 transition">
                    ORDER THIS PIECE
                  </a>
                </div>
              </div>
            </div>

            {/* Side Grid Products */}
            <div className="md:col-span-5 grid grid-rows-2 gap-6">
              {[
                { name: "Saddleback Messenger", price: "₦185,000", description: "Structured, heritage-grade shoulder bag.", url: "https://images.unsplash.com/photo-1647502210988-19681f03a7a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
                { name: "Minimalist Billfold Wallet", price: "₦38,000", description: "Sleek, hand-stitched deep charcoal carry.", url: "https://images.unsplash.com/photo-1629958513881-a086d21383cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" }
              ].map((p, i) => (
                <div key={i} className={`group relative rounded-3xl overflow-hidden border border-white/10 hover:border-[#C19A6B]/50 transition-all duration-700 ${productsReveal.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: `${(i + 1) * 200}ms` }}>
                  <div className="relative h-[228px]">
                    <SafeImage src={p.url} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 p-6 w-full">
                      <div className="flex justify-between items-end">
                        <div>
                          <h3 className="font-heading text-xl font-bold text-white">{p.name}</h3>
                          <p className="text-white/50 text-xs mt-1 font-sans">{p.description}</p>
                        </div>
                        <div className="text-right ml-4 shrink-0">
                          <span className="text-[#C19A6B] font-heading font-black block">{p.price}</span>
                          <a href="#contact" className="text-xs text-white/50 hover:text-[#C19A6B] font-mono tracking-widest uppercase transition-colors mt-1 block">Order →</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fourth Product - Cardholder Accent Panel */}
          <div className={`mt-6 p-6 rounded-3xl bg-[#1A1A1A] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 transition-all duration-700 ${productsReveal.isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 relative rounded-2xl overflow-hidden shrink-0">
                <SafeImage src="https://images.unsplash.com/photo-1531190260877-c8d11eb5afaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" alt="The Scout Cardholder" fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-heading text-lg font-bold text-white">The Scout Cardholder</h4>
                <p className="text-white/40 text-xs font-sans">Ultra-slim, premium card companion hand-cut from vegetable-tanned leather.</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-[#C19A6B] font-heading text-xl font-bold">₦35,000</span>
              <a href="#contact" className="bg-white/5 text-white hover:bg-[#C19A6B] hover:text-black border border-white/15 px-6 py-2 rounded-full font-mono text-xs font-bold transition duration-300">
                Purchase
              </a>
            </div>
          </div>

        </div>
      </section>


      {/* === PROCESS SECTION (Timeline Variant) === */}
      <section ref={processReveal.ref} className="py-28 px-6 bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-20">
            <p className="text-[#C19A6B] font-mono text-xs tracking-[0.3em] uppercase mb-3">THE ART OF HANDCRAFTING</p>
            <h2 className="font-heading text-4xl md:text-6xl font-black text-white">How we turn premium hides into lifelong companions</h2>
          </div>
          
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#C19A6B]/40 via-[#8B5A2B]/20 to-transparent hidden md:block" />
            <div className="space-y-12">
              {[
                { number: "01", title: "Pattern Drafting & Selection", description: "Each commission begins on the workbench. Hides are inspected raw under direct light, selecting cuts with perfect natural grain structure." },
                { number: "02", title: "The Traditional Saddle Stitch", description: "Using thick waxed thread and two needles, we pass through each awl-punched hole in opposing directions. A stitch that never unravels." },
                { number: "03", title: "Edge Burnishing & Sealing", description: "No synthetic coatings are used. Edge lines are painstakingly hand-beveled, rubbed with organic beeswax, and polished to a glassy sheen." }
              ].map((step, i) => (
                <div key={i} className={`flex gap-8 items-start group transition-all duration-1000 ${processReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                  <div className="w-12 h-12 rounded-full bg-[#8B5A2B]/10 border border-[#C19A6B]/30 flex items-center justify-center shrink-0 relative z-10 group-hover:bg-[#C19A6B] group-hover:border-[#C19A6B] transition-all duration-300">
                    <span className="font-mono font-black text-[#C19A6B] group-hover:text-black transition-colors text-sm">
                      {step.number}
                    </span>
                  </div>
                  <div className="pt-2">
                    <h3 className="font-heading text-2xl font-bold text-white group-hover:text-[#C19A6B] transition-colors duration-300">{step.title}</h3>
                    <p className="text-white/50 mt-2 text-base leading-relaxed max-w-xl font-sans">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* === ABOUT SECTION (Story + Stats Variant V9) === */}
      <section id="about" ref={aboutReveal.ref} className="py-28 px-6 bg-[#161616] relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#8B5A2B]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-16 items-center">
          
          <div className={`md:col-span-7 transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <p className="text-[#C19A6B] font-mono text-xs tracking-[0.3em] uppercase mb-4">THE HIDESMITH STORY</p>
            <h2 className="font-heading text-4xl md:text-6xl font-black text-white leading-none mb-8">
              True Leathercrafting Resurrected.
            </h2>
            <p className="text-white/60 text-lg leading-relaxed font-sans mb-8">
              Born in the heart of Lagos, Hidesmith Leather Co. was founded on a simple premise: modern accessories are built too cheap, and discarded too fast. We returned to the bench, to the knives, and the heavy threads. 
            </p>
            <p className="text-white/50 text-base leading-relaxed font-sans">
              Every bag and wallet that leaves our studio is hand-cut, hand-punched, and saddle-stitched by skilled hands committed to the preservation of true leathercraft.
            </p>
          </div>

          <div className="md:col-span-5 grid grid-cols-1 gap-6">
            {[
              { number: "14k+", label: "Community Followers", icon: <Users size={20} className="text-[#C19A6B]" /> },
              { number: "100%", label: "Saddle Stitched by Hand", icon: <Heart size={20} className="text-[#C19A6B]" /> },
              { number: "15+", label: "Artisan Hours per Duffle", icon: <Clock size={20} className="text-[#C19A6B]" /> }
            ].map((stat, i) => (
              <div key={i} className={`p-6 rounded-3xl bg-[#1A1A1A] border border-white/10 flex items-center gap-6 transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="w-12 h-12 rounded-2xl bg-[#8B5A2B]/15 border border-[#C19A6B]/25 flex items-center justify-center shrink-0">
                  {stat.icon}
                </div>
                <div>
                  <p className="font-heading text-3xl font-black text-white">{stat.number}</p>
                  <p className="text-white/40 text-xs font-mono uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* === TESTIMONIALS SECTION (T-MASONRY Variant) === */}
      <section ref={testimonialsReveal.ref} className="py-28 px-6 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#C19A6B] font-mono text-xs tracking-[0.3em] uppercase mb-3">CARRIED AROUND THE WORLD</p>
            <h2 className="font-heading text-4xl md:text-6xl font-black text-white">Heirlooms on the Move</h2>
          </div>
          
          <div className="columns-1 md:columns-3 gap-6 space-y-6">
            {[
              { name: "Tunde Alao", text: "The Vanguard Duffle is a true masterpiece. Took it on three international flights already and it looks even better with age.", role: "Frequent Traveler" },
              { name: "Chioma Nwachukwu", text: "Exquisite hand-stitching on my custom saddle bag. The tan shade is incredibly rich and coordinates with everything.", role: "Creative Director" },
              { name: "Femi Balogun", text: "Incredible craftsmanship right here in Lagos. Better structural integrity than any imported designer wallet I've owned.", role: "Architect" }
            ].map((t, i) => (
              <div key={i} className={`break-inside-avoid bg-gradient-to-br from-white/5 to-white/2 p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-[#C19A6B]/25 transition-all duration-500 transition-all duration-700 ${testimonialsReveal.isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'}`}
                style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#8B5A2B]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="text-white/80 text-base md:text-lg leading-relaxed relative z-10 italic">&ldquo;{t.text}&rdquo;</p>
                
                <div className="flex items-center justify-between border-t border-white/10 pt-5 mt-6 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#8B5A2B]/20 flex items-center justify-center text-[#C19A6B] font-bold text-sm border border-[#C19A6B]/25">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-heading font-bold text-white leading-tight">{t.name}</p>
                      <p className="text-white/40 text-xs mt-0.5 font-sans">{t.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    {[1, 2, 3].map(n => <div key={n} className="w-1.5 h-1.5 rounded-full bg-[#C19A6B]/60" />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* === CONTACT SECTION (C3 Minimal Centered + Universal Form) === */}
      <section id="contact" ref={contactReveal.ref} className="py-28 px-6 bg-[#161616]">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[#C19A6B] font-mono text-xs tracking-[0.4em] uppercase mb-4 opacity-70">CONTACT</p>
          <h2 className="font-heading text-4xl md:text-6xl font-black text-white mb-6">Commission Your Heirloom</h2>
          <p className="text-white/50 mb-12 text-base md:text-lg font-sans">
            Bespoke leather bags, wallets, and accessories handcrafted to order in Lagos, blending rugged refinement with timeless functionality.
          </p>
          
          <div className={`text-left transition-all duration-1000 ${contactReveal.isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            {sent ? (
              <div className="flex flex-col items-center justify-center p-12 text-center animate-scaleIn bg-[#0d0d0d] rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#8B5A2B]/10 to-transparent opacity-50" />
                <div className="w-20 h-20 rounded-full bg-[#8B5A2B]/20 flex items-center justify-center mb-6 border border-[#C19A6B]/40 relative z-10 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  <CheckCheck size={32} className="text-[#C19A6B]" />
                </div>
                <h3 className="font-heading text-3xl font-black text-white mb-3 relative z-10">Message Sent</h3>
                <p className="text-white/60 max-w-sm text-base relative z-10">Thank you. Our team will review your inquiry and respond shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 bg-[#0d0d0d] p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B5A2B]/10 blur-[80px] rounded-full pointer-events-none" />
                <div className="relative z-10">
                  <h3 className="font-heading text-2xl font-bold text-white mb-8">Send an Inquiry</h3>
                  <div className="space-y-4">
                    {(['name', 'email', 'phone'] as const).map(field => (
                      <div key={field} className="relative group">
                        <input
                          type={field === 'email' ? 'email' : 'text'}
                          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                          value={form[field]}
                          onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                          required={field !== 'phone'}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/40 text-sm outline-none transition-all duration-300 focus:bg-white/10 focus:border-[#C19A6B] focus:ring-1 focus:ring-[#C19A6B] group-hover:border-white/20"
                        />
                      </div>
                    ))}
                    <div className="relative group">
                      <textarea rows={4} placeholder="Your message"
                        value={form.message}
                        onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/40 text-sm outline-none resize-none transition-all duration-300 focus:bg-white/10 focus:border-[#C19A6B] focus:ring-1 focus:ring-[#C19A6B] group-hover:border-white/20"
                      />
                    </div>
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full mt-8 bg-[#C19A6B] text-black py-4 rounded-xl font-bold text-base hover:brightness-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center gap-3 group">
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="animate-spin" size={20} /> Processing...
                      </span>
                    ) : (
                      <>
                        Send Message <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>


      {/* === FOOTER === */}
      <footer className="bg-[#0D0D0D] border-t border-white/5 pt-20 pb-12 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 relative z-10">
          
          <div className="space-y-4 md:col-span-2">
            <span className="font-heading text-2xl font-bold tracking-widest text-white">HIDESMITH</span>
            <p className="text-white/40 text-sm max-w-sm font-sans leading-relaxed">
              Bespoke leather bags, wallets, and accessories handcrafted to order in Lagos. Blending rugged refinement with timeless functionality.
            </p>
            {/* Regional Slang Usage (15% intensity - one secondary location only) */}
            <p className="text-[#C19A6B]/80 font-mono text-xs tracking-wider">
              Sharp delivery, nationwide. Crafted in Lagos, sorted for life.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#C19A6B] mb-6">Explore</h4>
            <ul className="space-y-3 font-sans text-sm text-white/50">
              <li><a href="#hero" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">The Standard</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Signature Pieces</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Our Story</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#C19A6B] mb-6">Contact & Socials</h4>
            <div className="space-y-4">
              <a href="https://wa.me/c/2348023456789" className="flex items-center gap-3 text-white/50 hover:text-[#C19A6B] transition-colors group">
                <MessageSquare size={16} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm">wa.me/c/2348023456789</span>
              </a>
              <a href="https://instagram.com/hidesmith.ng" className="flex items-center gap-3 text-white/50 hover:text-[#C19A6B] transition-colors group">
                <Instagram size={16} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm">@hidesmith.ng</span>
              </a>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          <p className="text-white/30 text-xs font-mono">
            &copy; {new Date().getFullYear()} HIDESMITH LEATHER CO. ALL RIGHTS RESERVED.
          </p>
          <p className="text-white/35 text-xs font-mono tracking-widest uppercase">
            LAGOS, NIGERIA
          </p>
        </div>
      </footer>

    </div>
  );
}