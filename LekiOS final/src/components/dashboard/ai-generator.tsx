"use client";

import { generateCodeFromDescription, type GenerateCodeInput, type GenerateCodeOutput } from "@/ai/flows/generate-code-from-description";
import { generateImageFromDescription, type GenerateImageInput, type GenerateImageOutput } from "@/ai/flows/generate-image-from-description";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/lib/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles, Wand2, Paperclip, Plus, Image as ImageIcon, CodeXml, Palette } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const formSchema = z.object({
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

interface AIGeneratorProps {
  onCodeGenerated: (output: GenerateCodeOutput) => void;
}

export function AIGenerator({ onCodeGenerated }: AIGeneratorProps) {
  const { t } = useI18n();
  const { toast } = useToast();
  const [generationType, setGenerationType] = useState<'code' | 'image' | 'logo'>('code');
  const [generatedImage, setGeneratedImage] = useState<GenerateImageOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onCodeSubmit(values: z.infer<typeof formSchema>) {
    try {
      setGeneratedImage(null);
      const input: GenerateCodeInput = { description: values.description };
      const output = await generateCodeFromDescription(input);
      onCodeGenerated(output);
      toast({
        title: "Code Generated!",
        description: "The AI has successfully created your code.",
        className: "bg-green-600 text-white border-green-700",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error generating code:", error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "There was an error generating the code. Please try again.",
      });
    }
  }

  async function onImageSubmit(values: z.infer<typeof formSchema>) {
    try {
      onCodeGenerated({ generatedCode: `// Generating image...`, language: 'plaintext' });
      const description = generationType === 'logo' 
        ? `A minimalist logo for ${values.description}` 
        : values.description;

      const input: GenerateImageInput = { description };
      const output = await generateImageFromDescription(input);
      setGeneratedImage(output);
      onCodeGenerated({ generatedCode: `// Image generated successfully. You can view it in the AI Agent panel.`, language: 'plaintext' });
      toast({
        title: "Image Generated!",
        description: "The AI has successfully created your image.",
        className: "bg-green-600 text-white border-green-700",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error generating image:", error);
      setGeneratedImage(null);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "There was an error generating the image. Please try again.",
      });
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (generationType === 'code') {
      await onCodeSubmit(values);
    } else {
      await onImageSubmit(values);
    }
  }
  
  const placeholders = {
    code: t('ai.generator.placeholder'),
    image: t('ai.generator.image_placeholder'),
    logo: t('ai.generator.logo_placeholder')
  }

  const typeIcons: Record<typeof generationType, React.ReactNode> = {
    code: <CodeXml className="h-5 w-5" />,
    image: <ImageIcon className="h-5 w-5" />,
    logo: <Palette className="h-5 w-5" />,
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-accent" />
          <h2 className="text-base font-headline font-semibold">{t('ai.generator.title')}</h2>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <div className="w-full lg:w-1/2 flex flex-col p-4 border-b lg:border-b-0 lg:border-r">
           <p className="text-xs text-muted-foreground mb-4">{t('ai.generator.description')}</p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-1 space-y-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex-1 flex flex-col">
                      <FormLabel className="sr-only">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={placeholders[generationType]}
                          className="resize-none flex-1 font-code text-sm h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Select value={generationType} onValueChange={(value) => setGenerationType(value as any)}>
                            <SelectTrigger className="w-auto">
                              <SelectValue asChild>
                                {typeIcons[generationType]}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="code"><div className="flex items-center gap-2"><CodeXml className="h-4 w-4" /> Code</div></SelectItem>
                              <SelectItem value="image"><div className="flex items-center gap-2"><ImageIcon className="h-4 w-4" /> Image</div></SelectItem>
                              <SelectItem value="logo"><div className="flex items-center gap-2"><Palette className="h-4 w-4" /> Logo</div></SelectItem>
                            </SelectContent>
                          </Select>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Generation Type</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button size="icon" variant="outline" asChild>
                              <label htmlFor="file-upload" className="cursor-pointer w-full h-full flex items-center justify-center">
                                  <Paperclip className="h-4 w-4" />
                                  <span className="sr-only">Attach file</span>
                              </label>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>Attach file</p></TooltipContent>
                      </Tooltip>
                      <Input id="file-upload" type="file" className="hidden" />

                      <div className="flex-grow" />

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button type="submit" size="icon" disabled={isSubmitting}>
                            {isSubmitting ? (
                              <Sparkles className="h-4 w-4 animate-spin" />
                            ) : (
                              <Wand2 className="h-4 w-4" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>Generate</p></TooltipContent>
                      </Tooltip>
                  </TooltipProvider>
                </div>
              </form>
            </Form>
        </div>
        <div className="flex-1 p-4 overflow-auto">
            {generatedImage ? (
                <div className="relative w-full h-full min-h-[300px] rounded-md border bg-card/50">
                    <Image src={generatedImage.imageUrl} alt="Generated image" layout="fill" objectFit="contain" />
                </div>
            ) : (
                <div className="flex items-center justify-center w-full h-full min-h-[300px] rounded-md border border-dashed bg-background/40">
                    <div className="text-center text-muted-foreground">
                        <ImageIcon className="mx-auto h-12 w-12" />
                        <p className="mt-2">Generated images will appear here</p>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
