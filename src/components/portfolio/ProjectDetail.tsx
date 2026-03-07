"use client";

import React, { useState } from 'react';
import { PortfolioItem } from '@/types/portfolio';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Sparkles, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { generateProjectSummary } from '@/ai/flows/ai-generated-project-summary-flow';

interface ProjectDetailProps {
  item: PortfolioItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetail({ item, isOpen, onClose }: ProjectDetailProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!item) return null;

  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    try {
      const res = await generateProjectSummary({
        title: item.title,
        description: item.fullDescription,
      });
      setSummary(res.summary);
    } catch (error) {
      console.error("Summary generation failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-primary border-primary/30 uppercase tracking-widest text-[10px]">
              {item.category}
            </Badge>
          </div>
          <DialogTitle className="text-3xl font-headline font-bold text-foreground">
            {item.title}
          </DialogTitle>
        </DialogHeader>

        <div className="relative aspect-video w-full rounded-lg overflow-hidden my-4 border border-border">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {item.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="bg-secondary/40 text-muted-foreground">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">About the Project</h4>
              <p className="text-foreground leading-relaxed">
                {item.fullDescription}
              </p>

              {summary && (
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center gap-2 mb-2 text-primary">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase">AI Enhanced Summary</span>
                  </div>
                  <p className="text-sm text-foreground/90 italic leading-relaxed">
                    "{summary}"
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Actions</h4>
                <div className="flex flex-col gap-2">
                  {item.links?.map(link => (
                    <Button key={link.label} variant="outline" className="w-full justify-between" asChild>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.label}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  ))}
                  
                  {!summary && (
                    <Button 
                      onClick={handleGenerateSummary} 
                      disabled={isGenerating}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                    >
                      {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                      {isGenerating ? "Summarizing..." : "AI Generate Summary"}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}