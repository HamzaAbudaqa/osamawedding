import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * RSVP — registration has closed.
 * The interactive multi-step form has been retired now that the
 * response deadline has passed; guests are directed to contact us.
 */

export default function RsvpScene() {
  const [sectionRef, sectionInView] = useScrollReveal(0.1);

  return (
    <section
      ref={sectionRef}
      id="rsvp"
      className="relative w-full flex flex-col items-center justify-center overflow-hidden section-pad-lg"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal-warm/25 to-charcoal" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 40%, rgba(201,169,110,0.09), transparent 70%)',
        }}
      />
      <div className="texture-overlay" />

      <div className="container-narrow relative z-10 flex flex-col items-center">
        {/* Section header */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="font-body text-[10px] tracking-[0.5em] uppercase text-gold/60"
          style={{ marginBottom: 16 }}
        >
          Kindly Respond
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-3xl md:text-5xl text-cream font-light text-center"
          style={{ marginBottom: 20 }}
        >
          RSVP
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={sectionInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="gold-line"
          style={{ marginBottom: 48 }}
        />

        {/* Deadline passed notice */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-full border border-gold/12 bg-charcoal-light/40 backdrop-blur-sm flex flex-col items-center text-center"
          style={{
            paddingTop: 'clamp(28px, 5vw, 48px)',
            paddingBottom: 'clamp(28px, 5vw, 48px)',
            paddingLeft: 'clamp(20px, 5vw, 48px)',
            paddingRight: 'clamp(20px, 5vw, 48px)',
          }}
        >
          <Heart className="w-9 h-9 text-gold/55" strokeWidth={1} style={{ marginBottom: 20 }} />
          <p className="font-heading italic text-base md:text-lg text-cream/70 max-w-md leading-relaxed">
            The deadline has passed to register — please contact us for more info.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
