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
import { doc, deleteDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { PortfolioItem } from '@/types/portfolio';

interface DeleteProjectDialogProps {
  project: PortfolioItem | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteProjectDialog({ project, isOpen, onOpenChange }: DeleteProjectDialogProps) {
  const db = useFirestore();

  const handleDelete = async () => {
    if (!db || !project) return;

    deleteDoc(doc(db, 'projects', project.id))
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: `projects/${project.id}`,
          operation: 'delete',
        });
        errorEmitter.emit('permission-error', permissionError);
      });

    onOpenChange(false);
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
