import { PortfolioItem } from '@/types/portfolio';

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'cw-1',
    title: 'Cloud Infrastructure Monitoring',
    description: 'Maintaining a high-availability server mesh for distributed applications.',
    fullDescription: 'An ongoing effort to monitor and optimize cloud infrastructure using Prometheus, Grafana, and custom Go agents. This project involves managing multiple clusters across AWS and GCP, ensuring 99.99% uptime through automated failover mechanisms and proactive bottleneck identification.',
    category: 'Continuous Works',
    imageUrl: 'https://picsum.photos/seed/infra/800/600',
    tags: ['Go', 'Docker', 'Kubernetes', 'Grafana'],
    links: [{ label: 'Dashboard', url: '#' }]
  },
  {
    id: 'bp-1',
    title: 'ZenFlow Task Manager',
    description: 'A minimalist productivity app focused on deep work and flow state.',
    fullDescription: 'ZenFlow is a productivity tool built with Next.js and SQLite. It leverages the concept of "Deep Work" by strictly limiting the number of active tasks and providing built-in white noise and focus timers. The UI is designed to be as non-distracting as possible.',
    category: 'Build Projects',
    imageUrl: 'https://picsum.photos/seed/flow/800/600',
    tags: ['Next.js', 'React', 'Tailwind', 'SQLite'],
    links: [{ label: 'Source', url: '#' }, { label: 'Live Demo', url: '#' }]
  },
  {
    id: 'sl-1',
    title: 'Advanced Rust Systems',
    description: 'Deep dive into memory management and zero-cost abstractions in Rust.',
    fullDescription: 'Currently exploring the internals of the Rust compiler and async runtimes. Focus areas include manual memory management through unsafe Rust where necessary, and optimizing high-performance network protocols.',
    category: 'Skills Learning',
    imageUrl: 'https://picsum.photos/seed/rust/800/600',
    tags: ['Rust', 'Systems', 'Wasm'],
  },
  {
    id: 'w-1',
    title: 'Senior Frontend at NexaCorp',
    description: 'Led the transition from a monolithic legacy app to a modern micro-frontend architecture.',
    fullDescription: 'During my time at NexaCorp, I spearheaded the frontend migration. We moved from a jQuery-heavy PHP application to a set of React-based micro-frontends managed via Module Federation. This improved development speed by 40% and reduced bundle sizes significantly.',
    category: 'Works',
    imageUrl: 'https://picsum.photos/seed/nexa/800/600',
    tags: ['React', 'Webpack', 'Leadership'],
  },
  {
    id: 'h-1',
    title: 'Mechanical Keyboards',
    description: 'Designing and building custom split mechanical keyboards.',
    fullDescription: 'A passion for tactile feedback and ergonomics. I design PCB layouts in KiCad, source switches, and hand-solder custom split keyboards. Current daily driver is a customized Corne with silent tactile switches.',
    category: 'Hobbies',
    imageUrl: 'https://picsum.photos/seed/kb/800/600',
    tags: ['Hardware', 'DIY', 'Design'],
  },
  {
    id: 'bp-2',
    title: 'AI Image Classifier',
    description: 'Edge-based image recognition using TensorFlow.js.',
    fullDescription: 'A project to demonstrate the power of client-side machine learning. This app classifies images in real-time using the user\'s webcam without sending any data to a server, ensuring privacy and low latency.',
    category: 'Build Projects',
    imageUrl: 'https://picsum.photos/seed/ai-img/800/600',
    tags: ['TF.js', 'AI', 'JavaScript'],
  }
];