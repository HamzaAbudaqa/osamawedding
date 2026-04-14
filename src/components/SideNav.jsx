import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SCENES = [
  { id: 'hero', label: 'Welcome' },
  { id: 'invitation', label: 'Invitation' },
  { id: 'rsvp', label: 'RSVP' },
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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 2.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed right-4 md:right-7 top-1/2 -translate-y-1/2 z-50 hidden md:block"
      aria-label="Section navigation"
    >
      <ul className="flex flex-col gap-5">
        {SCENES.map((scene) => {
          const isActive = active === scene.id;
          return (
            <li key={scene.id} className="group relative flex items-center justify-end">
              <span
                className={`absolute right-7 font-body text-[8px] tracking-[0.3em] uppercase whitespace-nowrap transition-all duration-400 pointer-events-none ${
                  isActive
                    ? 'text-gold/70 opacity-100'
                    : 'text-gold/40 opacity-0 group-hover:opacity-100'
                }`}
              >
                {scene.label}
              </span>
              <a
                href={`#${scene.id}`}
                onClick={(e) => handleClick(e, scene.id)}
                aria-label={`Go to ${scene.label}`}
                className="relative block w-3.5 h-3.5 flex items-center justify-center"
              >
                <span
                  className={`block rounded-full transition-all duration-500 ${
                    isActive
                      ? 'w-2 h-2 bg-gold/80'
                      : 'w-1 h-1 bg-gold/25 group-hover:bg-gold/50'
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
