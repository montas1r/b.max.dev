"use client";

import React from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from '@/components/ui/sidebar';
import { PortfolioCategory } from '@/types/portfolio';
import { Home, LayoutGrid, Award, Briefcase, Heart, Github, Linkedin, Twitter } from 'lucide-react';

const categories: { name: PortfolioCategory; icon: React.ReactNode; id: string }[] = [
  { name: 'Continuous Works', icon: <Home className="w-4 h-4" />, id: 'continuous-works' },
  { name: 'Build Projects', icon: <LayoutGrid className="w-4 h-4" />, id: 'build-projects' },
  { name: 'Skills Learning', icon: <Award className="w-4 h-4" />, id: 'skills-learning' },
  { name: 'Works', icon: <Briefcase className="w-4 h-4" />, id: 'works' },
  { name: 'Hobbies', icon: <Heart className="w-4 h-4" />, id: 'hobbies' },
];

export function AppSidebar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Sidebar className="border-r border-border bg-card/50 backdrop-blur-xl">
      <SidebarHeader className="p-6">
        <div className="flex flex-col gap-1">
          <h2 className="font-headline text-2xl font-bold tracking-tighter">
            <span className="text-foreground">b.</span>
            <span className="text-primary">max</span>
            <span className="text-foreground">.dev</span>
          </h2>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
            Portfolio v2.0
          </p>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs font-bold uppercase tracking-widest text-muted-foreground/50">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => scrollToSection(item.id)}
                    className="hover:bg-primary/10 hover:text-primary transition-all duration-300 py-6 px-4"
                  >
                    {item.icon}
                    <span className="font-medium">{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto mb-6">
          <SidebarGroupLabel className="px-4 text-xs font-bold uppercase tracking-widest text-muted-foreground/50">
            Connect
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-row gap-2 px-4 mt-2">
              <SidebarMenuItem>
                <SidebarMenuButton size="icon" className="rounded-full bg-secondary/50 hover:bg-primary/20 hover:text-primary">
                  <Github className="w-4 h-4" />
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton size="icon" className="rounded-full bg-secondary/50 hover:bg-primary/20 hover:text-primary">
                  <Linkedin className="w-4 h-4" />
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton size="icon" className="rounded-full bg-secondary/50 hover:bg-primary/20 hover:text-primary">
                  <Twitter className="w-4 h-4" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
