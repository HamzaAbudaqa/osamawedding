import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * FINAL — graceful farewell.
 *
 * Rhythm:
 *   top ornament → quote     48px
 *   quote → attribution      16px
 *   attribution → names      64px
 *   names → date             24px
 *   date → farewell          32px
 *   farewell → ornament      48px
 */
export default function FinalScene() {
  const [ref, inView] = useScrollReveal(0.15);

  return (
    <section
      ref={ref}
      id="final"
      className="relative w-full flex items-center justify-center overflow-hidden section-pad"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-espresso to-charcoal" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 45% 40% at 50% 50%, rgba(201,169,110,0.09), transparent 70%)',
        }}
      />
      <div className="texture-overlay" />

      {/* Particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-px h-px rounded-full bg-gold-light/25"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            y: [0, -20 - Math.random() * 30, 0],
            opacity: [0.05, 0.3, 0.05],
          }}
          transition={{
            duration: 7 + Math.random() * 5,
            delay: Math.random() * 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center text-center px-5 max-w-md">
        {/* Top ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.15 }}
          className="flex items-center gap-3"
          style={{ marginBottom: 48 }}
        >
          <span className="w-12 md:w-20 h-px bg-gradient-to-r from-transparent to-gold/35" />
          <span className="w-1 h-1 rounded-full bg-gold/45" />
          <span className="w-12 md:w-20 h-px bg-gradient-to-l from-transparent to-gold/35" />
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.3, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-heading italic text-lg md:text-2xl text-cream/70 leading-[1.55]">
            "In all the world, there is no heart
          </p>
          <p className="font-heading italic text-lg md:text-2xl text-cream/70 leading-[1.55]">
            for me like yours."
          </p>
        </motion.blockquote>

        {/* Couple names */}
        <div style={{ marginTop: 64 }} />

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="font-script gold-shimmer leading-[1.2]"
            style={{ fontSize: 'clamp(2.75rem, 11vw, 4rem)' }}
          >
            Osama &amp; Joud
          </p>
        </motion.div>

        {/* Date */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.6 }}
          className="flex items-center gap-3"
          style={{ marginTop: 24 }}
        >
          <span className="w-7 h-px bg-gold/30" />
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-cream/45">
            21 &middot; 08 &middot; 2026
          </p>
          <span className="w-7 h-px bg-gold/30" />
        </motion.div>

        {/* Farewell */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.9 }}
          className="font-heading italic text-sm md:text-base text-cream/40 max-w-xs leading-relaxed"
          style={{ marginTop: 32 }}
        >
          Thank you for being part of our story.
        </motion.p>

        {/* Bottom ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 2.2 }}
          className="flex items-center gap-3"
          style={{ marginTop: 48 }}
        >
          <span className="w-12 md:w-20 h-px bg-gradient-to-r from-transparent to-gold/35" />
          <span className="w-1 h-1 rounded-full bg-gold/45" />
          <span className="w-12 md:w-20 h-px bg-gradient-to-l from-transparent to-gold/35" />
        </motion.div>
      </div>
    </section>
  );
}
