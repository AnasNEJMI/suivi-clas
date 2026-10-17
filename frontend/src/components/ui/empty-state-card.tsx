import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { FileQuestionIcon, type LucideIcon } from 'lucide-react';

interface EmptyStateCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  className?: string;
}

export function EmptyStateCard({
  title,
  description,
  icon: Icon = FileQuestionIcon, // Icône par défaut si non spécifiée
  className,
}: EmptyStateCardProps) {
  return (
    <Card
      className={cn(
        'border-2 border-dashed border-indigo-200 dark:border-indigo-900/50 min-h-64 flex flex-col items-center justify-center w-full rounded-3xl bg-linear-to-b from-indigo-50/50 via-white to-slate-50 shadow-sm p-6 text-center opacity-75',
        className
      )}
    >
      <div className="size-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 shadow-inner">
        <Icon className="size-6" />
      </div>
      <CardTitle className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
        {title}
      </CardTitle>
      <CardDescription className="text-balance max-w-md text-slate-600 dark:text-slate-400 text-sm font-medium mt-1">
        {description}
      </CardDescription>
    </Card>
  );
}