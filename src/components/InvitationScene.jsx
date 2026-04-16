import { motion } from 'framer-motion';
import { MapPin, CalendarPlus, Navigation } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const VENUE_NAME = 'Olympia Reception Halls';
const VENUE_ADDRESS = 'Boulevard Saint-Jean, Dollard-Des Ormeaux, QC, Canada';
const DIRECTIONS_URL = 'https://maps.app.goo.gl/eXmKpUyCVKCytSGJ6?g_st=iw';
const MAP_EMBED_URL =
  'https://maps.google.com/maps?q=Olympia+Reception+Halls+Dollard-Des+Ormeaux&t=&z=15&ie=UTF8&iwloc=&output=embed';
const CALENDAR_URL =
  'https://www.google.com/calendar/render?action=TEMPLATE' +
  '&text=Osama+%26+Joud%27s+Wedding' +
  '&dates=20260821T180000/20260821T230000' +
  '&ctz=America/Toronto' +
  '&location=Olympia+Reception+Halls%2C+Boulevard+Saint-Jean%2C+Dollard-Des+Ormeaux%2C+QC%2C+Canada' +
  '&details=Join+us+as+we+celebrate+the+marriage+of+Osama+%26+Joud.';

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
                Friday, the 21st of August
              </p>
              <p className="font-heading text-base md:text-xl text-cream/75 leading-relaxed">
                2026
              </p>
              <p
                className="font-heading italic text-sm md:text-base text-gold/70 leading-relaxed"
                style={{ marginTop: 10 }}
              >
                at Six o'Clock in the Evening
              </p>
            </motion.div>

            {/* Location — separated rule */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 1.7 }}
              className="w-full flex flex-col items-center border-t border-gold/12"
              style={{ paddingTop: 32 }}
            >
              <p
                className="font-body text-[10px] tracking-[0.4em] uppercase text-gold/55"
                style={{ marginBottom: 20 }}
              >
                Location
              </p>

              {/* Venue name + address */}
              <div
                className="flex items-start justify-center gap-3 max-w-[340px]"
                style={{ marginBottom: 24 }}
              >
                <MapPin
                  className="w-4 h-4 text-gold/70 flex-shrink-0"
                  strokeWidth={1.4}
                  style={{ marginTop: 4 }}
                />
                <div className="flex flex-col items-start text-left">
                  <p className="font-heading text-base md:text-lg text-cream/85 leading-snug">
                    {VENUE_NAME}
                  </p>
                  <p
                    className="font-body text-xs md:text-sm text-cream/50 leading-relaxed"
                    style={{ marginTop: 4 }}
                  >
                    {VENUE_ADDRESS}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div
                className="flex flex-wrap items-center justify-center gap-2.5"
                style={{ marginBottom: 28 }}
              >
                <a
                  href={CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-gold/40 text-gold text-[10px] md:text-[11px] tracking-[0.3em] uppercase hover:bg-gold/10 hover:border-gold/70 active:bg-gold/15 transition-all duration-500"
                  style={{
                    paddingInline: 22,
                    paddingBlock: 13,
                    minHeight: 44,
                  }}
                >
                  <CalendarPlus className="w-3.5 h-3.5" strokeWidth={1.4} />
                  <span>Add to Calendar</span>
                </a>
                <a
                  href={DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-gold/40 text-gold text-[10px] md:text-[11px] tracking-[0.3em] uppercase hover:bg-gold/10 hover:border-gold/70 active:bg-gold/15 transition-all duration-500"
                  style={{
                    paddingInline: 22,
                    paddingBlock: 13,
                    minHeight: 44,
                  }}
                >
                  <Navigation className="w-3.5 h-3.5" strokeWidth={1.4} />
                  <span>Directions</span>
                </a>
              </div>

              {/* Embedded map */}
              <div
                className="relative w-full max-w-[460px] overflow-hidden border border-gold/20"
                style={{ aspectRatio: '4 / 3' }}
              >
                <iframe
                  title="Venue map"
                  src={MAP_EMBED_URL}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                  style={{
                    border: 0,
                    filter: 'saturate(0.78) brightness(0.92) contrast(0.96)',
                  }}
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/15" />
              </div>
            </motion.div>

            {/* Adults-only note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 2 }}
              className="flex flex-col items-center w-full"
              style={{ marginTop: 44 }}
            >
              <p
                className="font-body text-xs md:text-[13px] tracking-[0.4em] uppercase text-gold/80"
                style={{ marginBottom: 16 }}
              >
                An Adults-Only Celebration
              </p>
              <p className="font-heading italic text-base md:text-xl text-cream/80 leading-relaxed max-w-[440px] text-center">
                While we love your little ones, we kindly ask that our celebration remain adults-only. Thank you for understanding.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
