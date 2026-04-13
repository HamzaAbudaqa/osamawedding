import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function HeroScene() {
  const handleEnter = (e) => {
    e.preventDefault();
    document.getElementById('invitation')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Atmospheric background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal-light to-charcoal" />

        {/* Warm center glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 65% 55% at 50% 45%, rgba(212,180,128,0.22), transparent 72%)',
          }}
        />

        {/* Top spotlight */}
        <div
          className="absolute inset-x-0 top-0 h-[45%]"
          style={{
            background:
              'radial-gradient(ellipse 75% 100% at 50% 0%, rgba(232,212,168,0.12), transparent 75%)',
          }}
        />

        {/* Floating particles */}
        {[...Array(36)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px rounded-full bg-gold-light/60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40 - Math.random() * 60, 0],
              opacity: [0.15, 0.7, 0.15],
              scale: [1, 2 + Math.random(), 1],
            }}
            transition={{
              duration: 5 + Math.random() * 6,
              delay: Math.random() * 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.75)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 w-full max-w-6xl">
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center gap-4 md:gap-6 mb-14 md:mb-20"
        >
          <span className="block w-10 sm:w-20 md:w-32 h-px bg-gradient-to-r from-transparent to-gold/70" />
          <span className="font-body text-[9px] sm:text-[10px] md:text-xs tracking-[0.4em] sm:tracking-[0.5em] uppercase text-gold/90 whitespace-nowrap">
            Together, Forever
          </span>
          <span className="block w-10 sm:w-20 md:w-32 h-px bg-gradient-to-l from-transparent to-gold/70" />
        </motion.div>

        {/* Names — pure opacity animation, no clipping ever */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-[clamp(4rem,14vw,14rem)] leading-[1.05] font-light tracking-[-0.02em] text-cream"
        >
          Osama
        </motion.h1>

        {/* Script & — simple, elegant */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="my-2 md:my-6"
        >
          <span className="font-script text-[clamp(3rem,7vw,6rem)] gold-shimmer leading-none">
            &amp;
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-[clamp(4rem,14vw,14rem)] leading-[1.2] font-light tracking-[-0.02em] text-cream pb-2"
        >
          Joud
        </motion.h1>

        {/* Date strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.6 }}
          className="flex items-center gap-5 mt-16 md:mt-20"
        >
          <span className="w-8 md:w-12 h-px bg-gold/50" />
          <p className="font-body text-[10px] sm:text-[11px] md:text-sm tracking-[0.35em] md:tracking-[0.45em] uppercase text-cream/70">
            15 &middot; 08 &middot; 2026
          </p>
          <span className="w-8 md:w-12 h-px bg-gold/50" />
        </motion.div>

        {/* Enter button */}
        <motion.a
          href="#invitation"
          onClick={handleEnter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="group mt-16 md:mt-20 inline-flex items-center gap-4 px-10 py-4 md:px-14 md:py-5 border border-gold/50 text-gold text-[10px] md:text-[11px] tracking-[0.35em] uppercase font-body hover:bg-gold/10 hover:border-gold active:bg-gold/20 transition-all duration-500 relative overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <span className="relative">Enter the Experience</span>
          <span className="relative w-5 h-px bg-gold/70 group-hover:w-8 transition-all duration-300" />
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-body text-[9px] tracking-[0.35em] uppercase text-gold/45">
            Scroll
          </span>
          <ChevronDown className="w-4 h-4 text-gold/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
