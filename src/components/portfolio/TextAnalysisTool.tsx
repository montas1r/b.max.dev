"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Loader2, Send, CheckCircle2, AlertCircle } from 'lucide-react';
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
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Linguistic Analysis Engine
          </CardTitle>
          <CardDescription>
            Paste your text below to get AI-driven insights on tone, sentiment, and key points.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea 
            placeholder="Enter text to analyze (emails, blog posts, project descriptions...)"
            className="min-h-[200px] bg-background/50 border-border focus:border-primary/50 transition-colors"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          
          {error && (
            <div className="flex items-center gap-2 text-destructive text-sm px-1">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <Button 
            onClick={handleAnalyze} 
            disabled={isAnalyzing || !inputText.trim()}
            className="w-full md:w-auto px-8"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Analyze Text
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Card className="border-border bg-card/30">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs font-bold text-primary uppercase mb-1">Sentiment</p>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  {result.sentiment}
                </Badge>
              </div>
              <div>
                <p className="text-xs font-bold text-primary uppercase mb-1">Tone</p>
                <p className="text-foreground">{result.tone}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card/30">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Key Points</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 border-border bg-primary/5 border-primary/10">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-primary">AI Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.suggestions.map((suggestion, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm italic text-foreground/90">
                    <span className="text-primary font-bold">#</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
