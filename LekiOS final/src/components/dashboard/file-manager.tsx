"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { FileCode, Folder, FolderOpen } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

const fileStructure = [
    { name: 'package.json', type: 'file' as const },
    { name: 'next.config.ts', type: 'file' as const },
    { name: 'tailwind.config.ts', type: 'file' as const },
    { name: 'tsconfig.json', type: 'file' as const },
    { name: 'README.md', type: 'file' as const },
    {
      name: "src",
      type: "folder" as const,
      children: [
        {
          name: "app",
          type: "folder" as const,
          children: [
              { name: 'layout.tsx', type: 'file' as const },
              { name: 'page.tsx', type: 'file' as const },
              { name: 'globals.css', type: 'file' as const },
          ]
        },
        {
          name: "ai",
          type: "folder" as const,
          children: [
              { name: 'genkit.ts', type: 'file' as const},
              { name: 'dev.ts', type: 'file' as const},
              { name: "flows", type: "folder" as const, children: [
                  { name: 'generate-code-from-description.ts', type: 'file' as const },
                  { name: 'generate-image-from-description.ts', type: 'file' as const },
                  { name: 'generate-tests-for-code.ts', type: 'file' as const },
              ] },
          ]
        },
        {
          name: "components",
          type: "folder" as const,
          children: [
              { name: "ui", type: "folder" as const, children: [
                { name: 'accordion.tsx', type: 'file' as const },
                { name: 'alert-dialog.tsx', type: 'file' as const },
                { name: 'alert.tsx', type: 'file' as const },
                { name: 'avatar.tsx', type: 'file' as const },
                { name: 'badge.tsx', type: 'file' as const },
                { name: 'button.tsx', type: 'file' as const },
                { name: 'calendar.tsx', type: 'file' as const },
                { name: 'card.tsx', type: 'file' as const },
                { name: 'carousel.tsx', type: 'file' as const },
                { name: 'chart.tsx', type: 'file' as const },
                { name: 'checkbox.tsx', type: 'file' as const },
                { name: 'collapsible.tsx', type: 'file' as const },
                { name: 'dialog.tsx', type: 'file' as const },
                { name: 'dropdown-menu.tsx', type: 'file' as const },
                { name: 'form.tsx', type: 'file' as const },
                { name: 'input.tsx', type: 'file' as const },
                { name: 'label.tsx', type: 'file' as const },
                { name: 'menubar.tsx', type: 'file' as const },
                { name: 'popover.tsx', type: 'file' as const },
                { name: 'progress.tsx', type: 'file' as const },
                { name: 'radio-group.tsx', type: 'file' as const },
                { name: 'resizable.tsx', type: 'file' as const },
                { name: 'scroll-area.tsx', type: 'file' as const },
                { name: 'select.tsx', type: 'file' as const },
                { name: 'separator.tsx', type: 'file' as const },
                { name: 'sheet.tsx', type: 'file' as const },
                { name: 'sidebar.tsx', type: 'file' as const },
                { name: 'skeleton.tsx', type: 'file' as const },
                { name: 'slider.tsx', type: 'file' as const },
                { name: 'switch.tsx', type: 'file' as const },
                { name: 'table.tsx', type: 'file' as const },
                { name: 'tabs.tsx', type: 'file' as const },
                { name: 'textarea.tsx', type: 'file' as const },
                { name: 'toast.tsx', type: 'file' as const },
                { name: 'toaster.tsx', type: 'file' as const },
                { name: 'tooltip.tsx', type: 'file' as const },
              ] },
              { name: "dashboard", type: "folder" as const, children: [
                { name: 'ai-generator.tsx', type: 'file' as const },
                { name: 'code-editor.tsx', type: 'file' as const },
                { name: 'file-manager.tsx', type: 'file' as const },
                { name: 'header.tsx', type: 'file' as const },
                { name: 'language-switcher.tsx', type: 'file' as const },
                { name: 'preview-panel.tsx', type: 'file' as const },
                { name: 'theme-switcher.tsx', type: 'file' as const },
              ] },
              { name: "icons.tsx", type: 'file' as const },
              { name: "leki-logo.tsx", type: 'file' as const },
              { name: "theme-provider.tsx", type: 'file' as const },
          ],
        },
        {
          name: "lib",
          type: "folder" as const,
          children: [
              { name: 'i18n.tsx', type: 'file' as const},
              { name: 'utils.ts', type: 'file' as const},
          ],
        },
        {
          name: 'hooks',
          type: 'folder' as const,
          children: [
            { name: 'use-toast.ts', type: 'file' as const},
            { name: 'use-mobile.tsx', type: 'file' as const},
          ]
        }
      ],
    },
  ];

type FileNode = {
  name: string;
  type: 'folder' | 'file';
  children?: FileNode[];
};

const FileTree = ({ node, level = 0 }: { node: FileNode, level?: number }) => {
  const [isOpen, setIsOpen] = useState(level < 1);
  const isFolder = node.type === 'folder';

  if (isFolder) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-start h-8 px-2 gap-2 font-normal">
            <div style={{ paddingLeft: level === 0 ? 0 : `${level * 0.75}rem` }} className="flex items-center gap-2 flex-1">
              {isOpen ? <FolderOpen className="h-4 w-4" /> : <Folder className="h-4 w-4" />}
              <span className="truncate">{node.name}</span>
            </div>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="flex flex-col">
            {node.children?.map((child, index) => (
              <FileTree key={index} node={child} level={level + 1} />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Button variant="ghost" className="w-full justify-start h-8 px-2 gap-2 font-normal">
      <div style={{ paddingLeft: level === 0 ? 0 : `${level * 0.75}rem` }} className="flex items-center gap-2">
        <FileCode className="h-4 w-4" />
        <span className="truncate">{node.name}</span>
      </div>
    </Button>
  );
};

export function FileManager() {
  return (
    <ScrollArea className="h-full w-full">
        <div className="p-2">
            {fileStructure.map((node, index) => (
                <FileTree key={index} node={node} />
            ))}
        </div>
    </ScrollArea>
  );
}
