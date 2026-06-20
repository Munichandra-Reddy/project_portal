import React from 'react';
import './ParticlesBackground.css';

export const ParticlesBackground = () => {
  // Generate random particles
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    animationDuration: Math.random() * 20 + 10,
    animationDelay: Math.random() * 5
  }));

  return (
    <div className="particles-container">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            animationDuration: `${p.animationDuration}s`,
            animationDelay: `-${p.animationDelay}s`
          }}
        />
      ))}
    </div>
  );
};
