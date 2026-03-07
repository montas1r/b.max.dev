'use server';
/**
 * @fileOverview This file implements a Genkit flow for deep text analysis.
 *
 * - analyzeText - A function that performs sentiment, tone, and key point analysis.
 * - TextAnalysisInput - The input type for the analyzeText function.
 * - TextAnalysisOutput - The return type for the analyzeText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TextAnalysisInputSchema = z.object({
  text: z.string().min(10).describe('The text content to be analyzed.'),
});
export type TextAnalysisInput = z.infer<typeof TextAnalysisInputSchema>;

const TextAnalysisOutputSchema = z.object({
  sentiment: z.string().describe('The overall sentiment of the text (e.g., Positive, Neutral, Negative).'),
  tone: z.string().describe('The emotional tone or style of the writing.'),
  keyPoints: z.array(z.string()).describe('A list of the main points extracted from the text.'),
  suggestions: z.array(z.string()).describe('Constructive suggestions for improving the text.'),
});
export type TextAnalysisOutput = z.infer<typeof TextAnalysisOutputSchema>;

export async function analyzeText(
  input: TextAnalysisInput
): Promise<TextAnalysisOutput> {
  return textAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'textAnalysisPrompt',
  input: {schema: TextAnalysisInputSchema},
  output: {schema: TextAnalysisOutputSchema},
  prompt: `You are an expert linguistic analyst. Analyze the provided text thoroughly.

Provide a clear sentiment, describe the tone, list the most important key points, and offer actionable suggestions for improvement.

Text to analyze:
"""
{{{text}}}
"""`,
});

const textAnalysisFlow = ai.defineFlow(
  {
    name: 'textAnalysisFlow',
    inputSchema: TextAnalysisInputSchema,
    outputSchema: TextAnalysisOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
