"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sparkles, 
  Loader2, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Quote, 
  BrainCircuit, 
  Lightbulb, 
  Save, 
  History, 
  Trash2, 
  FileText,
  ArrowRight,
  Lock
} from 'lucide-react';
import { analyzeText, type TextAnalysisOutput } from '@/ai/flows/text-analysis-flow';
import { useFirestore, useCollection, useMemoFirebase, useUser } from '@/firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import Link from 'next/link';

export function TextAnalysisTool() {
  const { user } = useUser();
  const [inputText, setInputText] = useState('');
  const [analysisTitle, setAnalysisTitle] = useState('');
  const [result, setResult] = useState<TextAnalysisOutput | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('analyze');

  const isAdmin = user && !user.isAnonymous;
  const db = useFirestore();

  const analysesQuery = useMemoFirebase(() => {
    if (!db || !isAdmin) return null;
    return query(collection(db, 'analyses'), orderBy('createdAt', 'desc'));
  }, [db, isAdmin]);

  const { data: savedAnalyses, loading: loadingAnalyses } = useCollection<any>(analysesQuery);

  const handleAnalyze = async () => {
    if (!isAdmin) return;
    if (inputText.trim().length < 10) {
      setError("Please enter at least 10 characters for a meaningful analysis.");
      return;
    }

    setError(null);
    setIsAnalyzing(true);
    try {
      const res = await analyzeText({ text: inputText });
      setResult(res);
      if (!analysisTitle) {
        setAnalysisTitle(`Analysis ${new Date().toLocaleDateString()}`);
      }
    } catch (err) {
      setError("Failed to analyze text. Please try again later.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveAnalysis = async () => {
    if (!db || !result || !inputText || !isAdmin) return;
    
    setIsSaving(true);
    const analysisData = {
      title: analysisTitle || 'Untitled Analysis',
      originalText: inputText,
      ...result,
      createdAt: serverTimestamp(),
    };

    addDoc(collection(db, 'analyses'), analysisData)
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: 'analyses',
          operation: 'create',
          requestResourceData: analysisData,
        });
        errorEmitter.emit('permission-error', permissionError);
      });

    setTimeout(() => {
      setIsSaving(false);
      setActiveTab('history');
      setInputText('');
      setAnalysisTitle('');
      setResult(null);
    }, 300);
  };

  const handleDeleteAnalysis = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!db || !isAdmin) return;
    deleteDoc(doc(db, 'analyses', id))
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: `analyses/${id}`,
          operation: 'delete',
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  };

  const loadAnalysis = (analysis: any) => {
    setInputText(analysis.originalText);
    setAnalysisTitle(analysis.title);
    setResult({
      sentiment: analysis.sentiment,
      tone: analysis.tone,
      keyPoints: analysis.keyPoints,
      suggestions: analysis.suggestions
    });
    setActiveTab('analyze');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 h-12 bg-muted/20 p-1">
          <TabsTrigger value="analyze" className="gap-2 text-xs uppercase tracking-widest font-bold">
            <Sparkles className="w-4 h-4" />
            New Analysis
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2 text-xs uppercase tracking-widest font-bold">
            <History className="w-4 h-4" />
            Saved Archive
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analyze" className="space-y-12 outline-none">
          {!isAdmin ? (
            <Card className="border-dashed border-primary/20 bg-primary/5 p-12 text-center">
              <Lock className="w-12 h-12 text-primary/40 mx-auto mb-4" />
              <h3 className="text-xl font-headline font-bold mb-2">Owner Restricted Access</h3>
              <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                The Linguistic Analysis Engine is a proprietary tool reserved for administrative context auditing.
              </p>
              <Button asChild variant="outline">
                <Link href="/admin">Authenticate to Access</Link>
              </Button>
            </Card>
          ) : (
            <>
              <Card className="border-border bg-card/50 backdrop-blur-sm shadow-xl overflow-hidden">
                <CardHeader className="border-b border-border/50 bg-muted/5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2 text-2xl font-headline tracking-tight">
                        <BrainCircuit className="w-6 h-6 text-primary" />
                        Linguistic Processor
                      </CardTitle>
                      <CardDescription className="text-sm uppercase tracking-widest font-medium opacity-60">
                        AI-Powered Narrative Auditing
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                       <Input 
                        placeholder="Report Title..." 
                        value={analysisTitle}
                        onChange={(e) => setAnalysisTitle(e.target.value)}
                        className="max-w-[200px] h-9 text-xs bg-background/50"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="relative group">
                    <Textarea 
                      placeholder="Paste your text content here for deep linguistic inspection..."
                      className="min-h-[300px] bg-background/50 border-border focus:border-primary/50 transition-all text-base resize-none p-6 font-body leading-relaxed outline-none"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                    />
                    <div className="absolute bottom-4 right-4 text-[10px] uppercase tracking-widest text-muted-foreground opacity-50 font-bold">
                      {inputText.length} chars
                    </div>
                  </div>
                  
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-destructive text-sm font-bold px-4 py-3 bg-destructive/5 rounded-lg border border-destructive/10"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {error}
                    </motion.div>
                  )}

                  <div className="flex justify-end gap-3">
                    {result && (
                       <Button 
                        onClick={handleSaveAnalysis} 
                        disabled={isSaving}
                        variant="outline"
                        className="h-12 px-6 text-xs font-bold uppercase tracking-widest gap-2"
                      >
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Store Results
                      </Button>
                    )}
                    <Button 
                      onClick={handleAnalyze} 
                      disabled={isAnalyzing || !inputText.trim()}
                      size="lg"
                      className="px-10 h-12 text-xs font-bold uppercase tracking-widest group bg-primary hover:bg-primary/90"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Auditing Context...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          Execute Audit
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-12 pb-20"
                  >
                    <div className="flex items-center gap-4">
                      <Separator className="flex-1 bg-border/50" />
                      <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary whitespace-nowrap">Analysis Output</span>
                      <Separator className="flex-1 bg-border/50" />
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center gap-3 text-primary">
                        <Quote className="w-5 h-5" />
                        <h3 className="text-sm font-bold uppercase tracking-widest">Sentiment & Tone</h3>
                      </div>
                      <div className="bg-card/30 border border-border p-8 rounded-2xl flex flex-col md:flex-row gap-8 items-start md:items-center justify-between w-full">
                        <div className="space-y-2 shrink-0">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Sentiment Score</p>
                          <Badge className="text-base px-4 py-1.5 bg-primary/10 text-primary border-primary/20 rounded-lg">
                            {result.sentiment}
                          </Badge>
                        </div>
                        <Separator orientation="vertical" className="hidden md:block h-12 bg-border/50" />
                        <div className="flex-1 space-y-2">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Narrative Style</p>
                          <p className="text-lg font-medium italic text-foreground/90 leading-relaxed font-headline">
                            "{result.tone}"
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-border/50" />

                    <div className="space-y-6">
                      <div className="flex items-center gap-3 text-primary">
                        <BrainCircuit className="w-5 h-5" />
                        <h3 className="text-sm font-bold uppercase tracking-widest">Primary Intel</h3>
                      </div>
                      <div className="bg-card/20 border border-border p-8 rounded-2xl w-full">
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                          {result.keyPoints.map((point, i) => (
                            <li key={i} className="flex items-start gap-4 text-base text-foreground/80 group">
                              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0 group-hover:scale-150 transition-transform" />
                              <span className="leading-relaxed font-medium">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <Separator className="bg-border/50" />

                    <div className="space-y-6">
                      <div className="flex items-center gap-3 text-primary">
                        <Lightbulb className="w-5 h-5" />
                        <h3 className="text-sm font-bold uppercase tracking-widest">Strategic Path</h3>
                      </div>
                      <div className="bg-primary/5 border border-primary/10 p-8 rounded-2xl w-full">
                        <div className="grid grid-cols-1 gap-4">
                          {result.suggestions.map((suggestion, i) => (
                            <div key={i} className="flex items-center gap-4 p-5 rounded-xl hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/20 group cursor-default">
                              <CheckCircle2 className="w-5 h-5 text-primary opacity-50 group-hover:opacity-100 transition-opacity shrink-0" />
                              <p className="text-base text-foreground/90 font-medium italic">
                                {suggestion}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-6 outline-none">
          {!isAdmin ? (
            <Card className="border-dashed border-border p-12 text-center bg-muted/5">
              <History className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Archive Locked</h3>
              <Button asChild variant="link" className="text-primary text-xs uppercase font-bold tracking-widest">
                <Link href="/admin">Authenticate to View History</Link>
              </Button>
            </Card>
          ) : (
            <>
              {loadingAnalyses ? (
                 <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Accessing Archive...</p>
                </div>
              ) : savedAnalyses && savedAnalyses.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {savedAnalyses.map((analysis: any) => (
                    <motion.div
                      key={analysis.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="group bg-card border border-border hover:border-primary/40 p-6 rounded-xl transition-all cursor-pointer flex items-center justify-between shadow-sm"
                      onClick={() => loadAnalysis(analysis)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-muted/20 text-primary">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-headline font-bold text-lg group-hover:text-primary transition-colors">{analysis.title}</h4>
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="text-[10px] font-bold uppercase bg-primary/5 text-primary border-primary/20">
                              {analysis.sentiment}
                            </Badge>
                            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                              {analysis.createdAt?.toDate ? analysis.createdAt.toDate().toLocaleDateString() : 'Just now'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                          onClick={(e) => handleDeleteAnalysis(analysis.id, e)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-32 border border-dashed border-border rounded-2xl bg-muted/5">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">No Archived Audits Found</p>
                  <Button 
                    variant="link" 
                    className="mt-2 text-primary text-xs uppercase font-bold tracking-widest"
                    onClick={() => setActiveTab('analyze')}
                  >
                    Perform First Audit
                  </Button>
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}