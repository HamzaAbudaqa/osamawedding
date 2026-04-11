import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  className = '',
  once = true,
}) {
  const [ref, isVisible] = useScrollReveal(0.1);

  const directions = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { y: 0, x: 60 },
    right: { y: 0, x: -60 },
    none: { y: 0, x: 0 },
  };

  const { x, y } = directions[direction] || directions.up;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x, y }}
      animate={isVisible ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
