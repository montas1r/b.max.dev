
"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
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
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { Loader2, LogIn, LogOut, ShieldCheck, AlertCircle, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const authSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function AdminPage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isAdmin = user && !user.isAnonymous;

  async function onAuth(values: z.infer<typeof authSchema>) {
    setError(null);
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, values.email, values.password);
      } else {
        await signInWithEmailAndPassword(auth, values.email, values.password);
      }
      router.push('/projects');
    } catch (err: any) {
      const message = err.code === 'auth/user-not-found' 
        ? "User not found. Try switching to 'Register' mode for first-time setup." 
        : err.message || "Authentication failed.";
      setError(message);
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
              <CardTitle className="text-2xl font-headline text-foreground">Admin Authenticated</CardTitle>
              <CardDescription>
                Logged in as <span className="text-foreground font-medium">{user.email}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                You now have full access to manage your portfolio cloud data.
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
              <CardTitle className="text-2xl font-headline">
                {isRegistering ? 'Owner Registration' : 'Owner Login'}
              </CardTitle>
              <CardDescription>
                {isRegistering 
                  ? 'Create your administrative credentials for first-time setup.' 
                  : 'Authenticate to access the administrative control center.'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onAuth)} className="space-y-4">
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
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2 text-destructive text-xs font-bold p-3 bg-destructive/5 rounded-lg border border-destructive/10"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {error}
                    </motion.div>
                  )}

                  <Button type="submit" className="w-full gap-2" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : isRegistering ? (
                      <UserPlus className="w-4 h-4" />
                    ) : (
                      <LogIn className="w-4 h-4" />
                    )}
                    {isRegistering ? 'Create Admin Account' : 'Enter Control Center'}
                  </Button>
                </form>
              </Form>

              <div className="text-center">
                <button 
                  onClick={() => {
                    setIsRegistering(!isRegistering);
                    setError(null);
                  }}
                  className="text-xs font-bold uppercase tracking-widest text-primary hover:underline underline-offset-4"
                >
                  {isRegistering ? 'Back to Login' : 'First-time setup? Register here'}
                </button>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </main>
  );
}
