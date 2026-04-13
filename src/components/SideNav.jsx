import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SCENES = [
  { id: 'hero', label: 'Welcome' },
  { id: 'invitation', label: 'Invitation' },
  { id: 'events', label: 'Three Acts' },
  { id: 'rsvp', label: 'RSVP' },
  { id: 'gallery', label: 'Memories' },
  { id: 'final', label: 'Farewell' },
];

export default function SideNav() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const detect = () => {
      const mid = window.innerHeight / 2;
      for (const scene of SCENES) {
        const el = document.getElementById(scene.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= mid && rect.bottom >= mid) {
          setActive(scene.id);
          return;
        }
      }
    };
    detect();
    window.addEventListener('scroll', detect, { passive: true });
    window.addEventListener('resize', detect);
    return () => {
      window.removeEventListener('scroll', detect);
      window.removeEventListener('resize', detect);
    };
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, delay: 2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed right-5 md:right-8 top-1/2 -translate-y-1/2 z-50 hidden md:block"
      aria-label="Scene navigation"
    >
      <ul className="flex flex-col gap-6">
        {SCENES.map((scene) => {
          const isActive = active === scene.id;
          return (
            <li key={scene.id} className="group relative flex items-center justify-end">
              {/* Label on hover */}
              <span
                className={`absolute right-8 font-body text-[10px] tracking-[0.3em] uppercase whitespace-nowrap transition-all duration-500 pointer-events-none ${
                  isActive
                    ? 'text-gold opacity-100'
                    : 'text-gold/60 opacity-0 group-hover:opacity-100'
                }`}
              >
                {scene.label}
              </span>
              {/* Dot */}
              <a
                href={`#${scene.id}`}
                onClick={(e) => handleClick(e, scene.id)}
                aria-label={`Go to ${scene.label}`}
                className="relative block w-4 h-4 flex items-center justify-center"
              >
                <span
                  className={`block rounded-full transition-all duration-500 ${
                    isActive
                      ? 'w-2.5 h-2.5 bg-gold'
                      : 'w-1.5 h-1.5 bg-gold/40 group-hover:bg-gold/70'
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
