"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { PortfolioCategory } from '@/types/portfolio';

const categories: PortfolioCategory[] = ['Continuous Works', 'Build Projects', 'Skills Learning', 'Works', 'Hobbies'];

export function SectionNav() {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      
      const sections = categories.map(cat => cat.toLowerCase().replace(' ', '-'));
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "sticky top-0 z-40 w-full transition-all duration-300 border-b border-transparent backdrop-blur-md",
      isScrolled ? "bg-background/80 border-border py-2" : "bg-transparent py-4"
    )}>
      <div className="container mx-auto px-4 flex justify-center md:justify-start items-center gap-4 md:gap-8 overflow-x-auto no-scrollbar">
        {categories.map((cat) => {
          const id = cat.toLowerCase().replace(' ', '-');
          return (
            <a
              key={cat}
              href={`#${id}`}
              className={cn(
                "whitespace-nowrap text-sm font-medium transition-colors hover:text-primary relative py-2",
                activeSection === id ? "text-primary" : "text-muted-foreground"
              )}
            >
              {cat}
              {activeSection === id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
              )}
            </a>
          );
        })}
      </div>
    </nav>
  );
}