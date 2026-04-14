import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * WelcomeOverlay — cinematic reveal on first load.
 *
 * Sequence (~3.8s total):
 *   0.3s   top ornament draws in
 *   0.7s   eyebrow fades in
 *   1.1s   "Osama" slides in
 *   1.5s   ampersand scales in
 *   1.6s   "Joud" slides in
 *   2.3s   date fades in
 *   2.9s   gold sweep across
 *   3.5s   curtain lifts away
 *
 * Skips for returning users (sessionStorage flag).
 */
const SKIP_KEY = 'oj_welcome_seen';

export default function WelcomeOverlay() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const seen = sessionStorage.getItem(SKIP_KEY);
    if (seen) return;

    setMounted(true);
    setVisible(true);

    // Lock page scroll while overlay is up
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const dismissAt = setTimeout(() => setVisible(false), 3500);
    const unmountAt = setTimeout(() => {
      setMounted(false);
      sessionStorage.setItem(SKIP_KEY, '1');
      document.body.style.overflow = prevOverflow;
    }, 4400);

    return () => {
      clearTimeout(dismissAt);
      clearTimeout(unmountAt);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const handleSkip = () => {
    setVisible(false);
    setTimeout(() => {
      setMounted(false);
      sessionStorage.setItem(SKIP_KEY, '1');
      document.body.style.overflow = '';
    }, 900);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="welcome"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-charcoal overflow-hidden"
          onClick={handleSkip}
        >
          {/* Background layers */}
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-espresso to-charcoal" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 55% 55% at 50% 50%, rgba(201,169,110,0.18), transparent 70%)',
            }}
          />
          <div className="texture-overlay" />

          {/* Particles */}
          {[...Array(14)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-px rounded-full bg-gold-light/50"
              style={{
                left: `${15 + Math.random() * 70}%`,
                top: `${15 + Math.random() * 70}%`,
              }}
              animate={{
                y: [0, -25 - Math.random() * 30, 0],
                opacity: [0.1, 0.6, 0.1],
                scale: [1, 1.8, 1],
              }}
              transition={{
                duration: 3.5 + Math.random() * 2,
                delay: Math.random() * 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Gold sweep — premium lighting pass */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: [0, 0.9, 0], x: '100%' }}
            transition={{ duration: 1.6, delay: 2.9, ease: [0.4, 0, 0.2, 1] }}
            style={{
              background:
                'linear-gradient(105deg, transparent 35%, rgba(232,212,168,0.18) 50%, transparent 65%)',
            }}
          />

          {/* Composition */}
          <div className="relative z-10 flex flex-col items-center text-center px-5">
            {/* Top ornament */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3"
              style={{ marginBottom: 28 }}
            >
              <span className="w-14 md:w-24 h-px bg-gradient-to-r from-transparent to-gold/70" />
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span className="w-14 md:w-24 h-px bg-gradient-to-l from-transparent to-gold/70" />
            </motion.div>

            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7 }}
              className="font-body text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-gold-muted"
              style={{ marginBottom: 20 }}
            >
              The Wedding of
            </motion.p>

            {/* Names */}
            <div className="flex flex-col items-center">
              <motion.h1
                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.2, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading font-light tracking-[-0.02em] text-cream"
                style={{ fontSize: 'clamp(3.5rem, 16vw, 8.5rem)', lineHeight: 0.92 }}
              >
                Osama
              </motion.h1>

              <motion.span
                initial={{ opacity: 0, scale: 0.5, rotate: -6 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="font-script gold-shimmer"
                style={{
                  fontSize: 'clamp(2rem, 6vw, 3.6rem)',
                  lineHeight: 1,
                  marginTop: 2,
                  marginBottom: 2,
                }}
              >
                &amp;
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.2, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading font-light tracking-[-0.02em] text-cream"
                style={{ fontSize: 'clamp(3.5rem, 16vw, 8.5rem)', lineHeight: 0.92 }}
              >
                Joud
              </motion.h1>
            </div>

            {/* Date */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 2.3 }}
              className="flex items-center gap-4"
              style={{ marginTop: 32 }}
            >
              <span className="w-10 md:w-16 h-px bg-gold/50" />
              <p className="font-body text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-cream/70">
                21 &middot; 08 &middot; 2026
              </p>
              <span className="w-10 md:w-16 h-px bg-gold/50" />
            </motion.div>
          </div>

          {/* Skip hint — enlarged hit area for mobile */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.5 }}
            onClick={(e) => {
              e.stopPropagation();
              handleSkip();
            }}
            className="absolute left-1/2 -translate-x-1/2 px-8 py-3 font-body text-[10px] tracking-[0.4em] uppercase text-gold/50 hover:text-gold active:text-gold-light transition-colors duration-300"
            style={{ bottom: 'max(16px, env(safe-area-inset-bottom))' }}
            aria-label="Skip intro"
          >
            Skip
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
