import { PortfolioItem, TechGroup } from '@/types/portfolio';

export const techStack: TechGroup[] = [
  {
    category: 'Frontend',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Framer Motion']
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Firebase', 'PostgreSQL', 'Genkit AI', 'GraphQL']
  },
  {
    category: 'Tools',
    skills: ['Git', 'Docker', 'Google Cloud', 'Vercel', 'Linux']
  }
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: '1',
    title: 'Nexus Cloud',
    description: 'Enterprise-grade cloud management platform.',
    fullDescription: 'A comprehensive cloud management solution built for scale. Features real-time resource tracking, automated deployment pipelines, and advanced security auditing.',
    problem: 'Managing complex multi-cloud environments was manual and error-prone.',
    solution: 'Built an unified dashboard that aggregates data from multiple providers with one-click actions.',
    category: 'Build Projects',
    imageUrl: 'https://picsum.photos/seed/cloud/800/600',
    tags: ['Next.js', 'Go', 'Kubernetes'],
    liveUrl: 'https://nexus-cloud-demo.com',
    links: [
      { label: 'GitHub', url: '#' }
    ]
  },
  {
    id: '2',
    title: 'Echo AI',
    description: 'Real-time sentiment analysis for customer support.',
    fullDescription: 'An AI-driven platform that analyzes customer sentiment in real-time, providing support agents with actionable insights and automated response suggestions.',
    problem: 'Support teams struggled to prioritize urgent issues in high-volume queues.',
    solution: 'Developed a sentiment-aware routing engine using Genkit and Gemini.',
    category: 'Continuous Works',
    imageUrl: 'https://picsum.photos/seed/ai/800/600',
    tags: ['React', 'Genkit', 'Firebase'],
    liveUrl: 'https://echo-ai-analysis.io',
    links: [
      { label: 'GitHub', url: '#' }
    ]
  },
  {
    id: '3',
    title: 'Pulse Analytics',
    description: 'High-performance data visualization for IoT devices.',
    fullDescription: 'A sleek analytics dashboard capable of handling millions of data points from edge devices with sub-second latency.',
    problem: 'Existing solutions couldn\'t handle the high frequency of data updates without lagging.',
    solution: 'Optimized the rendering engine using WebGL and efficient data streaming.',
    category: 'Build Projects',
    imageUrl: 'https://picsum.photos/seed/data/800/600',
    tags: ['TypeScript', 'Three.js', 'Redis'],
    // No liveUrl provided to demonstrate locked state
    links: [
      { label: 'GitHub', url: '#' }
    ]
  }
];