'use client';
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { Clipboard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";

interface CodeEditorProps {
    code: string;
    language: string;
}

export function CodeEditor({ code, language }: CodeEditorProps) {
    const { t } = useI18n();
    const { toast } = useToast();

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        toast({
            title: "Copied to clipboard!",
            description: "The code has been copied.",
            duration: 2000,
        });
    };

    return (
        <div className="h-full flex flex-col relative">
            <div className="flex-row items-center justify-between p-3 border-b flex">
                <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="capitalize">{language}</Badge>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleCopy}>
                    <Clipboard className="h-4 w-4" />
                </Button>
            </div>
            <div className="p-0 flex-1 relative">
                <ScrollArea className="absolute inset-0">
                    <pre className="p-4 font-code text-sm bg-transparent whitespace-pre-wrap break-words">
                        {code}
                    </pre>
                </ScrollArea>
            </div>
        </div>
    );
}
