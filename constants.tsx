
import React from 'react';
import { Project, Skill, Experience, Testimonial } from './types';

export const PERSONAL_INFO = {
  name: 'Shabbir Badsha',
  role: 'MERN Stack Developer',
  bio: 'Full-stack developer focused on building scalable, user-centric web applications and robust architectures.',
  location: 'Indore, India',
  email: 'shabbirbadsha007@gmail.com',
  phone: '+91 7389072753',
  resumeUrl: '/RESUME_SHABBIR_BADSHA.pdf',
  github: 'https://github.com/shabbir1321',
  linkedin: 'https://www.linkedin.com/in/shabbir-badsha-b13507251/',
  twitter: 'https://twitter.com/shabbir_dev',
  isAvailable: true // Live availability status
};

export const PROJECTS: Project[] = [
  {
    id: '3',
    title: 'TajFlow: Photography Business Suite',
    description: 'A comprehensive management platform built for Taj Photography. Features cross-platform client bookings, automated invoicing, and a custom gallery delivery system.',
    tags: ['Full Stack', 'Business Logic', 'Gallery Engine', 'Automation'],
    image: '/taj2.png',
    images: [
      '/taj2.png',
      '/taj.jpg'
    ],
    link: 'https://taj-photography-system.vercel.app/',
    github: 'https://github.com/shabbir1321/taj-photography-system'
  },
  {
    id: '2',
    title: 'PrintStore: Virtual Printing Ecosystem',
    description: 'A dedicated platform for digital document management and physical print fulfillment. Streamlines the process from digital upload to professional printing.',
    tags: ['E-commerce', 'Fulfillment API', 'Document Storage', 'React'],
    image: 'https://images.unsplash.com/photo-1562654501-a0ccc0af3fb1?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1562654501-a0ccc0af3fb1?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200'
    ],
    link: 'https://online-doc-printing.vercel.app/',
    github: 'https://github.com/shabbir1321/online-doc-printing'
  },
  {
    id: '1',
    title: 'Music Recommendation Web App',
    description: 'A web-based application providing personalized music suggestions through efficient backend logic with a Flask server for real-time recommendations.',
    tags: ['Python', 'Pandas', 'Flask', 'Web Development'],
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1200'
    ],
    github: 'https://github.com/shabbir1321',
    link: '' // Removed live link
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Mustafa Jana',
    role: 'Photographer',
    company: 'Taj Photography Studio',
    content: 'Shabbir is an exceptional developer who truly understands user needs. The business app he built for us was both performant and incredibly intuitive.',
    avatar: 'https://i.pravatar.cc/150?u=sarah'
  },
  {
    id: '2',
    name: 'Taha ',
    role: 'business man',
    company: 'JS Enterprise',
    content: 'Impressive attention to detail and a strong presentation. Shabbir delivered our printing app on time with zero major bugs.',
    avatar: 'https://i.pravatar.cc/150?u=david'
  }
];

export const SKILLS: Skill[] = [
  { name: 'JavaScript', icon: 'fa-brands fa-js', color: '#f7df1e', category: 'frontend' },
  { name: 'React.js', icon: 'fa-brands fa-react', color: '#61dafb', category: 'frontend' },
  { name: 'Node.js', icon: 'fa-brands fa-node-js', color: '#339933', category: 'backend' },
  { name: 'Express.js', icon: 'fa-solid fa-server', color: '#ffffff', category: 'backend' },
  { name: 'MongoDB', icon: 'fa-solid fa-database', color: '#47a248', category: 'backend' },
  { name: 'Python', icon: 'fa-brands fa-python', color: '#3776ab', category: 'backend' },
  { name: 'Tailwind CSS', icon: 'fa-solid fa-wind', color: '#06b6d4', category: 'frontend' },
  { name: 'SQL/MySQL', icon: 'fa-solid fa-table', color: '#4479a1', category: 'backend' },
  { name: 'Git/GitHub', icon: 'fa-brands fa-github', color: '#ffffff', category: 'tools' },
  { name: 'Postman', icon: 'fa-solid fa-paper-plane', color: '#ff6c37', category: 'tools' },
];

export const EXPERIENCES: Experience[] = [
  {
    company: 'Mactosys Software Technology Pvt. Ltd',
    role: 'React.js Developer Intern',
    period: 'Dec 2025 - Present',
    description: [
      'Developed interactive and responsive user interfaces using React.js, improving overall user experience.',
      'Collaborated with backend teams to integrate APIs and ensure seamless data flow.',
      'Optimized component performance using React hooks and best practices.',
      'Participated in code reviews and followed Agile development practices for timely feature delivery.'
    ]
  },
  {
    company: 'Medoc Health Private Limited',
    role: 'MERN Stack Developer Intern',
    period: 'Jan 2025 - May 2025',
    description: [
      'Developed responsive healthcare web applications with optimized frontend and backend performance.',
      'Built and integrated RESTful APIs to enable smooth client-server communication.',
      'Created reusable UI components using React.js to improve development efficiency.',
      'Maintained version control using Git and followed best coding practices.'
    ]
  }
];

export const EDUCATION = {
  institution: 'Medicaps University',
  degree: 'Bachelor of Technology',
  period: 'Sep 2021 - Nov 2025',
  details: 'CGPA: 7.54 | Indore, Madhya Pradesh'
};

export const LEADERSHIP = {
  role: 'Graphics Head, IEEE Student Branch',
  institution: 'Medicaps University',
  year: '2024',
  description: [
    'Designed branding materials and promotional content for technical events.',
    'Collaborated with teams to improve event visibility and engagement.'
  ]
};
