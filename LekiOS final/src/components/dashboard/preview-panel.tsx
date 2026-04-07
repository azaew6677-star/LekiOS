"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18n } from "@/lib/i18n";
import { Smartphone, Monitor } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

export function PreviewPanel() {
    const { t } = useI18n();
    
    const previewContent = (
        <div className="text-center text-muted-foreground">Desktop Preview Area</div>
    );

    const mobilePreviewContent = (
        <div className="text-center text-muted-foreground pt-10">Mobile Preview</div>
    );

    return (
        <div className="h-full w-full">
            <ScrollArea className="h-full w-full">
                <Tabs defaultValue="desktop" className="flex flex-col p-2">
                    <TabsList className="grid w-full grid-cols-2 sticky top-0 bg-background/40 backdrop-blur-sm z-10">
                        <TabsTrigger value="desktop">
                            <Monitor className="mr-2 h-4 w-4" />
                            {t('preview.panel.desktop')}
                        </TabsTrigger>
                        <TabsTrigger value="mobile">
                            <Smartphone className="mr-2 h-4 w-4" />
                            {t('preview.panel.mobile')}
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="desktop" className="flex-1 mt-4 flex items-center justify-center p-4">
                        <div className="w-full bg-card/50 rounded-lg shadow-inner-lg p-4 relative min-h-[400px]">
                            {previewContent}
                        </div>
                    </TabsContent>
                    <TabsContent value="mobile" className="flex-1 mt-4 flex items-center justify-center p-4">
                        <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[10px] rounded-[2.5rem] h-[600px] w-[300px]">
                            <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[13px] top-[72px] rounded-s-lg"></div>
                            <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[13px] top-[124px] rounded-s-lg"></div>
                            <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[13px] top-[178px] rounded-s-lg"></div>
                            <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[13px] top-[142px] rounded-e-lg"></div>
                            <div className="rounded-[2rem] overflow-hidden w-full h-full bg-background relative">
                               {mobilePreviewContent}
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </ScrollArea>
        </div>
    );
}
