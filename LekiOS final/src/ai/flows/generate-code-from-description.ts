'use server';
/**
 * @fileOverview A Genkit flow for generating code snippets or UI components from natural language descriptions.
 *
 * - generateCodeFromDescription - A function that handles the code generation process.
 * - GenerateCodeInput - The input type for the generateCodeFromDescription function.
 * - GenerateCodeOutput - The return type for the generateCodeFromDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCodeInputSchema = z.object({
  description: z.string().describe('A natural language description of the desired UI component or code snippet.'),
  contextCode: z.string().optional().describe('Optional: Existing code to provide context for generation, so the AI can generate code that fits with it.'),
});
export type GenerateCodeInput = z.infer<typeof GenerateCodeInputSchema>;

const GenerateCodeOutputSchema = z.object({
  generatedCode: z.string().describe('The generated code based on the description.'),
  language: z.string().describe('The programming language of the generated code (e.g., "typescript", "javascript", "html", "css", "json", "python", "java", "go", "ruby", "csharp", "php", "rust", "swift", "kotlin", "bash").'),
});
export type GenerateCodeOutput = z.infer<typeof GenerateCodeOutputSchema>;

export async function generateCodeFromDescription(
  input: GenerateCodeInput
): Promise<GenerateCodeOutput> {
  return generateCodeFromDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCodeFromDescriptionPrompt',
  input: {schema: GenerateCodeInputSchema},
  output: {schema: GenerateCodeOutputSchema},
  prompt: `You are an expert software developer and an AI code generation assistant. Your task is to generate clean, efficient, and well-structured code based on the user's description.

If "contextCode" is provided, ensure the generated code integrates seamlessly or builds upon the given context. If the user asks for a UI component, provide all necessary code (HTML/JSX, CSS, etc.) within the generatedCode field, clearly separated if necessary.

Provide the output in JSON format, strictly adhering to the output schema.

Description: {{{description}}}

{{#if contextCode}}
Existing Context Code:
'json'
{
  "code": "{{{contextCode}}}"
}
'json'

{{/if}}

Please generate the code and specify its primary programming language.`,
});

const generateCodeFromDescriptionFlow = ai.defineFlow(
  {
    name: 'generateCodeFromDescriptionFlow',
    inputSchema: GenerateCodeInputSchema,
    outputSchema: GenerateCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
