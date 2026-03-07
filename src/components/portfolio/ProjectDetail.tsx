"use client";

import React, { useState } from 'react';
import { PortfolioItem } from '@/types/portfolio';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Sparkles, Loader2, AlertCircle, CheckCircle2, Target, Globe, Lock } from 'lucide-react';
import Image from 'next/image';
import { generateProjectSummary } from '@/ai/flows/ai-generated-project-summary-flow';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ProjectDetailProps {
  item: PortfolioItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetail({ item, isOpen, onClose }: ProjectDetailProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!item) return null;

  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const res = await generateProjectSummary({
        title: item.title,
        description: item.fullDescription,
      });
      setSummary(res.summary);
    } catch (err) {
      setError("Failed to generate AI summary. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl bg-card border-border p-0 overflow-hidden gap-0">
        <ScrollArea className="max-h-[90vh]">
          <div className="relative aspect-video w-full overflow-hidden bg-muted/20">
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
               <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30 uppercase tracking-widest text-[10px] mb-3 backdrop-blur-sm">
                {item.category}
              </Badge>
              <DialogTitle className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                {item.title}
              </DialogTitle>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            <div className="flex flex-wrap gap-2">
              {item.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="bg-secondary/40 text-muted-foreground px-3 py-1">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {item.problem && (
                    <div className="p-5 rounded-xl border border-border bg-card/50">
                      <div className="flex items-center gap-2 mb-3 text-primary">
                        <Target className="w-4 h-4" />
                        <h4 className="text-xs font-bold uppercase tracking-widest">The Challenge</h4>
                      </div>
                      <p className="text-sm text-muted-foreground italic leading-relaxed">
                        {item.problem}
                      </p>
                    </div>
                  )}
                  {item.solution && (
                    <div className="p-5 rounded-xl border border-border bg-card/50">
                      <div className="flex items-center gap-2 mb-3 text-primary">
                        <CheckCircle2 className="w-4 h-4" />
                        <h4 className="text-xs font-bold uppercase tracking-widest">The Solution</h4>
                      </div>
                      <p className="text-sm text-muted-foreground italic leading-relaxed">
                        {item.solution}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2">Case Study Details</h4>
                  <p className="text-foreground leading-relaxed whitespace-pre-wrap text-sm md:text-base opacity-90">
                    {item.fullDescription}
                  </p>
                </div>

                {summary && (
                  <div className="p-6 bg-primary/5 border border-primary/20 rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Sparkles className="w-12 h-12 text-primary" />
                    </div>
                    <div className="flex items-center gap-2 mb-3 text-primary">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-widest">AI Insights</span>
                    </div>
                    <p className="text-sm md:text-base text-foreground/90 italic leading-relaxed relative z-10">
                      "{summary}"
                    </p>
                  </div>
                )}

                {error && (
                  <div className="flex items-center gap-2 text-destructive text-sm p-3 bg-destructive/5 rounded-md border border-destructive/20">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </div>
                )}
              </div>

              <div className="space-y-8">
                <div className="p-6 rounded-xl border border-border bg-muted/10 space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Access & Resources</h4>
                    <div className="flex flex-col gap-3">
                      {/* Live Access Button */}
                      <Button 
                        variant={item.liveUrl ? "default" : "secondary"} 
                        className={`w-full justify-between group h-12 ${!item.liveUrl && 'opacity-50 cursor-not-allowed'}`}
                        disabled={!item.liveUrl}
                        asChild={!!item.liveUrl}
                      >
                        {item.liveUrl ? (
                          <a href={item.liveUrl} target="_blank" rel="noopener noreferrer">
                            <span className="flex items-center gap-2">
                              <Globe className="w-4 h-4" />
                              Direct Web Access
                            </span>
                            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </a>
                        ) : (
                          <span className="flex items-center justify-between w-full">
                            <span className="flex items-center gap-2">
                              <Globe className="w-4 h-4" />
                              Access Locked
                            </span>
                            <Lock className="w-4 h-4 opacity-50" />
                          </span>
                        )}
                      </Button>

                      {item.links && item.links.length > 0 && (
                        <div className="pt-2 flex flex-col gap-2">
                          {item.links.map(link => (
                            <Button key={link.label} variant="outline" className="w-full justify-between group" asChild>
                              <a href={link.url} target="_blank" rel="noopener noreferrer">
                                {link.label}
                                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                              </a>
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">AI Enhanced</h4>
                    {!summary && (
                      <Button 
                        onClick={handleGenerateSummary} 
                        disabled={isGenerating}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2 h-11"
                      >
                        {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                        {isGenerating ? "Processing..." : "Generate AI Summary"}
                      </Button>
                    )}
                    {summary && (
                      <div className="flex items-center justify-center gap-2 text-[10px] text-primary font-bold uppercase tracking-widest">
                        <CheckCircle2 className="w-3 h-3" />
                        Analysis Complete
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}