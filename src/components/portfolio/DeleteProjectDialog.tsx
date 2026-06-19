"use client";

import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useUser } from '@/supabase/provider';
import { PortfolioItem } from '@/types/portfolio';

interface DeleteProjectDialogProps {
  project: PortfolioItem | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void; // 👈 1. Add the onSuccess interface configuration
}

export function DeleteProjectDialog({ project, isOpen, onOpenChange, onSuccess }: DeleteProjectDialogProps) {
  const { supabase } = useUser();

  const handleDelete = async () => {
    if (!project) return;

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', project.id);

    if (error) {
      console.error(`Database error executing removal for entity sequence ${project.id}:`, error.message);
    } else {
      // [FIXED] Trigger the reactive data refetch on the parent page before dismissing the dialog
      if (onSuccess) onSuccess(); 
      onOpenChange(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the project <span className="font-bold text-foreground">"{project?.title}"</span> and remove it from your portfolio archive. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Delete Project
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}