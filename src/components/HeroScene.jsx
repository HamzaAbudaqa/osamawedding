import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/**
 * HERO — tight vertical composition.
 */
export default function HeroScene() {
  const handleEnter = (e) => {
    e.preventDefault();
    document.getElementById('invitation')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen-safe w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-espresso to-charcoal" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 60% at 50% 55%, rgba(201,169,110,0.12), transparent 70%)',
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-1/2"
          style={{
            background:
              'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(232,212,168,0.06), transparent 70%)',
          }}
        />
        <div className="texture-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.7)_100%)]" />
      </div>

      {/* Particles */}
      {[...Array(14)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-px h-px rounded-full bg-gold-light/40"
          style={{
            left: `${12 + Math.random() * 76}%`,
            top: `${12 + Math.random() * 76}%`,
          }}
          animate={{
            y: [0, -30 - Math.random() * 40, 0],
            opacity: [0.1, 0.5, 0.1],
            scale: [1, 1.5 + Math.random(), 1],
          }}
          transition={{
            duration: 6 + Math.random() * 6,
            delay: Math.random() * 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Composition column */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-5 w-full max-w-3xl"
        style={{ paddingTop: 'max(24px, env(safe-area-inset-top))', paddingBottom: 72 }}
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="font-body text-[9px] md:text-[10px] tracking-[0.5em] uppercase text-gold-muted"
          style={{ marginBottom: 14 }}
        >
          The Wedding of
        </motion.p>

        {/* Name block */}
        <div className="flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-light tracking-[-0.02em] text-cream"
            style={{ fontSize: 'clamp(3.5rem, 15vw, 8rem)', lineHeight: 0.92 }}
          >
            Osama
          </motion.h1>

          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.85 }}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-light tracking-[-0.02em] text-cream"
            style={{ fontSize: 'clamp(3.5rem, 15vw, 8rem)', lineHeight: 0.92 }}
          >
            Joud
          </motion.h1>
        </div>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginTop: 'clamp(28px, 6vw, 40px)' }}
        >
          <div
            className="rounded-full overflow-hidden ring-1 ring-gold/35 ring-offset-[3px] ring-offset-charcoal shadow-[0_0_50px_rgba(201,169,110,0.12)]"
            style={{ width: 'clamp(160px, 42vw, 208px)', height: 'clamp(160px, 42vw, 208px)' }}
          >
            <img
              src="/osama-joud.jpg"
              alt="Osama & Joud"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </motion.div>

        {/* Date */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex items-center gap-4"
          style={{ marginTop: 20 }}
        >
          <span className="w-8 md:w-12 h-px bg-gold/40" />
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-cream/60">
            21 &middot; 08 &middot; 2026
          </p>
          <span className="w-8 md:w-12 h-px bg-gold/40" />
        </motion.div>

        {/* CTA */}
        <motion.a
          href="#invitation"
          onClick={handleEnter}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="group inline-flex items-center gap-3 md:gap-4 border border-gold/50 rounded-full text-gold text-[10px] md:text-[11px] tracking-[0.35em] uppercase font-body hover:bg-gold/10 hover:border-gold/80 active:bg-gold/15 transition-all duration-500 backdrop-blur-sm"
          style={{
            marginTop: 16,
            paddingTop: 14,
            paddingBottom: 14,
            paddingLeft: 'clamp(32px, 8vw, 44px)',
            paddingRight: 'clamp(24px, 7vw, 36px)',
          }}
        >
          <span>View Our Invitation</span>
          <span className="w-4 h-px bg-gold/60 group-hover:w-6 transition-all duration-300" />
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute left-1/2 -translate-x-1/2"
        style={{ bottom: 'max(16px, env(safe-area-inset-bottom))' }}
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1.5"
        >
          <span className="font-body text-[8px] tracking-[0.4em] uppercase text-gold/40">
            Scroll
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-gold/45" />
        </motion.div>
      </motion.div>
    </section>
  );
}
