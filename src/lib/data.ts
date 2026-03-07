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
    id: 'bp-1',
    title: 'ZenFlow Task Manager',
    description: 'A minimalist productivity app focused on deep work and flow state.',
    problem: 'Traditional task managers are often cluttered, leading to "productivity porn" rather than actual work.',
    solution: 'Built a strictly limited interface that enforces a single-task focus and integrated white-noise generators to maintain flow.',
    fullDescription: 'ZenFlow is a productivity tool built with Next.js and SQLite. It leverages the concept of "Deep Work" by strictly limiting the number of active tasks and providing built-in focus timers.',
    category: 'Build Projects',
    imageUrl: 'https://picsum.photos/seed/flow/800/600',
    tags: ['Next.js', 'React', 'Tailwind', 'SQLite'],
    links: [{ label: 'GitHub', url: '#' }, { label: 'Live Demo', url: '#' }]
  },
  {
    id: 'cw-1',
    title: 'Cloud Monitoring Mesh',
    description: 'High-availability server mesh for distributed applications.',
    problem: 'Distributed systems often lack a single source of truth for health metrics across multi-cloud environments.',
    solution: 'Developed a custom Prometheus-based exporter mesh that aggregates telemetry data into a unified Grafana dashboard with sub-second latency.',
    fullDescription: 'An ongoing effort to monitor and optimize cloud infrastructure using Prometheus, Grafana, and custom Go agents.',
    category: 'Continuous Works',
    imageUrl: 'https://picsum.photos/seed/infra/800/600',
    tags: ['Go', 'Docker', 'Kubernetes', 'Grafana'],
    links: [{ label: 'GitHub', url: '#' }]
  },
  {
    id: 'bp-2',
    title: 'Edge AI Classifier',
    description: 'Privacy-first image recognition using TensorFlow.js.',
    problem: 'Users are increasingly hesitant to upload private photos to cloud-based AI services for processing.',
    solution: 'Implemented client-side inference using TF.js, ensuring that no user data ever leaves the device while maintaining high accuracy.',
    fullDescription: 'A project to demonstrate the power of client-side machine learning. This app classifies images in real-time using the user\'s webcam.',
    category: 'Build Projects',
    imageUrl: 'https://picsum.photos/seed/ai-img/800/600',
    tags: ['TF.js', 'AI', 'JavaScript'],
    links: [{ label: 'GitHub', url: '#' }, { label: 'Live Demo', url: '#' }]
  }
];
