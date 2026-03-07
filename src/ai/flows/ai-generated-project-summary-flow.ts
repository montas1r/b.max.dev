'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating concise and impactful project summaries.
 *
 * - generateProjectSummary - A function that generates a project summary using AI.
 * - AiGeneratedProjectSummaryInput - The input type for the generateProjectSummary function.
 * - AiGeneratedProjectSummaryOutput - The return type for the generateProjectSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiGeneratedProjectSummaryInputSchema = z.object({
  title: z.string().describe('The title of the project.'),
  description: z.string().describe('A detailed description of the project.'),
});
export type AiGeneratedProjectSummaryInput = z.infer<
  typeof AiGeneratedProjectSummaryInputSchema
>;

const AiGeneratedProjectSummaryOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise and impactful summary of the project.'),
});
export type AiGeneratedProjectSummaryOutput = z.infer<
  typeof AiGeneratedProjectSummaryOutputSchema
>;

export async function generateProjectSummary(
  input: AiGeneratedProjectSummaryInput
): Promise<AiGeneratedProjectSummaryOutput> {
  return aiGeneratedProjectSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiGeneratedProjectSummaryPrompt',
  input: {schema: AiGeneratedProjectSummaryInputSchema},
  output: {schema: AiGeneratedProjectSummaryOutputSchema},
  prompt: `You are an expert at writing concise and impactful summaries for projects.

Generate a summary for the following project. Focus on the key achievements, technologies used, and the overall impact of the project. The summary should be no more than 3-4 sentences.

Project Title: {{{title}}}
Project Description: {{{description}}}`,
});

const aiGeneratedProjectSummaryFlow = ai.defineFlow(
  {
    name: 'aiGeneratedProjectSummaryFlow',
    inputSchema: AiGeneratedProjectSummaryInputSchema,
    outputSchema: AiGeneratedProjectSummaryOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
