import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Curated Unsplash imagery — real, romantic, wedding-appropriate photos.
 * These are free-to-use Unsplash photo URLs, not placeholder boxes.
 * Replace with real wedding photography post-event.
 */
const IMAGES = [
  {
    id: 0,
    src: '/osama-joud.jpg',
    caption: 'Osama & Joud',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85',
    caption: 'A promise',
    span: '',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=85',
    caption: 'The first look',
    span: '',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=85',
    caption: 'Beneath the stars',
    span: 'md:row-span-2',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1606216794074-735e91aa5c03?w=1200&q=85',
    caption: 'Vows exchanged',
    span: '',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=85',
    caption: 'A stolen moment',
    span: '',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1537907690979-88117e1cc2e5?w=1200&q=85',
    caption: 'Golden hour',
    span: 'md:col-span-2',
  },
];

export default function GalleryScene() {
  const [lightbox, setLightbox] = useState(null);

  const openAt = (idx) => setLightbox(idx);
  const close = () => setLightbox(null);
  const nextImg = () => setLightbox((i) => (i + 1) % IMAGES.length);
  const prevImg = () => setLightbox((i) => (i - 1 + IMAGES.length) % IMAGES.length);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') nextImg();
      if (e.key === 'ArrowLeft') prevImg();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [lightbox]);

  return (
    <section
      id="gallery"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden py-24 md:py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal-light/30 to-charcoal" />

      <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center">
        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
          className="font-body text-[10px] md:text-xs tracking-[0.5em] uppercase text-gold/80 mb-5"
        >
          A Collection of Moments
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-5xl md:text-7xl text-cream font-light mb-6 text-center"
        >
          Memories
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="gold-line mb-6"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="font-heading italic text-lg md:text-xl text-cream/55 max-w-xl text-center mb-20 md:mb-24"
        >
          The moments that brought us here, and the ones still to come.
        </motion.p>

        {/* Asymmetric grid */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[240px] gap-3 md:gap-5">
          {IMAGES.map((img, idx) => (
            <motion.button
              key={img.id}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 1,
                delay: idx * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => openAt(idx)}
              className={`group relative overflow-hidden cursor-pointer ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.caption}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
              />
              {/* Dark overlay + gold tint on hover */}
              <div className="absolute inset-0 bg-charcoal/30 group-hover:bg-charcoal/10 transition-colors duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700" />

              {/* Caption */}
              <div className="absolute bottom-4 left-5 right-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                <p className="font-script text-2xl md:text-3xl text-gold-light drop-shadow-lg">
                  {img.caption}
                </p>
              </div>

              {/* Thin gold border on hover */}
              <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/50 transition-colors duration-700" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-charcoal/98 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 md:top-8 md:right-8 p-3 text-gold/70 hover:text-gold active:text-gold-light transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center z-10"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevImg(); }}
              className="absolute left-2 md:left-10 p-3 text-gold/70 hover:text-gold active:text-gold-light transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center z-10"
              aria-label="Previous"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-5xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={IMAGES[lightbox].src.replace('w=1200', 'w=1800')}
                alt={IMAGES[lightbox].caption}
                className="max-h-[80vh] w-auto object-contain"
              />
              <p className="font-script text-3xl md:text-4xl text-gold-light mt-5">
                {IMAGES[lightbox].caption}
              </p>
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); nextImg(); }}
              className="absolute right-2 md:right-10 p-3 text-gold/70 hover:text-gold active:text-gold-light transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center z-10"
              aria-label="Next"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
