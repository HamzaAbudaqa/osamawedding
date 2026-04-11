import ScrollReveal from './ScrollReveal';

export default function Footer() {
  return (
    <footer className="section-lux py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-charcoal to-black" />

      <div className="container-lux relative z-10 flex flex-col items-center text-center">
        <ScrollReveal>
          <div className="ornament" />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="font-script text-4xl md:text-5xl gold-shimmer mb-8">
            Osama & Joud
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="font-heading text-xl md:text-2xl text-cream/60 italic leading-relaxed mb-6 max-w-2xl">
            "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."
          </p>
          <p className="font-body text-[10px] tracking-[0.35em] uppercase text-gold/60 mb-14">
            — Maya Angelou
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14 mb-14">
            <div className="text-center">
              <p className="font-body text-[10px] tracking-[0.35em] uppercase text-gold/60 mb-2">Date</p>
              <p className="font-heading text-lg text-cream">August 15, 2026</p>
            </div>
            <div className="hidden md:block w-px h-10 bg-gold/25" />
            <div className="text-center">
              <p className="font-body text-[10px] tracking-[0.35em] uppercase text-gold/60 mb-2">Venue</p>
              <p className="font-heading text-lg text-cream">The Grand Palazzo</p>
            </div>
            <div className="hidden md:block w-px h-10 bg-gold/25" />
            <div className="text-center">
              <p className="font-body text-[10px] tracking-[0.35em] uppercase text-gold/60 mb-2">Dress Code</p>
              <p className="font-heading text-lg text-cream">Black Tie Optional</p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="ornament" />
          <p className="font-body text-[10px] tracking-[0.35em] uppercase text-cream/35 mt-6">
            With love &middot; Est. 2026
          </p>
        </ScrollReveal>
      </div>
    </footer>
  );
}
