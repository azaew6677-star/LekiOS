"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useI18n } from "@/lib/i18n";
import { Cog, LifeBuoy, LogOut, User, Github, Rocket, RefreshCw } from "lucide-react";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeSwitcher } from "./theme-switcher";
import { IconAndroid, IconApple, IconLinux, IconWindows } from "@/components/icons";
import { LekiLogo } from "../leki-logo";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function Header() {
  const { t } = useI18n();
  const { toast } = useToast();
  const [isSyncing, setIsSyncing] = useState(false);

  const handleBuildRedirect = () => {
    // This URL can be changed to your specific repository's actions page.
    const githubActionsUrl = 'https://github.com/LekiTechnology/Leki-OS-Framework/actions';
    window.open(githubActionsUrl, '_blank', 'noopener,noreferrer');
  };

  const handleGitHubSync = async () => {
    setIsSyncing(true);
    toast({
      title: t('github.sync.inprogress'),
    });
    
    try {
      // <<<--- НАЧАЛО ВАШЕГО КОДА ---<<<
      // Замените этот блок своей логикой для синхронизации с GitHub.
      // Например, здесь вы можете вызвать API вашего бэкенда.
      // Этот пример имитирует задержку сети.
      await new Promise(resolve => setTimeout(resolve, 2000));
      const isSuccess = true; // Замените на реальную проверку успеха
      // ---< КОНЕЦ ВАШЕГО КОДА >--- ---<

      if (isSuccess) {
        toast({
          title: t('github.sync.success'),
          className: "bg-green-600 text-white border-green-700",
          duration: 3000,
        });
      } else {
        throw new Error('Синхронизация не удалась.');
      }
    } catch (error) {
      console.error("GitHub Sync Error:", error);
      toast({
        variant: "destructive",
        title: t('github.sync.error'),
        description: error instanceof Error ? error.message : 'Произошла неизвестная ошибка.',
      });
    } finally {
      setIsSyncing(false);
    }
  };
  
  const platforms: { id: string; icon: React.ReactNode; }[] = [
      { id: 'apk', icon: <IconAndroid className="h-5 w-5" /> },
      { id: 'ipa', icon: <IconApple className="h-5 w-5" /> },
      { id: 'exe', icon: <IconWindows className="h-5 w-5" /> },
      { id: 'dmg', icon: <IconApple className="h-5 w-5" /> },
      { id: 'appimage', icon: <IconLinux className="h-5 w-5" /> },
      { id: 'pwa', icon: <Rocket className="h-5 w-5" /> },
  ];

  return (
    <header className="flex h-16 items-center justify-between px-4 lg:px-6 border-b border-border bg-card/50 relative z-20">
      <div className="flex items-center gap-2">
        <LekiLogo />
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={handleGitHubSync} disabled={isSyncing}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{t('github.sync.button')}</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Github className="mr-2 h-4 w-4" />
              <span>{t('build.panel.title')}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64" align="end">
            <DropdownMenuLabel>{t('build.panel.description')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {platforms.map(({ id, icon }) => (
              <DropdownMenuItem key={id} onSelect={handleBuildRedirect}>
                {icon}
                <span className="ml-2 flex-1">{t(`build.panel.${id}`)}</span>
                <span className="text-xs text-muted-foreground">GitHub Actions</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <LanguageSwitcher />
        <ThemeSwitcher />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://picsum.photos/seed/user/40/40" alt="@user" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Leki User</p>
                <p className="text-xs leading-none text-muted-foreground">user@leki.io</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Cog className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LifeBuoy className="mr-2 h-4 w-4" />
                <span>Support</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
