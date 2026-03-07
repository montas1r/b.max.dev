"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Sparkles, Loader2, Send, CheckCircle2, AlertCircle, Quote, BrainCircuit, Lightbulb } from 'lucide-react';
import { analyzeText, type TextAnalysisOutput } from '@/ai/flows/text-analysis-flow';

export function TextAnalysisTool() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<TextAnalysisOutput | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (inputText.trim().length < 10) {
      setError("Please enter at least 10 characters for a meaningful analysis.");
      return;
    }

    setError(null);
    setIsAnalyzing(true);
    try {
      const res = await analyzeText({ text: inputText });
      setResult(res);
    } catch (err) {
      setError("Failed to analyze text. Please try again later.");
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <Card className="border-border bg-card/50 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="w-6 h-6 text-primary" />
            Linguistic Analysis Engine
          </CardTitle>
          <CardDescription className="text-base">
            Paste your text below to get AI-driven insights on tone, sentiment, and key points.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative group">
            <Textarea 
              placeholder="Enter text to analyze (emails, blog posts, project descriptions...)"
              className="min-h-[250px] bg-background/50 border-border focus:border-primary/50 transition-all text-base resize-none p-6"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <div className="absolute bottom-4 right-4 text-[10px] uppercase tracking-widest text-muted-foreground opacity-50">
              {inputText.length} characters
            </div>
          </div>
          
          {error && (
            <div className="flex items-center gap-2 text-destructive text-sm font-medium px-2 py-3 bg-destructive/5 rounded-lg border border-destructive/10">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <div className="flex justify-end">
            <Button 
              onClick={handleAnalyze} 
              disabled={isAnalyzing || !inputText.trim()}
              size="lg"
              className="px-10 h-12 text-sm font-bold uppercase tracking-widest group"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing Engine...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  Run Analysis
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12 pb-20"
        >
          <div className="flex items-center gap-4">
            <Separator className="flex-1 bg-border/50" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary whitespace-nowrap">Analysis Results</span>
            <Separator className="flex-1 bg-border/50" />
          </div>

          {/* Overview Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-primary">
              <Quote className="w-5 h-5" />
              <h3 className="text-sm font-bold uppercase tracking-widest">Sentiment & Tone</h3>
            </div>
            <div className="bg-card/30 border border-border p-8 rounded-2xl flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Calculated Sentiment</p>
                <Badge className="text-base px-4 py-1.5 bg-primary/10 text-primary border-primary/20 rounded-lg">
                  {result.sentiment}
                </Badge>
              </div>
              <Separator orientation="vertical" className="hidden md:block h-12 bg-border/50" />
              <div className="flex-1 space-y-2">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Linguistic Tone</p>
                <p className="text-lg font-medium italic text-foreground/90 leading-relaxed">
                  "{result.tone}"
                </p>
              </div>
            </div>
          </div>

          <Separator className="bg-border/30" />

          {/* Key Points Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-primary">
              <BrainCircuit className="w-5 h-5" />
              <h3 className="text-sm font-bold uppercase tracking-widest">Extracted Intelligence</h3>
            </div>
            <div className="bg-card/20 border border-border p-8 rounded-2xl">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {result.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-4 text-base text-foreground/80 group">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0 group-hover:scale-150 transition-transform" />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Separator className="bg-border/30" />

          {/* Recommendations Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-primary">
              <Lightbulb className="w-5 h-5" />
              <h3 className="text-sm font-bold uppercase tracking-widest">Strategic Recommendations</h3>
            </div>
            <div className="bg-primary/5 border border-primary/10 p-8 rounded-2xl">
              <div className="grid grid-cols-1 gap-4">
                {result.suggestions.map((suggestion, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/20 group">
                    <CheckCircle2 className="w-5 h-5 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
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
    </div>
  );
}
