import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function FinalScene() {
  const [ref, inView] = useScrollReveal(0.3);

  return (
    <section
      ref={ref}
      id="final"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal-light to-black" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 50% at 50% 50%, rgba(212,180,128,0.15), transparent 70%)',
        }}
      />

      {/* Slow drifting particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-px h-px rounded-full bg-gold-light/50"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30 - Math.random() * 50, 0],
            opacity: [0.1, 0.6, 0.1],
          }}
          transition={{
            duration: 6 + Math.random() * 6,
            delay: Math.random() * 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl">
        {/* Top ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="flex items-center gap-4 mb-14 md:mb-16"
        >
          <span className="w-16 md:w-28 h-px bg-gradient-to-r from-transparent to-gold/60" />
          <span className="w-1.5 h-1.5 rounded-full bg-gold/70" />
          <span className="w-16 md:w-28 h-px bg-gradient-to-l from-transparent to-gold/60" />
        </motion.div>

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading italic text-2xl md:text-4xl text-cream/80 leading-relaxed mb-4"
        >
          "In all the world, there is no heart
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading italic text-2xl md:text-4xl text-cream/80 leading-relaxed"
        >
          for me like yours."
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.3 }}
          className="font-body text-[10px] tracking-[0.4em] uppercase text-gold/55 mt-5"
        >
          — Maya Angelou
        </motion.p>

        {/* Couple names in script */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 md:mt-24"
        >
          <p className="font-script text-6xl md:text-8xl gold-shimmer leading-[1.2] pb-2">
            Osama &amp; Joud
          </p>
        </motion.div>

        {/* Date */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 2.1 }}
          className="mt-10 flex items-center gap-4"
        >
          <span className="w-10 h-px bg-gold/40" />
          <p className="font-body text-[10px] md:text-xs tracking-[0.45em] uppercase text-cream/60">
            15 &middot; 08 &middot; 2026
          </p>
          <span className="w-10 h-px bg-gold/40" />
        </motion.div>

        {/* Thank you */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 2.4 }}
          className="font-heading italic text-lg md:text-xl text-cream/50 mt-16 max-w-md leading-relaxed"
        >
          Thank you for being part of our story.
        </motion.p>

        {/* Bottom ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1.4, delay: 2.7 }}
          className="flex items-center gap-4 mt-14 md:mt-20"
        >
          <span className="w-16 md:w-28 h-px bg-gradient-to-r from-transparent to-gold/60" />
          <span className="w-1.5 h-1.5 rounded-full bg-gold/70" />
          <span className="w-16 md:w-28 h-px bg-gradient-to-l from-transparent to-gold/60" />
        </motion.div>
      </div>
    </section>
  );
}
