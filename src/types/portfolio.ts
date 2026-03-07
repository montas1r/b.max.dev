export type PortfolioCategory = 'Continuous Works' | 'Build Projects' | 'Skills Learning' | 'Works' | 'Hobbies';

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  category: PortfolioCategory;
  imageUrl: string;
  tags: string[];
  links?: { label: string; url: string }[];
}