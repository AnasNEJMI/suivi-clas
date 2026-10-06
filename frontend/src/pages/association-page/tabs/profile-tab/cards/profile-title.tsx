import { cn } from '@/lib/utils';
import { Building2, ShieldCheck } from 'lucide-react';

interface AssociationTitleProps {
  label: string;
  isVerified?: boolean;
  logoUrl?: string;
  className?: string;
}

const AssocProfileTitle = ({
  label,
  isVerified = true,
  logoUrl,
  className,
}: AssociationTitleProps) => {
  // Extract initials for fallback avatar logo
  const initials = label
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');

  return (
    <div
      className={cn(
        'mt-2 mb-8 flex flex-col items-center justify-center text-center px-4',
        className
      )}
    >
      {/* 1. Samsung One UI Focal Avatar / Icon Tile */}
      <div className="relative group mb-4">
        <div className="relative flex items-center justify-center size-20 md:size-24 rounded-3xl bg-linear-to-b from-lime-500/15 to-lime-500/5 dark:from-lime-400/20 dark:to-lime-400/5 border border-lime-500/20 shadow-sm transition-transform duration-300 group-hover:scale-[1.02]">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={label}
              className="size-full object-cover rounded-3xl p-1"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-lime-700 dark:text-lime-400">
              {initials ? (
                <span className="text-2xl md:text-3xl font-extrabold tracking-tight">
                  {initials}
                </span>
              ) : (
                <Building2 className="size-10 stroke-[1.75]" />
              )}
            </div>
          )}
        </div>

        {/* Verification / Active Pill Overlay */}
        {isVerified && (
          <div
            title="Association vérifiée"
            className="absolute -bottom-1 -right-1 flex items-center justify-center size-7 rounded-full bg-lime-600 text-white dark:bg-lime-500 ring-4 ring-background shadow-sm"
          >
            <ShieldCheck className="size-4" />
          </div>
        )}
      </div>

      {/* 3. One UI Hero Title */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight leading-tight max-w-2xl text-balance">
        {label}
      </h1>
    </div>
  );
};

export default AssocProfileTitle;