
import React, { useEffect, useState, useRef } from 'react';
import Navbar from './components/Navbar';
import FloatingLogos from './components/FloatingLogos';
import Typewriter from './components/Typewriter';
import TechMarquee from './components/TechMarquee';
import CustomCursor from './components/CustomCursor';
import { PERSONAL_INFO, PROJECTS, SKILLS, EXPERIENCES, EDUCATION, LEADERSHIP, TESTIMONIALS } from './constants';

const ScrollReveal: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`scroll-reveal ${isActive ? 'active' : ''} ${className}`}>
      {children}
    </div>
  );
};

const TiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
};

const App: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#020617] overflow-x-hidden text-slate-200 cursor-none">
      <CustomCursor />
      <div
        className="fixed top-0 left-0 h-[2px] bg-indigo-500 z-[200] transition-all duration-300 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      <FloatingLogos mousePos={mousePos} />

      <div
        className="orbit-container opacity-10 pointer-events-none transition-transform duration-300 ease-out"
        style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
      >
        <div className="orbit-ring" style={{ "--d": "50s" } as any}></div>
        <div className="orbit-ring" style={{ transform: "rotateX(60deg) rotateY(20deg)", "--d": "70s" } as any}></div>
      </div>

      <div className="relative z-10">
        <Navbar />

        <section id="about" className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 scroll-mt-20">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal className="mb-6 flex justify-center items-center gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-xl">
                <span className="w-1 h-1 rounded-full bg-indigo-500 animate-pulse"></span>
                <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-slate-500">CREATIVE ENGINEER</span>
              </div>
              {PERSONAL_INFO.isAvailable && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/10 bg-emerald-500/5 backdrop-blur-xl animate-fade-in">
                  <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-emerald-500/80">Available for Hire</span>
                </div>
              )}
            </ScrollReveal>

            <ScrollReveal>
              <h1 className="text-4xl sm:text-5xl md:text-[6.5rem] font-black tracking-tighter leading-[0.85] mb-8 group cursor-default">
                <span className="block text-white transition-all duration-500 group-hover:tracking-widest group-hover:skew-x-2">Shabbir</span>
                <span className="block gradient-text drop-shadow-[0_0_30px_rgba(99,102,241,0.1)] group-hover:glitch-animation relative">
                  Badsha.
                  <span className="absolute inset-0 text-white/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity">Badsha.</span>
                </span>
              </h1>
            </ScrollReveal>

            <style>{`
              @keyframes glitch {
                0% { transform: translate(0) }
                20% { transform: translate(-2px, 2px) }
                40% { transform: translate(-2px, -2px) }
                60% { transform: translate(2px, 2px) }
                80% { transform: translate(2px, -2px) }
                100% { transform: translate(0) }
              }
              .group:hover .glitch-animation {
                animation: glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
              }
            `}</style>

            <ScrollReveal>
              <div className="text-2xl sm:text-3xl md:text-5xl font-bold mb-10 md:mb-14 min-h-[1.5em] flex justify-center items-center">
                <Typewriter
                  phrases={[
                    "Software Engineer",
                    "Frontend Developer",
                    "MERN Stack Developer",
                    "Freelancer"
                  ]}
                />
              </div>
            </ScrollReveal>

            <ScrollReveal className="flex flex-col sm:flex-row gap-5 justify-center items-center px-4 mb-14">
              <a href="#projects" className="w-full sm:w-auto group relative px-10 py-4 bg-white text-slate-950 font-bold uppercase tracking-[0.2em] text-[8px] rounded-full overflow-hidden transition-all hover:bg-indigo-50 hover:scale-105 active:scale-95 shadow-xl shadow-white/5 text-center">
                <span className="relative z-10">View Portfolio</span>
              </a>
              <a href={PERSONAL_INFO.resumeUrl} target="_blank" rel="noopener noreferrer" download="Shabbir_Badsha_CV.pdf" className="w-full sm:w-auto px-10 py-4 glass-card text-white font-bold uppercase tracking-[0.2em] text-[8px] rounded-full border border-white/10 hover:border-indigo-500/50 transition-all hover:bg-indigo-500/5 active:scale-95 text-center">
                Download CV
              </a>
            </ScrollReveal>

            <ScrollReveal>
              <p className="max-w-xl mx-auto text-slate-400 text-[13px] sm:text-base md:text-lg mb-8 leading-relaxed font-light px-4 opacity-60">
                {PERSONAL_INFO.bio}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Logo Marquee as a break between Hero and Content */}
        <ScrollReveal className="py-12">
          <TechMarquee />
        </ScrollReveal>

        <section id="services" className="py-24 max-w-5xl mx-auto px-6 scroll-mt-24">
          <ScrollReveal className="mb-14">
            <h2 className="text-[9px] font-bold uppercase tracking-[0.5em] text-indigo-400 mb-4">Expertise</h2>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-white">Advanced solutions for <br className="hidden sm:block" />modern digital problems.</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-5 h-auto">
            <TiltCard className="md:col-span-2 md:row-span-2 glass-card p-8 sm:p-10 rounded-[2rem] flex flex-col justify-end group min-h-[350px]">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6 border border-indigo-500/20">
                <i className="fa-solid fa-code text-xl text-indigo-400"></i>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-white">Web Development</h3>
              <p className="text-slate-400 leading-relaxed text-xs sm:text-sm opacity-70">Detail-oriented developer with hands-on experience in building responsive web applications and high-performance user interfaces.</p>
            </TiltCard>

            <TiltCard className="md:col-span-1 glass-card p-8 rounded-[2rem] flex flex-col justify-center group min-h-[160px]">
              <div className="flex flex-col mb-4">
                <i className="fa-solid fa-swatchbook text-lg text-indigo-400 mb-4 transition-colors"></i>
                <h3 className="text-base font-bold text-white">Design Systems</h3>
              </div>
              <p className="text-slate-400 text-[10px] opacity-60">Scalable UI foundations and consistent visual languages.</p>
            </TiltCard>

            <TiltCard className="md:col-span-1 glass-card p-8 rounded-[2rem] flex flex-col justify-center group min-h-[160px]">
              <div className="flex flex-col mb-4">
                <i className="fa-solid fa-cloud-bolt text-lg text-indigo-400 mb-4 transition-colors"></i>
                <h3 className="text-base font-bold text-white">REST Architecture</h3>
              </div>
              <p className="text-slate-400 text-[10px] opacity-60">Designing high-performance, secure, and scalable API ecosystems.</p>
            </TiltCard>

            <TiltCard className="md:col-span-2 glass-card p-8 rounded-[2rem] flex flex-col items-center justify-center text-center group min-h-[140px]">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mb-3 group-hover:bg-indigo-900/30 transition-colors">
                <i className="fa-solid fa-shield-halved text-lg text-indigo-400"></i>
              </div>
              <div className="text-[8px] font-bold uppercase tracking-widest text-slate-500">Security First Architecture</div>
            </TiltCard>
          </div>
        </section>

        <section id="resume" className="py-24 max-w-5xl mx-auto px-6 scroll-mt-24">
          <ScrollReveal className="mb-14">
            <h2 className="text-[9px] font-bold uppercase tracking-[0.5em] text-indigo-400 mb-4">Professional Path</h2>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-white">Work Experience.</p>
          </ScrollReveal>

          <div className="space-y-6">
            {EXPERIENCES.map((exp, idx) => (
              <ScrollReveal key={idx}>
                <div className="group glass-card p-8 rounded-[2rem] border border-white/5 hover:border-indigo-500/20 transition-all flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/4">
                    <p className="text-indigo-400 font-bold text-[10px] uppercase tracking-widest mb-1">{exp.period}</p>
                    <h3 className="text-white font-bold text-base leading-tight">{exp.role}</h3>
                    <p className="text-slate-500 text-[11px] font-medium">{exp.company}</p>
                  </div>
                  <div className="md:w-3/4">
                    <ul className="space-y-2">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-slate-400 text-xs sm:text-sm leading-relaxed flex gap-3">
                          <span className="text-indigo-500 mt-1 flex-shrink-0 opacity-50">•</span>
                          <span className="opacity-80">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal>
              <h2 className="text-[9px] font-bold uppercase tracking-[0.5em] text-indigo-400 mb-6">Education</h2>
              <div className="glass-card p-8 rounded-[2rem] border border-white/5">
                <p className="text-indigo-400 font-bold text-[10px] uppercase tracking-widest mb-1">{EDUCATION.period}</p>
                <h3 className="text-white font-bold text-base leading-tight mb-1">{EDUCATION.degree}</h3>
                <p className="text-slate-400 text-xs font-medium mb-2">{EDUCATION.institution}</p>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{EDUCATION.details}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-[9px] font-bold uppercase tracking-[0.5em] text-indigo-400 mb-6">Leadership</h2>
              <div className="glass-card p-8 rounded-[2rem] border border-white/5">
                <p className="text-indigo-400 font-bold text-[10px] uppercase tracking-widest mb-1">{LEADERSHIP.year}</p>
                <h3 className="text-white font-bold text-base leading-tight mb-1">{LEADERSHIP.role}</h3>
                <p className="text-slate-400 text-xs font-medium mb-3">{LEADERSHIP.institution}</p>
                <ul className="space-y-1">
                  {LEADERSHIP.description.map((item, i) => (
                    <li key={i} className="text-slate-400 text-[11px] flex gap-2">
                      <span className="text-indigo-500 opacity-50">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section id="projects" className="py-24 bg-slate-950/30 scroll-mt-24">
          <div className="max-w-5xl mx-auto px-6">
            <ScrollReveal className="text-center mb-20">
              <h2 className="text-[9px] font-bold uppercase tracking-[0.5em] text-indigo-400 mb-4">Portfolio</h2>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter text-white">Project Showcase.</h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14">
              {PROJECTS.map((project, i) => {
                const [currentImage, setCurrentImage] = useState(0);
                const images = project.images || [project.image];

                const nextImage = (e: React.MouseEvent) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentImage((prev) => (prev + 1) % images.length);
                };

                return (
                  <ScrollReveal key={project.id} className={i % 2 === 1 ? 'lg:translate-y-20' : ''}>
                    <TiltCard className="group glass-card rounded-[2.5rem] overflow-hidden border-transparent hover:border-white/10 shadow-2xl transition-all">
                      <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                        <img
                          src={images[currentImage]}
                          alt={project.title}
                          className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-all duration-1000 ease-out opacity-40 group-hover:opacity-100 saturate-50 group-hover:saturate-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80"></div>

                        {images.length > 1 && (
                          <button
                            onClick={nextImage}
                            className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all z-20"
                          >
                            <i className="fa-solid fa-chevron-right text-[10px]"></i>
                          </button>
                        )}

                        <div className="absolute bottom-6 left-6 flex gap-1.5 z-20">
                          {images.map((_, idx) => (
                            <div key={idx} className={`w-1 h-1 rounded-full transition-all ${idx === currentImage ? 'bg-indigo-500 w-4' : 'bg-white/30'}`}></div>
                          ))}
                        </div>
                      </div>
                      <div className="p-8 sm:p-10">
                        <div className="flex flex-wrap gap-2 mb-5">
                          {project.tags.map(tag => (
                            <span key={tag} className="px-2.5 py-1 rounded-full text-[6px] font-bold uppercase tracking-[0.15em] bg-white/5 text-slate-400 border border-white/10 transition-all">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 tracking-tighter text-white group-hover:text-indigo-300 transition-colors">{project.title}</h3>
                        <p className="text-slate-400 leading-relaxed text-xs sm:text-sm mb-6 font-light opacity-70">{project.description}</p>
                        <div className="flex items-center gap-6">
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-[8px] font-bold uppercase tracking-widest text-indigo-400 flex items-center gap-2 group/link">
                            <i className="fa-brands fa-github text-sm"></i>
                            Code
                            <i className="fa-solid fa-arrow-right-long transition-transform group-hover/link:translate-x-2"></i>
                          </a>
                          {project.link && (
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-[8px] font-bold uppercase tracking-widest text-white flex items-center gap-2 group/link">
                              <i className="fa-solid fa-rocket text-sm text-indigo-500"></i>
                              Live Demo
                              <i className="fa-solid fa-arrow-right-long transition-transform group-hover/link:translate-x-2"></i>
                            </a>
                          )}
                        </div>
                      </div>
                    </TiltCard>
                  </ScrollReveal>
                );
              })}

              <ScrollReveal className="lg:translate-y-10">
                <TiltCard className="group glass-card rounded-[2.5rem] overflow-hidden border-indigo-500/10 hover:border-indigo-500/30 shadow-2xl transition-all h-full bg-indigo-500/5 backdrop-blur-3xl border-dashed border-2 flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
                  <div className="w-20 h-20 rounded-full bg-indigo-500/10 flex items-center justify-center mb-8 animate-pulse border border-indigo-500/20">
                    <i className="fa-solid fa-code-merge text-3xl text-indigo-400"></i>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tighter text-white">Innovation in Progress</h3>
                  <p className="text-slate-400 leading-relaxed text-sm font-light opacity-70 mb-8 max-w-[280px]">
                    I'm currently architecting several new systems focused on scalability and real-time data processing.
                  </p>
                  <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-400">Loading New Build</span>
                  </div>
                </TiltCard>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-32 overflow-hidden scroll-mt-24">
          <ScrollReveal className="text-center mb-20 px-6">
            <h2 className="text-[9px] font-bold uppercase tracking-[0.5em] text-indigo-400 mb-4">Wall of Love</h2>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-white">Client Feedback.</h2>
          </ScrollReveal>

          <div className="relative group">
            <div className="flex w-max animate-testimonial-marquee space-x-6 sm:space-x-8 px-6 sm:px-8">
              {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
                <div key={`${t.id}-${idx}`} className="w-[85vw] sm:w-[500px] flex-shrink-0">
                  <div className="glass-card p-8 sm:p-10 rounded-[2.5rem] border border-white/5 relative h-full group/card transition-all hover:border-indigo-500/20 hover:bg-white/5">
                    <div className="absolute top-8 right-10 text-6xl text-white/5 font-serif group-hover/card:text-indigo-500/10 transition-colors">"</div>
                    <div className="flex items-center gap-4 mb-8">
                      <div>
                        <h4 className="text-sm font-bold text-white transition-colors group-hover/card:text-indigo-300">{t.name}</h4>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{t.role} @ {t.company}</p>
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed italic font-light opacity-80 group-hover/card:opacity-100 transition-opacity">
                      {t.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Fade overlays for smooth edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none"></div>
          </div>

          <style>{`
            @keyframes testimonial-marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-33.33%); }
            }
            .animate-testimonial-marquee {
              animation: testimonial-marquee 40s linear infinite;
            }
            .group:hover .animate-testimonial-marquee {
              animation-play-state: paused;
            }
          `}</style>
        </section>

        <section id="contact" className="py-40 relative overflow-hidden scroll-mt-24">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 blur-[200px] rounded-full pointer-events-none"></div>

          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <ScrollReveal className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter leading-none mb-8 text-white">
                Ready to <br /> <span className="text-indigo-400">Collaborate?</span>
              </h2>
              <p className="max-w-xs mx-auto text-slate-400 text-sm sm:text-base mb-14 font-light opacity-60">
                Send a message and I'll get back to you within 24 hours.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                <div className="lg:col-span-2 space-y-10">
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-4">Contact Details</h4>
                    <div className="space-y-6">
                      <a href={`mailto:${PERSONAL_INFO.email}`} className="group flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-indigo-500/10 group-hover:border-indigo-500/50 transition-all">
                          <i className="fa-solid fa-envelope text-xs text-slate-400 group-hover:text-white"></i>
                        </div>
                        <span className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors">{PERSONAL_INFO.email}</span>
                      </a>
                      <div className="group flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-indigo-500/10 group-hover:border-indigo-500/50 transition-all">
                          <i className="fa-solid fa-phone text-xs text-slate-400 group-hover:text-white"></i>
                        </div>
                        <span className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors">{PERSONAL_INFO.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-4">Social Presence</h4>
                    <div className="flex gap-4">
                      {[
                        { icon: 'fa-github', link: PERSONAL_INFO.github },
                        { icon: 'fa-linkedin-in', link: PERSONAL_INFO.linkedin },
                        { icon: 'fa-twitter', link: PERSONAL_INFO.twitter }
                      ].map((social, i) => (
                        <a key={i} href={social.link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 glass-card rounded-xl flex items-center justify-center text-base text-slate-400 hover:text-white hover:bg-indigo-500/10 hover:border-indigo-500/30 transition-all border border-white/5">
                          <i className={`fab ${social.icon}`}></i>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-3">
                  <form className="glass-card p-10 rounded-[2.5rem] border border-white/5 space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                        <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-slate-600" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                        <input type="email" placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-slate-600" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-slate-500 ml-1">Message</label>
                      <textarea rows={4} placeholder="I have a project in mind..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-slate-600 resize-none"></textarea>
                    </div>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}?subject=Project Consultation&body=Hello Shabbir, I have a project in mind...`}
                      className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-indigo-600/20 transition-all active:scale-95 flex items-center justify-center gap-3 no-underline"
                    >
                      Send Message
                      <i className="fa-solid fa-paper-plane text-[10px]"></i>
                    </a>
                  </form>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <footer className="py-14 border-t border-white/5 text-center bg-[#020617]">
          <div className="text-lg font-bold tracking-tighter mb-4 text-white">
            SB<span className="text-indigo-500">.</span>
          </div>
          <p className="text-slate-500 text-[8px] font-bold uppercase tracking-[0.8em] px-4 opacity-50">
            Designed & Engineered by Shabbir Badsha &copy; {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
