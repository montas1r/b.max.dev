
"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { PlusCircle, Loader2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const formSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(5, "Short description is required"),
  fullDescription: z.string().min(10, "Detailed description is required"),
  category: z.enum(['Continuous Works', 'Build Projects', 'Skills Learning', 'Hobbies']),
  imageUrl: z.string().url("Must be a valid URL"),
  tags: z.string().describe("Comma separated tags"),
});

export function AddProjectDialog() {
  const [isOpen, setIsOpen] = React.useState(false);
  const db = useFirestore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      fullDescription: "",
      category: "Build Projects",
      imageUrl: "https://picsum.photos/seed/new/800/600",
      tags: "React, Next.js, Tailwind",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!db) return;

    const projectData = {
      ...values,
      tags: values.tags.split(',').map(t => t.trim()),
      createdAt: serverTimestamp(),
    };

    addDoc(collection(db, 'projects'), projectData)
      .then(() => {
        setIsOpen(false);
        form.reset();
      })
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: 'projects',
          operation: 'create',
          requestResourceData: projectData,
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="w-4 h-4" />
          Add Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
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
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Input placeholder="A brief tagline..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Case Study Detail</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Detailed breakdown of the project..." className="min-h-[100px]" {...field} />
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
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Project
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
