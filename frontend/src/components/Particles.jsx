import React, { useMemo } from 'react';

/**
 * Rising particles effect (pure CSS animated).
 * Renders `count` tiny dots in random positions that float upward.
 */
const Particles = ({ count = 16, color = '#00F0FF', className = '' }) => {
  const dots = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 4,
        duration: 2.5 + Math.random() * 3.5,
        opacity: 0.4 + Math.random() * 0.5,
      })),
    [count]
  );

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {dots.map((d) => (
        <span
          key={d.id}
          style={{
            position: 'absolute',
            left: `${d.left}%`,
            bottom: '-10px',
            width: `${d.size}px`,
            height: `${d.size}px`,
            borderRadius: '50%',
            background: color,
            boxShadow: `0 0 ${d.size * 2}px ${color}`,
            animation: `particle-rise ${d.duration}s linear ${d.delay}s infinite`,
            opacity: d.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default Particles;
