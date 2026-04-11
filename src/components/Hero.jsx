import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="section-lux min-h-screen justify-center overflow-hidden">
      {/* Atmospheric background — absolutely positioned, full viewport */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal-light to-charcoal" />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(201,169,110,0.35), transparent 70%)',
          }}
        />

        {/* Floating particles */}
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px rounded-full bg-gold/50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30 - Math.random() * 40, 0],
              opacity: [0.2, 0.7, 0.2],
              scale: [1, 1.5 + Math.random(), 1],
            }}
            transition={{
              duration: 4 + Math.random() * 5,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.65)_100%)]" />
      </div>

      {/* Content — perfectly centered in the viewport */}
      <div className="container-lux relative z-10 flex flex-col items-center justify-center text-center py-28 md:py-40">
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center gap-3 md:gap-4 mb-12 md:mb-16"
        >
          <span className="block w-8 sm:w-14 md:w-24 h-px bg-gradient-to-r from-transparent to-gold/70" />
          <span className="font-body text-[9px] sm:text-[10px] md:text-xs tracking-[0.35em] sm:tracking-[0.42em] uppercase text-gold/80 whitespace-nowrap">
            The Wedding of
          </span>
          <span className="block w-8 sm:w-14 md:w-24 h-px bg-gradient-to-l from-transparent to-gold/70" />
        </motion.div>

        {/* Main names — looser leading and bottom padding so descenders never clip */}
        <div className="overflow-hidden pb-[0.1em]">
          <motion.h1
            initial={{ y: 140, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.3, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-[3.75rem] sm:text-8xl md:text-[9rem] lg:text-[11rem] leading-[1.05] font-light tracking-tight text-cream"
          >
            Osama
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="my-6 sm:my-8 md:my-10"
        >
          <span className="font-script text-5xl sm:text-6xl md:text-7xl gold-shimmer">&</span>
        </motion.div>

        <div className="overflow-hidden pb-[0.18em]">
          <motion.h1
            initial={{ y: 140, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.3, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-[3.75rem] sm:text-8xl md:text-[9rem] lg:text-[11rem] leading-[1.05] font-light tracking-tight text-cream"
          >
            Joud
          </motion.h1>
        </div>

        {/* Date + venue */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center mt-16 md:mt-24 px-2"
        >
          <div className="gold-line" />
          <p className="font-body text-[10px] sm:text-[11px] md:text-sm tracking-[0.28em] sm:tracking-[0.4em] uppercase text-cream/70 mt-8 md:mt-10">
            Saturday, the Fifteenth of August
          </p>
          <p className="font-body text-[10px] sm:text-[11px] md:text-sm tracking-[0.28em] sm:tracking-[0.4em] uppercase text-cream/70 mt-3">
            Two Thousand and Twenty-Six
          </p>
          <p className="font-body text-[9px] sm:text-[10px] md:text-xs tracking-[0.25em] sm:tracking-[0.35em] uppercase text-gold/75 mt-6 md:mt-7">
            The Grand Palazzo &middot; Amman, Jordan
          </p>
        </motion.div>

        {/* RSVP button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mt-16 md:mt-20"
        >
          <a
            href="#rsvp"
            className="group inline-flex items-center gap-3 px-10 py-4 md:px-14 md:py-5 border border-gold/50 text-gold text-[10px] md:text-[11px] tracking-[0.3em] md:tracking-[0.35em] uppercase font-body hover:bg-gold/10 hover:border-gold active:bg-gold/20 transition-all duration-500"
          >
            <span>Kindly Respond</span>
            <span className="w-4 h-px bg-gold/60 group-hover:w-7 transition-all duration-300" />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-gold/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
