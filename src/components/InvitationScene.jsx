import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * INVITATION — ceremonial framed card.
 *
 * Card internal rhythm:
 *   eyebrow → lead        24px
 *   lead → names          24px
 *   names → divider       32px
 *   divider → date        32px
 *   date → location rule  48px
 *   rule → location       28px
 *
 * Card padding: 48px mobile / 80px desktop
 */
export default function InvitationScene() {
  const [ref, inView] = useScrollReveal(0.15);

  return (
    <section
      ref={ref}
      id="invitation"
      className="relative w-full flex items-center justify-center overflow-hidden section-pad"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal-light to-charcoal" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(201,169,110,0.07), transparent 70%)',
        }}
      />
      <div className="texture-overlay" />

      <div className="container-narrow relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.3, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative border border-gold/12 bg-charcoal-light/40 backdrop-blur-sm"
          style={{
            paddingTop: 'clamp(40px, 8vw, 80px)',
            paddingBottom: 'clamp(40px, 8vw, 80px)',
            paddingLeft: 'clamp(24px, 6vw, 72px)',
            paddingRight: 'clamp(24px, 6vw, 72px)',
          }}
        >
          {/* Corner ornaments */}
          <div className="absolute top-2 left-2 md:top-2.5 md:left-2.5 w-4 h-4 md:w-5 md:h-5 border-l border-t border-gold/40" />
          <div className="absolute top-2 right-2 md:top-2.5 md:right-2.5 w-4 h-4 md:w-5 md:h-5 border-r border-t border-gold/40" />
          <div className="absolute bottom-2 left-2 md:bottom-2.5 md:left-2.5 w-4 h-4 md:w-5 md:h-5 border-l border-b border-gold/40" />
          <div className="absolute bottom-2 right-2 md:bottom-2.5 md:right-2.5 w-4 h-4 md:w-5 md:h-5 border-r border-b border-gold/40" />

          <div className="flex flex-col items-center text-center">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.4 }}
              className="font-body text-[10px] tracking-[0.5em] uppercase text-gold/70"
              style={{ marginBottom: 24 }}
            >
              You Are Cordially Invited
            </motion.p>

            {/* Italic lead */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.6 }}
              className="font-heading italic text-base md:text-xl text-cream/60"
              style={{ marginBottom: 24 }}
            >
              to celebrate the marriage of
            </motion.p>

            {/* Couple names */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.3, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] font-light tracking-tight text-cream"
              style={{ marginBottom: 32 }}
            >
              Osama{' '}
              <span className="font-script text-[0.8em] text-gold-light mx-0.5">
                &amp;
              </span>{' '}
              Joud
            </motion.h2>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={inView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 1.1 }}
              className="flex items-center gap-3"
              style={{ marginBottom: 32 }}
            >
              <span className="w-12 md:w-16 h-px bg-gradient-to-r from-transparent to-gold/45" />
              <span className="w-1 h-1 rounded-full bg-gold/50" />
              <span className="w-12 md:w-16 h-px bg-gradient-to-l from-transparent to-gold/45" />
            </motion.div>

            {/* Date */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1.1, delay: 1.4 }}
              className="flex flex-col items-center gap-1"
              style={{ marginBottom: 48 }}
            >
              <p className="font-heading text-base md:text-xl text-cream/75 leading-relaxed">
                Friday, the Twenty-First of August
              </p>
              <p className="font-heading text-base md:text-xl text-cream/75 leading-relaxed">
                Two Thousand and Twenty-Six
              </p>
            </motion.div>

            {/* Location — separated rule */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 1.7 }}
              className="w-full max-w-[240px] flex flex-col items-center border-t border-gold/12"
              style={{ paddingTop: 28 }}
            >
              <p
                className="font-body text-[10px] tracking-[0.4em] uppercase text-gold/55"
                style={{ marginBottom: 16 }}
              >
                Location
              </p>
              <a
                href="https://maps.app.goo.gl/eXmKpUyCVKCytSGJ6?g_st=iw"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full border border-gold/40 text-gold text-[10px] md:text-[11px] tracking-[0.3em] uppercase hover:bg-gold/10 hover:border-gold/70 active:bg-gold/15 transition-all duration-500"
                style={{
                  paddingInline: 28,
                  paddingBlock: 14,
                  minHeight: 44,
                }}
              >
                <MapPin className="w-3.5 h-3.5" strokeWidth={1.4} />
                <span>View on Map</span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
