
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  images?: string[]; // Multiple images for carousel
  link: string;      // Live URL
  github?: string;
}

export interface Skill {
  name: string;
  icon: string;
  color?: string; // Brand color for marquee hover
  category: 'frontend' | 'backend' | 'tools' | 'other';
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
}
