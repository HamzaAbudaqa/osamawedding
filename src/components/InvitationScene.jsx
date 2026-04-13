import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * Invitation Scene — the formal moment.
 * Each line reveals sequentially with a blur-to-clear effect.
 * This is the slowest, most deliberate scene in the sequence.
 */
export default function InvitationScene() {
  const [ref, inView] = useScrollReveal(0.25);

  return (
    <section
      ref={ref}
      id="invitation"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-24"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal-light/25 to-charcoal" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(212,180,128,0.1), transparent 70%)',
        }}
      />

      {/* Elegant frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-10 md:inset-20 border border-gold/15 pointer-events-none hidden md:block"
      >
        <div className="absolute -top-px -left-px w-8 h-8 border-l border-t border-gold/60" />
        <div className="absolute -top-px -right-px w-8 h-8 border-r border-t border-gold/60" />
        <div className="absolute -bottom-px -left-px w-8 h-8 border-l border-b border-gold/60" />
        <div className="absolute -bottom-px -right-px w-8 h-8 border-r border-b border-gold/60" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl">
        {/* Line 1: Pre-title */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-body text-[10px] md:text-xs tracking-[0.4em] md:tracking-[0.5em] uppercase text-gold/85 mb-10"
        >
          You are cordially invited
        </motion.p>

        {/* Line 2: Italic */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1.4, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading italic text-2xl md:text-4xl text-cream/75 mb-8 leading-relaxed"
        >
          to celebrate the marriage of
        </motion.p>

        {/* Line 3: The couple, big */}
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1.6, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-[clamp(2.75rem,8vw,6rem)] leading-[1.15] font-light tracking-tight text-cream mb-12 pb-1"
        >
          Osama <span className="font-script text-gold-light mx-2">&amp;</span> Joud
        </motion.h2>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1.4, delay: 1.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4 mb-10"
        >
          <span className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-gold/60" />
          <span className="w-1.5 h-1.5 rounded-full bg-gold/70" />
          <span className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-gold/60" />
        </motion.div>

        {/* Date */}
        <motion.p
          initial={{ opacity: 0, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1.4, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading italic text-xl md:text-3xl text-cream/85 leading-relaxed"
        >
          Saturday, the Fifteenth of August
        </motion.p>
        <motion.p
          initial={{ opacity: 0, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1.4, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading italic text-xl md:text-3xl text-cream/85 leading-relaxed"
        >
          Two Thousand and Twenty-Six
        </motion.p>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 2.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col items-center gap-3"
        >
          <span className="w-12 h-px bg-gold/40" />
          <p className="font-body text-[10px] md:text-xs tracking-[0.35em] uppercase text-gold/75">
            The Grand Palazzo
          </p>
          <p className="font-body text-[10px] md:text-xs tracking-[0.3em] uppercase text-cream/55">
            Amman, Jordan
          </p>
        </motion.div>
      </div>
    </section>
  );
}
