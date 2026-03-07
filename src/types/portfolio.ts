export type PortfolioCategory = 'Continuous Works' | 'Build Projects' | 'Skills Learning' | 'Hobbies';

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  problem?: string;
  solution?: string;
  category: PortfolioCategory;
  imageUrl: string;
  tags: string[];
  links?: { label: string; url: string }[];
}

export interface TechGroup {
  category: string;
  skills: string[];
}
