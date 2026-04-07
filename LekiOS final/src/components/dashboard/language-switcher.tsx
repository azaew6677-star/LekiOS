"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { IconFlagEN, IconFlagLEZ, IconFlagRU } from "@/components/icons";
import { useI18n, type Language } from "@/lib/i18n";
import { Check } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useI18n();

  const languages: { code: Language; name: string; icon: React.ReactNode }[] = [
    { code: "en", name: "English", icon: <IconFlagEN className="h-4 w-4" /> },
    { code: "ru", name: "Русский", icon: <IconFlagRU className="h-4 w-4" /> },
    { code: "lez", name: "Лезги", icon: <IconFlagLEZ className="h-4 w-4" /> },
  ];

  const CurrentFlag = languages.find(l => l.code === language)?.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
            {CurrentFlag}
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code)}>
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                    {lang.icon}
                    <span>{lang.name}</span>
                </div>
                {language === lang.code && <Check className="h-4 w-4 text-accent" />}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
