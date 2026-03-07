"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth, useUser } from '@/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Loader2, LogIn, LogOut, ShieldCheck, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function AdminPage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isAdmin = user && !user.isAnonymous;

  async function onLogin(values: z.infer<typeof loginSchema>) {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      router.push('/projects');
    } catch (err: any) {
      setError(err.message || "Failed to sign in. Please check your credentials.");
    }
  }

  async function handleLogout() {
    await signOut(auth);
    router.refresh();
  }

  if (isUserLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="container mx-auto px-6 py-20 max-w-lg relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {isAdmin ? (
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-headline">Admin Authenticated</CardTitle>
              <CardDescription>
                Logged in as <span className="text-foreground font-medium">{user.email}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                You now have full access to create, edit, and delete projects, as well as perform linguistic audits.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-4">
                <Button variant="outline" onClick={() => router.push('/projects')}>
                  Manage Projects
                </Button>
                <Button variant="destructive" className="gap-2" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Owner Login</CardTitle>
              <CardDescription>
                Authenticate to manage your portfolio and AI tools.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onLogin)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="admin@bmax.dev" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {error && (
                    <div className="flex items-center gap-2 text-destructive text-xs font-bold p-3 bg-destructive/5 rounded-lg border border-destructive/10">
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </div>
                  )}

                  <Button type="submit" className="w-full gap-2" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
                    Enter Control Center
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </main>
  );
}