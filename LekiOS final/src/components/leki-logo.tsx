import { Feather } from 'lucide-react';

export const LekiLogo = ({ className }: { className?: string }) => (
    <div className={`flex items-center gap-2 ${className}`}>
      <Feather className="h-8 w-8 text-accent" />
      <span className="text-2xl font-bold font-headline text-foreground">
        Leki OS
      </span>
    </div>
);
