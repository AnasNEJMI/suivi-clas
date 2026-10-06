import { useEffect, useState } from 'react';
import type { User } from '@/api/auth';
import { cn } from '@/lib/utils';

interface TabHeaderProps extends React.ComponentProps<'section'> {
  user: User;
  title: string;
  subTitle: string;
  description: string;
}

const TabHeaderImproved = ({
  user,
  description,
  subTitle,
  title,
  className,
  ...props
}: TabHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Collapses header as soon as user scrolls past 20px
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300 ease-out',
        isScrolled
          ? 'bg-white/85 dark:bg-slate-950/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-2xs py-2.5 px-4 md:px-8'
          : 'bg-transparent py-6 px-4 md:px-8',
        className
      )}
      {...props}
    >
      <div className="max-w-7xl mx-auto flex flex-col items-start justify-center transition-all duration-300">
        
        {/* Eyebrow / Breadcrumb Tag (Samsung One UI Style) */}
        <div
          className={cn(
            'flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 transition-all duration-300 overflow-hidden',
            isScrolled ? 'max-h-0 opacity-0 mb-0' : 'max-h-6 opacity-100 mb-1'
          )}
        >
          <span className="uppercase tracking-wider font-semibold text-lime-600 dark:text-lime-400">
            {title}
          </span>
          {subTitle && (
            <>
              <span className="opacity-40">•</span>
              <span className="opacity-80">{subTitle}</span>
            </>
          )}
        </div>

        {/* Main Title - Shrinks & Re-positions to Top-Left */}
        <div className="flex items-center justify-start w-full">
          <h1
            className={cn(
              'font-extrabold text-slate-900 dark:text-white tracking-tight transition-all duration-300 leading-snug',
              isScrolled
                ? 'text-base sm:text-lg md:text-xl'
                : 'text-2xl sm:text-3xl md:text-4xl'
            )}
          >
            Bonjour{' '}
            <span className="text-lime-600 dark:text-lime-400">
              {user.firstName}
            </span>{' '}
            👋 !
          </h1>
        </div>

        {/* Subtitle / Description - Fades out & Collapses Height */}
        <p
          className={cn(
            'text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-xl text-balance transition-all duration-300 leading-relaxed overflow-hidden',
            isScrolled
              ? 'max-h-0 opacity-0 mt-0'
              : 'max-h-24 opacity-100 mt-2'
          )}
        >
          {description}
        </p>
      </div>
    </section>
  );
};

export default TabHeaderImproved;