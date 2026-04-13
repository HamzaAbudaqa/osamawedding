import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, Music, Sparkles } from 'lucide-react';

const EVENTS = [
  {
    icon: Clock,
    act: 'Act One',
    title: 'The Ceremony',
    time: '6:00 PM',
    location: 'The Rose Garden',
    description:
      "Beneath the palazzo's golden archway at sunset, we exchange the vows that bind us forever. Expect candlelight, whispered promises, and a sky painted in every shade of amber.",
  },
  {
    icon: Music,
    act: 'Act Two',
    title: 'Cocktail Hour',
    time: '7:30 PM',
    location: 'The Marble Terrace',
    description:
      'Champagne and canapés on the terrace as a string quartet plays beneath the stars. An intimate hour to greet every face we love before the evening unfolds.',
  },
  {
    icon: Sparkles,
    act: 'Act Three',
    title: 'The Reception',
    time: '9:00 PM',
    location: 'The Grand Ballroom',
    description:
      'A feast beneath glittering chandeliers. Heartfelt toasts, endless dancing, and the kind of night that will live in all of us long after the last song plays.',
  },
];

export default function EventsScene() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (newIndex) => {
    setDirection(newIndex > index ? 1 : -1);
    setIndex(newIndex);
  };

  const next = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % EVENTS.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + EVENTS.length) % EVENTS.length);
  };

  const event = EVENTS[index];
  const Icon = event.icon;

  return (
    <section
      id="events"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden py-24 md:py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal-light/30 to-charcoal" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,180,128,0.1), transparent 72%)',
        }}
      />

      <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center">
        {/* Section header */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
          className="font-body text-[10px] md:text-xs tracking-[0.5em] uppercase text-gold/80 mb-5"
        >
          Three Acts
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-5xl md:text-7xl text-cream font-light mb-6 text-center"
        >
          The Evening
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="gold-line mb-20 md:mb-28"
        />

        {/* Slideshow area */}
        <div className="relative w-full min-h-[420px] md:min-h-[480px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center max-w-2xl px-4"
            >
              {/* Icon medallion */}
              <div className="relative mb-10">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-gold/40 flex items-center justify-center bg-gradient-to-br from-charcoal/60 to-charcoal-light/40 backdrop-blur-sm">
                  <div className="absolute inset-1.5 rounded-full border border-gold/15" />
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-gold relative" strokeWidth={1.2} />
                </div>
              </div>

              {/* Act label */}
              <p className="font-body text-[10px] tracking-[0.45em] uppercase text-gold/70 mb-5">
                {event.act}
              </p>

              {/* Event title */}
              <h3 className="font-heading text-5xl md:text-7xl text-cream font-light mb-6 leading-[1.1]">
                {event.title}
              </h3>

              {/* Time + location */}
              <div className="flex items-center gap-5 mb-8">
                <p className="font-heading italic text-xl md:text-2xl text-gold-light">
                  {event.time}
                </p>
                <span className="w-1 h-1 rounded-full bg-gold/60" />
                <p className="font-body text-[10px] md:text-xs tracking-[0.32em] uppercase text-cream/70">
                  {event.location}
                </p>
              </div>

              {/* Description */}
              <p className="font-heading italic text-base md:text-xl text-cream/60 leading-relaxed max-w-xl">
                {event.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation controls */}
        <div className="flex items-center gap-8 md:gap-12 mt-16 md:mt-20">
          <button
            onClick={prev}
            className="p-3 text-gold/60 hover:text-gold active:text-gold-light transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Previous act"
          >
            <ChevronLeft className="w-7 h-7" strokeWidth={1.3} />
          </button>

          {/* Progress dashes */}
          <div className="flex items-center gap-3">
            {EVENTS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-[2px] transition-all duration-700 ${
                  i === index ? 'w-14 md:w-16 bg-gold' : 'w-7 md:w-8 bg-gold/20 hover:bg-gold/40'
                }`}
                aria-label={`Go to act ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-3 text-gold/60 hover:text-gold active:text-gold-light transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Next act"
          >
            <ChevronRight className="w-7 h-7" strokeWidth={1.3} />
          </button>
        </div>
      </div>
    </section>
  );
}
