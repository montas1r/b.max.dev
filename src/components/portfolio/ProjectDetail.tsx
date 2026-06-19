"use client";

import React from 'react';
import { PortfolioItem } from '@/types/portfolio';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, CheckCircle2, Target, Globe, Lock, Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ProjectDetailProps {
  item: PortfolioItem | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (item: PortfolioItem) => void;
  onDelete?: (item: PortfolioItem) => void;
}

export function ProjectDetail({ item, isOpen, onClose, onEdit, onDelete }: ProjectDetailProps) {
  if (!item) return null;

  // [FIXED] Bridge standard snake_case and camelCase field payloads securely
  const dbImageUrl = (item as any).image_url;
  const rawSrc = item.imageUrl || dbImageUrl;
  const validImageSrc = rawSrc && rawSrc.trim() !== "" ? rawSrc : `https://picsum.photos/seed/${item.title || 'project'}/800/600`;

  const validLiveUrl = item.liveUrl || (item as any).live_url;
  const validFullDescription = item.fullDescription || (item as any).full_description || item.description || "";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl bg-card border-border p-0 overflow-hidden gap-0">
        <ScrollArea className="max-h-[90vh]">
          <div className="relative aspect-video w-full overflow-hidden bg-muted/20">
            <Image
              src={validImageSrc}
              alt={item.title || "Project Detail Image"}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 800px"
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
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {item.tags && item.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="bg-secondary/40 text-muted-foreground px-3 py-1">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                {onEdit && (
                  <Button variant="outline" size="sm" className="gap-2 text-xs uppercase tracking-widest font-bold h-8" onClick={() => onEdit(item)}>
                    <Pencil className="w-3 h-3" />
                    Edit
                  </Button>
                )}
                {onDelete && (
                  <Button variant="destructive" size="sm" className="gap-2 text-xs uppercase tracking-widest font-bold h-8" onClick={() => onDelete(item)}>
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </Button>
                )}
              </div>
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
                    {validFullDescription}
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="p-6 rounded-xl border border-border bg-muted/10 space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Access & Resources</h4>
                    <div className="flex flex-col gap-3">
                      <Button 
                        variant={validLiveUrl ? "default" : "secondary"} 
                        className={`w-full justify-between group h-12 ${!validLiveUrl && 'opacity-50 cursor-not-allowed'}`}
                        disabled={!validLiveUrl}
                        asChild={!!validLiveUrl}
                      >
                        {validLiveUrl ? (
                          <a href={validLiveUrl} target="_blank" rel="noopener noreferrer">
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
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}