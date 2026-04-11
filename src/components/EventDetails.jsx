import { MapPin, Clock, Music } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const EVENTS = [
  {
    icon: Clock,
    label: 'The Ceremony',
    time: '6:00 PM',
    location: 'The Grand Palazzo',
    address: 'Jabal Amman, Amman, Jordan',
    description: 'Join us as we exchange vows in the palazzo\'s rose garden at sunset.',
  },
  {
    icon: Music,
    label: 'Cocktail Hour',
    time: '7:30 PM',
    location: 'The Marble Terrace',
    address: 'Champagne & canapés beneath the stars',
    description: 'An intimate gathering with live music, signature cocktails, and the warmth of friends.',
  },
  {
    icon: MapPin,
    label: 'The Reception',
    time: '9:00 PM',
    location: 'The Grand Ballroom',
    address: 'Dinner, dancing, and celebration until midnight',
    description: 'A night of fine dining, heartfelt toasts, and dancing into the early hours.',
  },
];

export default function EventDetails() {
  return (
    <section id="details" className="section-lux py-32 md:py-48 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-charcoal-light via-charcoal to-charcoal-light" />

      {/* Decorative corner ornaments */}
      <div className="absolute top-12 left-12 w-24 h-24 border-l border-t border-gold/20 hidden lg:block" />
      <div className="absolute top-12 right-12 w-24 h-24 border-r border-t border-gold/20 hidden lg:block" />
      <div className="absolute bottom-12 left-12 w-24 h-24 border-l border-b border-gold/20 hidden lg:block" />
      <div className="absolute bottom-12 right-12 w-24 h-24 border-r border-b border-gold/20 hidden lg:block" />

      <div className="container-lux relative z-10 flex flex-col items-center">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-24 md:mb-32">
          <ScrollReveal>
            <p className="font-body text-[11px] tracking-[0.42em] uppercase text-gold/80 mb-5">
              The Celebration
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-heading text-5xl md:text-7xl text-cream font-light tracking-wide mb-7">
              Event Details
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="gold-line mb-8" />
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="font-heading text-xl md:text-2xl text-cream/60 italic max-w-2xl">
              An evening of love, laughter, and everything in between.
            </p>
          </ScrollReveal>
        </div>

        {/* Event cards — equal width grid, truly centered */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 place-items-stretch">
          {EVENTS.map((event, idx) => {
            const Icon = event.icon;
            return (
              <ScrollReveal key={idx} delay={idx * 0.15}>
                <div className="group relative h-full p-10 sm:p-12 md:p-14 border border-gold/20 bg-charcoal/50 backdrop-blur-sm hover:border-gold/50 hover:bg-charcoal/70 transition-all duration-700 flex flex-col items-center text-center">
                  {/* Top accent line */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-px bg-gold/50 group-hover:w-24 transition-all duration-500" />

                  <div className="mb-8 p-4 rounded-full border border-gold/35 group-hover:border-gold/65 group-hover:bg-gold/5 transition-all duration-500">
                    <Icon className="w-5 h-5 text-gold" strokeWidth={1.2} />
                  </div>

                  <p className="font-body text-[10px] tracking-[0.35em] uppercase text-gold/75 mb-5">
                    {event.label}
                  </p>

                  <h3 className="font-heading text-4xl md:text-5xl text-cream font-light mb-4">
                    {event.time}
                  </h3>

                  <div className="w-10 h-px bg-gold/35 my-5" />

                  <p className="font-body text-sm text-cream/85 mb-2">{event.location}</p>
                  <p className="font-body text-xs text-cream/40 italic mb-6">{event.address}</p>

                  <p className="font-body text-xs text-cream/55 leading-relaxed max-w-[240px]">
                    {event.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
