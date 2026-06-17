'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Hammer,
  Shield,
  Activity,
  Award,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ArrowRight,
  Loader2,
  CheckCheck,
  ImageOff,
  Instagram,
  Compass,
  Layers,
  Scissors
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: textured
// Divider Style: D-QUOTE
// Typography Personality: editorial

// ================== CUSTOM HOOKS ==================

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

const useTypewriter = (text: string, speed = 55) => {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplay(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return display;
};

// ================== SAFE IMAGE COMPONENT ==================

function SafeImage({
  src,
  alt,
  fill,
  width,
  height,
  className,
  priority,
  fallbackClassName
}: {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-primary/60 to-secondary/15 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-accent/20" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className}
      priority={priority}
      onError={() => setError(true)}
    />
  );
}

// ================== DATA DEFINITIONS ==================

const BRAND = {
  name: "Hidesmith Leather Co.",
  tagline: "Built by Hand, Built to Last.",
  description: "Bespoke handcrafted leather bags, wallets, and accessories meticulously constructed in Lagos for those who appreciate lifetime durability.",
  industry: "fashion",
  region: "nigeria",
  currency: "₦"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1637759292654-a12cb2be085e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwbGVhdGhlciUyMGNyYWZ0c21hbiUyMHN0aXRjaGluZyUyMGElMjBiYWclMjBjbG9zZSUyMHVwfGVufDF8MHx8fDE3ODE2ODkzNDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
  products: [
    "https://images.unsplash.com/photo-1633655442432-620aa55d7ac1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwyfHxwcmVtaXVtJTIwZmFzaGlvbnxlbnwwfDB8fHwxNzgxNjg5MzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1764065339893-e18c6128c36f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxBcnRpc2FuJTIwYnJvd24lMjBsZWF0aGVyJTIwYnJpZWZjYXNlJTIwb24lMjBkYXJrJTIwd29vZCUyMGJhY2tncm91bmR8ZW58MXwwfHx8MTc4MTY4OTM0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1769981271695-bb3d766ee419?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHw0fHxwcmVtaXVtJTIwZmFzaGlvbnxlbnwwfDB8fHwxNzgxNjg5MzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1639789972200-4c5dafacb6fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxDaGFyY29hbCUyMGJsYWNrJTIwaGFuZCUyMHN0aXRjaEJlbHR8ZW58MXwwfHx8MTc4MTY4OTM0OHww&ixlib=rb-4.1.0&q=80&w=1080"
  ]
};

const PRODUCTS = [
  {
    name: "The Nomad Duffle",
    description: "Full-grain heritage leather travel duffle designed for rugged weekend escapes.",
    price: "₦450,000",
    image: IMAGES.products[0]
  },
  {
    name: "The Ikoyi Briefcase",
    description: "Sleek, structure-hardened carryall with raw hand-stitched detailing.",
    price: "₦350,000",
    image: IMAGES.products[1]
  },
  {
    name: "The Artisan Tote",
    description: "Spacious everyday carry forged from premium vegetable-tanned shoulder cuts.",
    price: "₦180,000",
    image: IMAGES.products[2]
  },
  {
    name: "The Eko Fold Wallet",
    description: "Ultra-slim, hand-sewn cardholder made to weather and patina beautifully.",
    price: "₦35,000",
    image: IMAGES.products[3]
  }
];

const FEATURES = [
  {
    title: "Bespoke Craftsmanship",
    description: "Every single stitch is hand-thrown using thick waxed polyester thread for indestructible seams.",
    iconName: "Hammer"
  },
  {
    title: "Full-Grain Leather",
    description: "We source premium vegetable-tanned hides that wear in, never wear out.",
    iconName: "Shield"
  },
  {
    title: "Lifetime Warranty",
    description: "Our hardware, rivets, and stitching are guaranteed to survive a lifetime of movement.",
    iconName: "Activity"
  }
];

const TESTIMONIALS = [
  {
    name: "Oluwaseun A.",
    text: "The Ikoyi briefcase feels like solid armor. I've used it daily for two years and the patina gets better every week. Truly built like a tank.",
    role: "Creative Director"
  },
  {
    name: "Chidi O.",
    text: "You can smell the absolute quality the moment you unbox. The hand-stitching makes modern designer brand bags look cheap.",
    role: "Architect"
  },
  {
    name: "Fatima Y.",
    text: "Commissioned a custom duffle for travel. The leather is thick, the brass is solid, and the craftsmanship is a masterclass in details.",
    role: "Global Traveler"
  }
];

const STEPS = [
  {
    number: "01",
    title: "Hide Curation",
    description: "We hand-select heavy-grade Nigerian hides, looking specifically for natural characteristics that tell an authentic story."
  },
  {
    number: "02",
    title: "Manual Awl Punching",
    description: "Every seam path is measured and hand-punched with a traditional diamond awl to ensure ultimate visual alignment."
  },
  {
    number: "03",
    title: "Saddle Stitching",
    description: "Constructed using two independent needles crossing on a single wax-braided thread. Stronger than any machine lock-stitch."
  }
];

const STATS = [
  { number: "14k+", label: "Collectors" },
  { number: "100%", label: "Hand Saddle-Stitched" },
  { number: "Lifetime", label: "Guarantee" }
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typewriter Hook
  const typedText = useTypewriter("Bespoke Leather Goods Crafted for Generations.");

  // Section Refs (For Reveal Animations)
  const heroReveal = useScrollReveal(0.1);
  const featuresReveal = useScrollReveal(0.15);
  const productsReveal = useScrollReveal(0.1);
  const processReveal = useScrollReveal(0.15);
  const aboutReveal = useScrollReveal(0.15);
  const testimonialsReveal = useScrollReveal(0.15);
  const contactReveal = useScrollReveal(0.15);

  // Universal Contact Form State
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  // Nav Click Handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white selection:bg-secondary selection:text-primary relative font-sans">
      
      {/* Background Texture Overlay */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-50 mix-blend-overlay" />

      {/* ================== SCROLL-AWARE NAVIGATION ================== */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 border-b ${
        scrolled 
          ? 'bg-[#1E1E1E]/95 backdrop-blur-xl shadow-2xl border-white/5 py-4' 
          : 'bg-transparent border-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo Style L1 - Premium Initial Box */}
          <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="flex items-center gap-3 group">
            <div className="w-10 h-10 border border-secondary flex items-center justify-center font-bold text-lg bg-[#1E1E1E] tracking-tighter text-secondary group-hover:bg-secondary group-hover:text-primary transition-all duration-300">
              H
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-lg leading-none tracking-tight text-white">HIDESMITH</span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-secondary mt-0.5">LEATHER CO.</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { name: "Home", id: "home" },
              { name: "Creed", id: "features" },
              { name: "Collection", id: "products" },
              { name: "Process", id: "process" },
              { name: "About", id: "about" }
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className="text-accent/65 hover:text-white transition-colors duration-300 text-sm font-medium tracking-wide uppercase"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Nav CTA */}
          <div className="hidden md:block">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="border border-secondary text-secondary hover:bg-secondary hover:text-primary transition-all duration-300 font-bold text-xs tracking-widest uppercase px-6 py-2.5 rounded-full"
            >
              Commission Piece
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white/85 hover:text-white transition-colors p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Sidebar (Solid Background) */}
      <div className={`fixed inset-0 bg-[#1E1E1E] z-40 transition-transform duration-500 ease-in-out md:hidden ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full justify-between p-8 pt-24">
          <div className="flex flex-col gap-6">
            {[
              { name: "Home", id: "home" },
              { name: "Creed", id: "features" },
              { name: "Collection", id: "products" },
              { name: "Process", id: "process" },
              { name: "About", id: "about" },
              { name: "Contact", id: "contact" }
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className="font-heading text-4xl font-bold text-accent hover:text-secondary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="border-t border-white/10 pt-8 space-y-4">
            <p className="text-white/40 text-xs uppercase tracking-widest font-mono">Lagos, Nigeria</p>
            <div className="flex gap-4">
              <a href="https://wa.me/c/2348023456789" className="text-secondary hover:text-white transition-colors">WhatsApp</a>
              <a href="https://instagram.com/hidesmith.ng" className="text-secondary hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </div>


      {/* ================== HERO-D: RAW MINIMAL TYPEWRITER ================== */}
      <section
        id="home"
        ref={heroReveal.ref}
        className="min-h-screen flex flex-col justify-center bg-black px-6 overflow-hidden relative pt-20"
      >
        {/* Dynamic Texture Background Grid (Only because of premium style overlay) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Floating Background Image Layer */}
        <div className="absolute inset-0 opacity-15 grayscale mix-blend-screen pointer-events-none transition-transform duration-1000 scale-105">
          <SafeImage src={IMAGES.hero} alt="Artisan at work" fill className="object-cover" priority />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <h1 className="font-heading text-[11vw] md:text-[7vw] font-black text-white leading-none tracking-tighter uppercase italic min-h-[14vw] md:min-h-[9vw]">
            {typedText}<span className="text-secondary animate-pulse">_</span>
          </h1>
          
          <div className={`mt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-10 border-t border-white/10 pt-10 transition-all duration-1000 ${
            heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <p className="text-accent/40 text-base md:text-lg max-w-lg leading-relaxed font-light">
              {BRAND.description} Each piece is meticulously cut, punched, and saddle-stitched by hand in our Lagos workshop.
            </p>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="bg-secondary text-primary px-12 py-5 font-bold text-lg uppercase tracking-wider
                shadow-[6px_6px_0px_rgba(230,222,212,0.15)]
                hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_rgba(230,222,212,0.15)]
                transition-all duration-300 shrink-0"
            >
              Commission Your Piece
            </a>
          </div>
        </div>
      </section>


      {/* ================== DIVIDER 1: D-QUOTE ================== */}
      <div className="py-28 px-8 text-center bg-secondary/[0.03] border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,138,88,0.06),transparent_70%)]" />
        <p className="relative font-heading text-3xl md:text-5xl font-black text-white max-w-3xl mx-auto leading-tight italic">
          &ldquo;{BRAND.tagline}&rdquo;
        </p>
        <p className="relative text-secondary font-mono mt-6 text-xs tracking-[0.4em] uppercase">{BRAND.name}</p>
      </div>


      {/* ================== CREED SECTION (FEATURES): F-NUMBERED ================== */}
      <section id="features" ref={featuresReveal.ref} className="py-28 px-6 bg-[#1E1E1E]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-20 text-left">
            <span className="text-secondary font-mono text-xs tracking-[0.4em] uppercase">The Hidesmith Creed</span>
            <h2 className="font-heading text-4xl md:text-6xl font-black text-white mt-4">Why Hand-Stitched Leather Lasts Longer</h2>
          </div>

          <div className="divide-y divide-white/10">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className={`py-12 flex flex-col md:flex-row items-start gap-10 transition-all duration-700 ${
                  featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className="font-mono text-secondary/30 text-4xl font-black tracking-tighter shrink-0 w-16">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <h3 className="font-heading text-2xl font-bold text-white tracking-tight">{f.title}</h3>
                  <p className="text-accent/50 mt-3 max-w-xl leading-relaxed text-sm md:text-base">{f.description}</p>
                </div>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center shrink-0 text-secondary">
                  {f.iconName === 'Hammer' && <Hammer size={20} />}
                  {f.iconName === 'Shield' && <Shield size={20} />}
                  {f.iconName === 'Activity' && <Activity size={20} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ================== DIVIDER 2: D-RULE ================== */}
      <div className="py-12 flex items-center gap-8 px-8 max-w-6xl mx-auto">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
        <span className="text-secondary font-mono text-xs tracking-[0.4em] uppercase whitespace-nowrap opacity-70">
          The core collection
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
      </div>


      {/* ================== COLLECTION SECTION (PRODUCTS): P-ASYMMETRIC ================== */}
      <section id="products" ref={productsReveal.ref} className="py-28 px-6 bg-black/40">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16">
            <div>
              <span className="text-secondary font-mono text-xs tracking-[0.4em] uppercase">Bespoke Carry</span>
              <h2 className="font-heading text-4xl md:text-6xl font-black text-white mt-4 max-w-md">The Core Collection</h2>
            </div>
            <p className="text-accent/40 max-w-xs mt-4 md:mt-0 md:text-right font-light text-sm md:text-base">
              Meticulously built to order. Each piece is a unique execution of raw aesthetic and rugged functionality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Featured Product Large Left Column */}
            <div className="md:col-span-7 group relative rounded-3xl overflow-hidden bg-[#1E1E1E] border border-white/5 shadow-2xl transition-all duration-500 hover:border-secondary/30">
              <div className="relative h-[480px]">
                <SafeImage
                  src={PRODUCTS[0].image}
                  alt={PRODUCTS[0].name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                <div className="absolute bottom-0 p-8 w-full">
                  <span className="text-secondary font-mono text-xs tracking-widest uppercase mb-1 block">Featured Carry</span>
                  <h3 className="font-heading text-3xl font-black text-white tracking-tight">{PRODUCTS[0].name}</h3>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-3">
                    <p className="text-accent/60 text-sm max-w-sm">{PRODUCTS[0].description}</p>
                    <span className="text-secondary font-black text-2xl shrink-0">{PRODUCTS[0].price}</span>
                  </div>
                  
                  <div className="mt-6 flex gap-4">
                    <a
                      href="#contact"
                      onClick={(e) => handleNavClick(e, 'contact')}
                      className="bg-secondary text-primary px-8 py-3 rounded-full font-bold text-sm hover:brightness-110 transition-all duration-300"
                    >
                      Commission Now
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column Smaller Grid */}
            <div className="md:col-span-5 grid grid-rows-1 gap-6">
              <div className="space-y-6">
                {PRODUCTS.slice(1, 4).map((p, i) => (
                  <div
                    key={i}
                    className="group bg-[#1E1E1E] p-6 rounded-3xl border border-white/5 hover:border-secondary/30 transition-all duration-300 flex items-center gap-6"
                  >
                    <div className="relative w-28 h-28 rounded-2xl overflow-hidden shrink-0 bg-black/40">
                      <SafeImage
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-xl font-bold text-white tracking-tight truncate">{p.name}</h3>
                      <p className="text-accent/40 text-xs mt-1 line-clamp-2">{p.description}</p>
                      
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-secondary font-black text-sm">{p.price}</span>
                        <a
                          href="#contact"
                          onClick={(e) => handleNavClick(e, 'contact')}
                          className="text-xs text-accent/60 hover:text-secondary font-mono transition-colors flex items-center gap-1"
                        >
                          Enquire <ArrowRight size={12} />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ================== PROCESS SECTION (BONUS): STEPS ================== */}
      <section id="process" ref={processReveal.ref} className="py-28 px-6 bg-[#1E1E1E]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-secondary font-mono text-xs tracking-[0.4em] uppercase">Artisanal Workflow</span>
            <h2 className="font-heading text-4xl md:text-6xl font-black text-white mt-4">The Hand-Forging Process</h2>
            <p className="text-accent/40 max-w-lg mx-auto mt-4 font-light text-sm md:text-base">Witness the absolute dedication placed inside every square inch of your piece.</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-secondary/40 via-secondary/10 to-transparent hidden md:block" />
            
            <div className="space-y-16">
              {STEPS.map((step, i) => (
                <div
                  key={i}
                  className={`flex gap-8 items-start group transition-all duration-1000 ${
                    processReveal.isVisible 
                      ? 'opacity-100 translate-x-0' 
                      : i % 2 === 0 ? 'opacity-0 -translate-x-12' : 'opacity-0 translate-x-12'
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="w-12 h-12 rounded-full bg-secondary/15 border border-secondary/30
                    flex items-center justify-center shrink-0 relative z-10
                    group-hover:bg-secondary group-hover:border-secondary transition-all duration-500">
                    <span className="font-mono font-black text-secondary group-hover:text-primary transition-colors text-xs">
                      {step.number}
                    </span>
                  </div>
                  
                  <div className="pt-2 border-b border-white/5 pb-8 flex-1">
                    <h3 className="font-heading text-2xl font-bold text-white tracking-tight">{step.title}</h3>
                    <p className="text-accent/50 mt-3 leading-relaxed text-sm md:text-base max-w-2xl">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ================== ABOUT SECTION: SPLIT WITH STATS ================== */}
      <section id="about" ref={aboutReveal.ref} className="py-28 px-6 bg-black relative overflow-hidden">
        
        {/* Subtle geometric overlay */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          
          <div className={`transition-all duration-1000 ${
            aboutReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <span className="text-secondary font-mono text-xs tracking-[0.4em] uppercase">Lagos Heritage</span>
            <h2 className="font-heading text-4xl md:text-6xl font-black text-white mt-4 mb-6 leading-tight">
              Crafted in the Heart of Lagos.
            </h2>
            <p className="text-accent/55 text-base md:text-lg leading-relaxed font-light mb-8">
              Hidesmith was born out of a desire to rescue old-world craftsmanship in a mass-produced age. Each item carries the touch of the artisan, utilizing heavy-grade Nigerian hides that grow richer in character with every single journey.
            </p>
            
            {/* Regional Slang Integrated 15% Intensity - Secondary placement */}
            <div className="inline-flex items-center gap-3 bg-secondary/10 border border-secondary/25 px-5 py-3 rounded-2xl">
              <div className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
              <p className="text-secondary text-sm font-medium uppercase font-mono tracking-wider">
                Lagos Crafted. Sharp delivery, nationwide.
              </p>
            </div>
          </div>

          {/* Stats V9 Reveal (Counter Rise) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-6">
            {STATS.map((stat, i) => (
              <div
                key={i}
                style={{ transitionDelay: `${i * 150}ms` }}
                className={`bg-[#1E1E1E] p-8 rounded-3xl border border-white/5 transition-all duration-1000 shadow-2xl ${
                  aboutReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="font-heading text-4xl font-black text-white">{stat.number}</p>
                  <div className="text-secondary/40">
                    {i === 0 && <Compass size={24} />}
                    {i === 1 && <Scissors size={24} />}
                    {i === 2 && <Layers size={24} />}
                  </div>
                </div>
                <p className="text-accent/40 text-xs font-mono uppercase tracking-widest mt-2">{stat.label}</p>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ================== DIVIDER 3: D-GRID ================== */}
      <div className="py-12 border-y border-white/5 bg-[#1E1E1E]">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8">
          {['Vegetable Tanned', 'Saddle Stitch', 'Heirloom Finish', 'Brass Rivets', 'Hand Burnished'].map((word, i) => (
            <div key={i} className="flex items-center gap-3 text-white/30 text-xs font-mono tracking-widest uppercase">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
              {word}
            </div>
          ))}
        </div>
      </div>


      {/* ================== TESTIMONIALS SECTION: T-MASONRY ================== */}
      <section ref={testimonialsReveal.ref} className="py-28 px-6 bg-black/40">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="text-secondary font-mono text-xs tracking-[0.4em] uppercase">Collector Feedback</span>
            <h2 className="font-heading text-4xl md:text-6xl font-black text-white mt-4">Heirloom Stories</h2>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className={`break-inside-avoid bg-gradient-to-br from-white/[0.04] to-transparent
                  p-8 rounded-3xl border border-white/5 relative overflow-hidden group
                  hover:border-secondary/20 transition-all duration-500`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <p className="text-accent/80 text-base md:text-lg leading-relaxed italic relative z-10 font-light">
                  &ldquo;{t.text}&rdquo;
                </p>
                
                <div className="flex items-center justify-between border-t border-white/10 pt-5 mt-6 relative z-10">
                  <div>
                    <p className="font-heading font-bold text-white text-base">{t.name}</p>
                    <p className="text-secondary text-xs uppercase tracking-wider mt-0.5 font-mono">{t.role}</p>
                  </div>
                  
                  <div className="w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center text-secondary font-bold text-xs uppercase font-mono">
                    {t.name.charAt(0)}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ================== CONTACT SECTION: C2 ASYMMETRIC GLASS OVERLAP ================== */}
      <section id="contact" ref={contactReveal.ref} className="py-28 px-6 bg-[#1E1E1E] relative overflow-hidden">
        
        {/* Soft Background Accent Orbs */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-[1.2fr_1fr] gap-12 items-center">
          
          {/* Glassmorphic Form Card */}
          <div className="bg-black/40 backdrop-blur-3xl p-8 sm:p-12 rounded-[2rem] border border-white/10 shadow-2xl relative">
            
            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center animate-scaleIn">
                <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mb-6 border border-secondary/40 shadow-[0_0_30px_rgba(200,138,88,0.2)]">
                  <CheckCheck size={32} className="text-secondary" />
                </div>
                <h3 className="font-heading text-3xl font-black text-white mb-3">Commission Initiated</h3>
                <p className="text-accent/60 max-w-sm text-sm md:text-base leading-relaxed">
                  Thank you for reaching out. A master leathercrafter will review your specification and message you back within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="mb-6">
                  <h3 className="font-heading text-2xl font-bold text-white tracking-tight">Commission Your Piece</h3>
                  <p className="text-accent/50 text-xs mt-1 font-mono uppercase tracking-wider">Meticulously handcrafted to specification</p>
                </div>

                <div className="space-y-4">
                  {(['name', 'email', 'phone'] as const).map(field => (
                    <div key={field} className="relative group">
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={form[field]}
                        onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                        required={field !== 'phone'}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 text-sm outline-none transition-all duration-300 focus:bg-white/10 focus:border-secondary focus:ring-1 focus:ring-secondary"
                      />
                    </div>
                  ))}
                  <div className="relative group">
                    <textarea
                      rows={4}
                      placeholder="Specify your design concept, desired leather colorway, or general questions..."
                      value={form.message}
                      onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 text-sm outline-none resize-none transition-all duration-300 focus:bg-white/10 focus:border-secondary focus:ring-1 focus:ring-secondary"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 bg-secondary text-primary py-4 rounded-xl font-bold text-sm tracking-widest uppercase hover:brightness-110 hover:shadow-[0_0_20px_rgba(200,138,88,0.2)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center gap-3 group"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="animate-spin" size={18} /> Processing...
                    </span>
                  ) : (
                    <>
                      Submit Specification <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

          {/* Left Text Detail Grid */}
          <div className="md:pl-6 text-left">
            <span className="text-secondary font-mono text-xs tracking-[0.4em] uppercase">Custom Order</span>
            <h2 className="font-heading text-4xl md:text-6xl font-black text-white mt-4 mb-6 leading-tight">
              Let&apos;s Build a Legacy Piece.
            </h2>
            <p className="text-accent/40 text-base md:text-lg mb-10 font-light leading-relaxed">
              Have a custom vision? We build bags, portfolios, and leather accoutrements specifically matched to individual specifications. Enter your requirements, and let&apos;s sketch.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-secondary">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-accent/40 text-[10px] font-mono uppercase tracking-widest leading-none">WhatsApp Order</p>
                  <a href="https://wa.me/c/2348023456789" className="text-white hover:text-secondary font-medium mt-1 block transition-colors">+234 802 345 6789</a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-secondary">
                  <Instagram size={18} />
                </div>
                <div>
                  <p className="text-accent/40 text-[10px] font-mono uppercase tracking-widest leading-none">Instagram Portfolio</p>
                  <a href="https://instagram.com/hidesmith.ng" className="text-white hover:text-secondary font-medium mt-1 block transition-colors">@hidesmith.ng</a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-secondary">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-accent/40 text-[10px] font-mono uppercase tracking-widest leading-none">Lagos Workshop</p>
                  <p className="text-white font-medium mt-1">Lagos, Nigeria</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ================== FOOTER: F1 STANDARD EXCELLENCE ================== */}
      <footer className="bg-black py-20 px-6 border-t border-white/5 relative">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            {/* Column 1: Brand details */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border border-secondary flex items-center justify-center font-bold text-sm bg-black text-secondary">
                  H
                </div>
                <span className="font-heading font-black text-base tracking-tight text-white uppercase">Hidesmith</span>
              </div>
              <p className="text-accent/40 text-xs md:text-sm leading-relaxed font-light">
                Meticulously constructing bespoke, lifetime durability hand-stitched leather products out of our workshop in Lagos, Nigeria.
              </p>
            </div>

            {/* Column 2: Navigation Links */}
            <div>
              <p className="text-secondary font-mono text-xs tracking-wider uppercase mb-5">Quick Access</p>
              <ul className="space-y-2 text-sm">
                {[
                  { name: "Home", id: "home" },
                  { name: "Creed", id: "features" },
                  { name: "Collection", id: "products" },
                  { name: "Process", id: "process" },
                  { name: "About", id: "about" }
                ].map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => handleNavClick(e, link.id)}
                      className="text-accent/50 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: The Collection */}
            <div>
              <p className="text-secondary font-mono text-xs tracking-wider uppercase mb-5">Our Collection</p>
              <ul className="space-y-2 text-sm text-accent/50">
                {PRODUCTS.map((p, i) => (
                  <li key={i}>
                    <a href="#products" onClick={(e) => handleNavClick(e, 'products')} className="hover:text-white transition-colors">
                      {p.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact & Location */}
            <div>
              <p className="text-secondary font-mono text-xs tracking-wider uppercase mb-5">Lagos Workshop</p>
              <p className="text-accent/50 text-sm leading-relaxed mb-4">
                Lagos, Nigeria
              </p>
              <div className="flex gap-4">
                <a href="https://wa.me/c/2348023456789" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-accent/60 hover:text-white hover:border-secondary transition-all">
                  <Phone size={14} />
                </a>
                <a href="https://instagram.com/hidesmith.ng" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-accent/60 hover:text-white hover:border-secondary transition-all">
                  <Instagram size={14} />
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Copyright Block */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-accent/30 text-xs font-mono">
              &copy; {new Date().getFullYear()} Hidesmith Leather Co. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-accent/30 font-mono">
              <span>Lagos, Nigeria</span>
              <span className="text-secondary">Sharp delivery, nationwide.</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}