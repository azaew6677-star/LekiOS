'use server';
/**
 * @fileOverview A Genkit flow for generating images from natural language descriptions.
 *
 * - generateImageFromDescription - A function that handles the image generation process.
 * - GenerateImageInput - The input type for the generateImageFromDescription function.
 * - GenerateImageOutput - The return type for the generateImageFromDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImageInputSchema = z.object({
  description: z.string().describe('A natural language description of the desired image.'),
});
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated image.'),
});
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateImageFromDescription(
  input: GenerateImageInput
): Promise<GenerateImageOutput> {
  return generateImageFromDescriptionFlow(input);
}

const generateImageFromDescriptionFlow = ai.defineFlow(
  {
    name: 'generateImageFromDescriptionFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async input => {
    const { media } = await ai.generate({
        model: 'googleai/imagen-4.0-fast-generate-001',
        prompt: input.description,
    });
    
    if (!media?.url) {
        throw new Error('Image generation failed.');
    }

    return { imageUrl: media.url };
  }
);
