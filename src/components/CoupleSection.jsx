import ScrollReveal from './ScrollReveal';

export default function CoupleSection() {
  return (
    <section className="section-lux py-32 md:py-48 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-charcoal via-charcoal-light/40 to-charcoal" />

      <div className="container-lux relative z-10 flex flex-col items-center text-center">
        <ScrollReveal>
          <p className="font-body text-[11px] tracking-[0.42em] uppercase text-gold/80 mb-6">
            Together with their families
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <h2 className="font-heading text-4xl md:text-5xl text-cream/90 font-light italic mb-5">
            Two hearts, one story
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="gold-line mb-20 md:mb-28" />
        </ScrollReveal>

        {/* Couple grid — symmetrical, truly centered */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32 max-w-4xl">
          {/* Groom */}
          <ScrollReveal delay={0.3} className="flex-1 flex flex-col items-center max-w-xs">
            <div className="group flex flex-col items-center">
              <div className="w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 mb-6 md:mb-7 rounded-full border border-gold/25 overflow-hidden bg-gradient-to-br from-charcoal-medium to-charcoal flex items-center justify-center group-hover:border-gold/50 transition-all duration-700">
                <span className="font-heading text-6xl sm:text-7xl text-gold/35 group-hover:text-gold/55 transition-colors duration-700">O</span>
              </div>
              <h3 className="font-heading text-4xl md:text-5xl text-cream mb-2">Osama</h3>
              <p className="font-body text-[11px] text-gold/70 tracking-[0.3em] uppercase mb-3">The Groom</p>
              <p className="font-body text-xs text-cream/40 leading-relaxed max-w-[220px] italic">
                Son of Mr. & Mrs. Khalid Al-Rashid
              </p>
            </div>
          </ScrollReveal>

          {/* Center ornament */}
          <ScrollReveal delay={0.45}>
            <div className="flex flex-col items-center justify-center gap-3 self-center">
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-gold/50 to-transparent hidden md:block" />
              <span className="font-script text-4xl md:text-5xl text-gold/70">&</span>
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-gold/50 to-transparent hidden md:block" />
            </div>
          </ScrollReveal>

          {/* Bride */}
          <ScrollReveal delay={0.35} className="flex-1 flex flex-col items-center max-w-xs">
            <div className="group flex flex-col items-center">
              <div className="w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 mb-6 md:mb-7 rounded-full border border-gold/25 overflow-hidden bg-gradient-to-br from-charcoal-medium to-charcoal flex items-center justify-center group-hover:border-gold/50 transition-all duration-700">
                <span className="font-heading text-6xl sm:text-7xl text-gold/35 group-hover:text-gold/55 transition-colors duration-700">J</span>
              </div>
              <h3 className="font-heading text-4xl md:text-5xl text-cream mb-2">Joud</h3>
              <p className="font-body text-[11px] text-gold/70 tracking-[0.3em] uppercase mb-3">The Bride</p>
              <p className="font-body text-xs text-cream/40 leading-relaxed max-w-[220px] italic">
                Daughter of Mr. & Mrs. Ahmad Mansouri
              </p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.55}>
          <div className="mt-28 md:mt-36 max-w-2xl">
            <p className="font-heading text-2xl md:text-3xl text-cream/70 italic leading-relaxed">
              "Two souls with but a single thought, two hearts that beat as one."
            </p>
            <p className="font-body text-[10px] text-gold/60 mt-6 tracking-[0.3em] uppercase">
              Friedrich Halm
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
