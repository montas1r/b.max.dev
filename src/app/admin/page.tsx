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
import { useUser } from '@/supabase/provider'; 
import { Loader2, LogIn, LogOut, ShieldCheck, AlertCircle, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';

const authSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function AdminPage() {
  const { user, isUserLoading, supabase } = useUser(); 
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const isAdmin = !!user;

  async function onAuth(values: z.infer<typeof authSchema>) {
    setError(null);
    const isTargetAdmin = values.username === 'bingo.max' && values.password === 'Bing0m4x';
    
    // Map username to a standard email format for Supabase Auth consistency
    const email = values.username.includes('@') 
      ? values.username 
      : `${values.username}@bmax.dev`;
    
    try {
      // 1. Attempt standard sign-in via Supabase
      const { error: signInErr } = await supabase.auth.signInWithPassword({
        email,
        password: values.password,
      });

      // 2. Intercept failures if it's our hardcoded admin profile
      if (signInErr) {
        if (isTargetAdmin) {
          // Attempt to clean-register the profile straight from the gateway
          const { data: signUpData, error: createErr } = await supabase.auth.signUp({
            email,
            password: values.password,
          });

          if (createErr) throw createErr;

          // Catch if Supabase successfully registered it but email verification is still active
          if (signUpData?.user && !signUpData.session) {
            setError("Profile provisioned! However, it's locked until you disable 'Confirm Email' in your Supabase Auth Providers settings.");
            return;
          }
        } else {
          // Throw the raw sign-in error message to the catch block for visibility
          throw signInErr;
        }
      }
      
      router.push('/projects');
      router.refresh();
    } catch (err: any) {
      console.error("Full Authentication Stack Trace:", err);
      // [FIXED] Expose the exact message returned from the backend client
      setError(err?.message || "Authentication failed. Please verify your system configuration.");
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
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
              <CardTitle className="text-2xl font-headline text-foreground">Access Granted</CardTitle>
              <CardDescription>
                Logged in as <span className="text-foreground font-medium">{user.email?.split('@')[0]}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                The control center is active. You can now manage projects and linguistic audits.
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
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <Lock className="w-5 h-5 text-primary" />
              </div>
              <CardTitle className="text-2xl font-headline">Admin Access</CardTitle>
              <CardDescription>
                Enter your unique credentials to unlock the administrative layer.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onAuth)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="username" {...field} />
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
                      className="flex items-start gap-2 text-destructive text-xs font-bold p-3 bg-destructive/5 rounded-lg border border-destructive/10 leading-normal"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <div className="flex-1">{error}</div>
                    </motion.div>
                  )}

                  <Button type="submit" className="w-full gap-2 h-12" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <LogIn className="w-4 h-4" />
                    )}
                    Sign In
                  </Button>
                </form>
              </Form>
              <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest opacity-50">
                Authorized access is strictly logged.
              </p>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </main>
  );
}