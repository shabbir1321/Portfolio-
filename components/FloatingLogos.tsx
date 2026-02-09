
import React, { useMemo } from 'react';
import { SKILLS } from '../constants';

interface FloatingLogosProps {
  mousePos: { x: number; y: number };
}

const FloatingLogos: React.FC<FloatingLogosProps> = ({ mousePos }) => {
  const roamingSkills = useMemo(() => [...SKILLS, ...SKILLS, ...SKILLS], []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {roamingSkills.map((skill, i) => {
        const centerX = (i * 17) % 100;
        const centerY = (i * 23) % 100;

        // Antigravity / Repulsion Logic
        const dx = mousePos.x * 5 - (centerX - 50);
        const dy = mousePos.y * 5 - (centerY - 50);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const force = Math.max(0, (150 - distance) / 10);

        const repulsionX = (dx / distance) * -force * 2;
        const repulsionY = (dy / distance) * -force * 2;

        const radius = 10 + (i % 5) * 5;
        const duration = 30 + (i % 20);
        const rotationDuration = 15 + (i % 10);
        const delay = -(i * 4);
        const size = `${30 + (i % 4) * 15}px`;

        return (
          <div
            key={`${skill.name}-${i}`}
            className="absolute flex items-center justify-center transition-transform duration-700 ease-out"
            style={{
              left: `${centerX}%`,
              top: `${centerY}%`,
              width: size,
              height: size,
              fontSize: `calc(${size} * 0.5)`,
              filter: `blur(${1 + (i % 2)}px)`,
              opacity: 0.22,
              color: i % 2 === 0 ? '#6366f1' : '#475569',
              transform: `translate(${repulsionX}px, ${repulsionY}px)`,
              animation: `rotate-self-${i} ${rotationDuration}s infinite linear`,
              animationDelay: `${delay}s`,
            }}
          >
            <i className={skill.icon}></i>
            <style>{`
              @keyframes rotate-self-${i} {
                from { transform: rotate(0deg) translate(${repulsionX}px, ${repulsionY}px); }
                to { transform: rotate(360deg) translate(${repulsionX}px, ${repulsionY}px); }
              }
            `}</style>
          </div>
        );
      })}
    </div>
  );
};

export default FloatingLogos;
