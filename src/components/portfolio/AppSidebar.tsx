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
  SidebarGroupContent,
  SidebarFooter
} from '@/components/ui/sidebar';
import { Home, LayoutGrid, Info, Layers, Mail, Github, Linkedin, Twitter } from 'lucide-react';

const sections = [
  { name: 'Home', icon: <Home className="w-4 h-4" />, id: 'home' },
  { name: 'Projects', icon: <LayoutGrid className="w-4 h-4" />, id: 'projects' },
  { name: 'Tech Stack', icon: <Layers className="w-4 h-4" />, id: 'stack' },
  { name: 'About', icon: <Info className="w-4 h-4" />, id: 'about' },
  { name: 'Contact', icon: <Mail className="w-4 h-4" />, id: 'contact' },
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
            <span className="text-foreground">b.max.</span>
            <span className="text-primary">dev</span>
          </h2>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
            Full-Stack Portfolio
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
              {sections.map((item) => (
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
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex justify-center gap-2">
          <SidebarMenuButton size="icon" className="rounded-full bg-secondary/50 hover:bg-primary/20 hover:text-primary" asChild>
            <a href="https://github.com/montas1r" target="_blank" rel="noopener noreferrer"><Github className="w-4 h-4" /></a>
          </SidebarMenuButton>
          <SidebarMenuButton size="icon" className="rounded-full bg-secondary/50 hover:bg-primary/20 hover:text-primary" asChild>
            <a href="https://www.linkedin.com/in/montasir-karim-bd7/" target="_blank" rel="noopener noreferrer"><Linkedin className="w-4 h-4" /></a>
          </SidebarMenuButton>
          <SidebarMenuButton size="icon" className="rounded-full bg-secondary/50 hover:bg-primary/20 hover:text-primary" asChild>
            <a href="https://twitter.com/_m0n7asir_" target="_blank" rel="noopener noreferrer"><Twitter className="w-4 h-4" /></a>
          </SidebarMenuButton>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}