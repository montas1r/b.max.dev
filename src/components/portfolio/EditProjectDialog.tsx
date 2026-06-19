"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Image as ImageIcon, Globe, Save } from 'lucide-react';
import { useUser } from '@/supabase/provider';
import { PortfolioItem } from '@/types/portfolio';

const formSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(5, "Short description is required"),
  fullDescription: z.string().min(10, "Detailed description is required"),
  problem: z.string().optional(),
  solution: z.string().optional(),
  category: z.z.enum(['Continuous Works', 'Build Projects', 'Skills Learning', 'Hobbies']),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  liveUrl: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  tags: z.string().describe("Comma separated tags"),
});

interface EditProjectDialogProps {
  project: PortfolioItem | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void; // 👈 1. Add this optional prop
}

export function EditProjectDialog({ project, isOpen, onOpenChange, onSuccess }: EditProjectDialogProps) {
  const { supabase } = useUser();
  // router can be removed if not used elsewhere, keeping it clean
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      fullDescription: "",
      problem: "",
      solution: "",
      category: "Build Projects",
      imageUrl: "",
      liveUrl: "",
      tags: "",
    },
  });

  useEffect(() => {
    if (project) {
      form.reset({
        title: project.title,
        description: project.description,
        fullDescription: project.fullDescription || (project as any).full_description || "",
        problem: project.problem || "",
        solution: project.solution || "",
        category: project.category,
        imageUrl: project.imageUrl || (project as any).image_url || "",
        liveUrl: project.liveUrl || (project as any).live_url || "",
        tags: Array.isArray(project.tags) ? project.tags.join(", ") : "",
      });
    }
  }, [project, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!project) return;

    const dbPayload = {
      title: values.title,
      description: values.description,
      full_description: values.fullDescription,
      problem: values.problem || null,
      solution: values.solution || null,
      category: values.category,
      image_url: values.imageUrl || null,
      live_url: values.liveUrl || null,
      tags: values.tags.split(',').map(t => t.trim()).filter(Boolean),
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('projects')
      .update(dbPayload)
      .eq('id', project.id);

    if (error) {
      console.error(`Database error updating target record payload index ${project.id}:`, error.message);
    } else {
      if (onSuccess) onSuccess(); // 👈 2. Call the state refresh function here
      onOpenChange(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Project: {project?.title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Project Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Continuous Works">Continuous Works</SelectItem>
                        <SelectItem value="Build Projects">Build Projects</SelectItem>
                        <SelectItem value="Skills Learning">Skills Learning</SelectItem>
                        <SelectItem value="Hobbies">Hobbies</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="liveUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Live / Web Access URL</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input placeholder="https://demo.com" {...field} />
                        <Globe className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground opacity-50" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input placeholder="https://..." {...field} />
                      <ImageIcon className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground opacity-50" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Tagline</FormLabel>
                  <FormControl>
                    <Input placeholder="A brief description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="problem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>The Challenge</FormLabel>
                    <FormControl>
                      <Textarea placeholder="What problem were you solving?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="solution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>The Solution</FormLabel>
                    <FormControl>
                      <Textarea placeholder="How did you solve it?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="fullDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Case Study</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Explain the project details..." className="min-h-[150px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags (Comma separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="React, Firebase, UI" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full gap-2" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Update Project
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}