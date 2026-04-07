'use server';
/**
 * @fileOverview A Genkit flow for generating unit or end-to-end tests for a given code snippet.
 *
 * - generateTestsForCode - A function that handles the test generation process.
 * - GenerateTestsForCodeInput - The input type for the generateTestsForCode function.
 * - GenerateTestsForCodeOutput - The return type for the generateTestsForCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTestsForCodeInputSchema = z.object({
  code: z.string().describe('The code snippet for which tests need to be generated.'),
  testType: z.enum(['unit', 'e2e']).describe('The type of tests to generate: "unit" for unit tests or "e2e" for end-to-end tests.').default('unit'),
  framework: z.string().describe('The testing framework to use (e.g., "jest", "react-testing-library", "playwright", "cypress").').default('jest'),
});
export type GenerateTestsForCodeInput = z.infer<typeof GenerateTestsForCodeInputSchema>;

const GenerateTestsForCodeOutputSchema = z.object({
  testCode: z.string().describe('The generated test code.'),
  explanation: z.string().optional().describe('An optional explanation or description of the generated tests.'),
});
export type GenerateTestsForCodeOutput = z.infer<typeof GenerateTestsForCodeOutputSchema>;

const generateTestsPrompt = ai.definePrompt({
  name: 'generateTestsPrompt',
  input: {schema: GenerateTestsForCodeInputSchema},
  output: {schema: GenerateTestsForCodeOutputSchema},
  prompt: `You are an expert software engineer specializing in writing tests.
Your task is to generate {{{testType}}} tests for the provided code snippet using the {{{framework}}} framework.

Provide the generated test code in the 'testCode' field and an optional explanation in the 'explanation' field.

Code to be tested:
```javascript
{{{code}}}
```

Test type: {{{testType}}}
Testing framework: {{{framework}}}`,
});

const generateTestsForCodeFlow = ai.defineFlow(
  {
    name: 'generateTestsForCodeFlow',
    inputSchema: GenerateTestsForCodeInputSchema,
    outputSchema: GenerateTestsForCodeOutputSchema,
  },
  async (input) => {
    const {output} = await generateTestsPrompt(input);
    return output!;
  }
);

export async function generateTestsForCode(input: GenerateTestsForCodeInput): Promise<GenerateTestsForCodeOutput> {
  return generateTestsForCodeFlow(input);
}
