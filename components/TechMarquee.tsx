
import React from 'react';
import { SKILLS } from '../constants';

const TechMarquee: React.FC = () => {
  // Double the array to ensure seamless looping
  const marqueeSkills = [...SKILLS, ...SKILLS, ...SKILLS, ...SKILLS];

  return (
    <div className="relative py-12 overflow-hidden bg-slate-950/20 border-y border-white/5 backdrop-blur-sm">
      <div className="flex w-max animate-marquee space-x-12 px-6">
        {marqueeSkills.map((skill, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default group"
          >
            <i
              className={`${skill.icon} text-3xl sm:text-4xl text-slate-400 transition-colors duration-300`}
              style={{ '--hover-color': skill.color } as any}
            ></i>
          </div>
        ))}
      </div>

      <style>{`
        .group:hover i {
          color: var(--hover-color) !important;
          text-shadow: 0 0 20px var(--hover-color);
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Fade overlays for smooth edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#020617] to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#020617] to-transparent z-10"></div>
    </div>
  );
};

export default TechMarquee;
