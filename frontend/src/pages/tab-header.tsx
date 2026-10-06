import { useSyncExternalStore } from 'react';
import type { User } from '@/api/auth';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface TabHeaderProps extends React.ComponentProps<'section'> {
  user: User;
  title: string;
  subTitle: string;
  description: string;
}

// Distance (px) over which full collapse occurs on mobile
const SCROLL_DISTANCE = 80;

// External window scroll store subscription
const subscribeScroll = (callback: () => void) => {
  window.addEventListener('scroll', callback, { passive: true });
  return () => window.removeEventListener('scroll', callback);
};

const getScrollY = () => (typeof window !== 'undefined' ? window.scrollY : 0);
const getServerScrollY = () => 0;

const TabHeader = ({
  user,
  description,
  subTitle,
  title,
  className,
  ...props
}: TabHeaderProps) => {
  const isMobile = useIsMobile();
  
  // Read scrollY directly from the browser window store
  const scrollY = useSyncExternalStore(subscribeScroll, getScrollY, getServerScrollY);

  // Derived progress calculated during render (0 on desktop, 0 to 1 on mobile)
  const activeProgress = isMobile
    ? Math.min(1, Math.max(0, scrollY / SCROLL_DISTANCE))
    : 0;

  // Dynamic layout calculations (Mobile = animated, Desktop = fixed)
  const py = isMobile ? 24 - activeProgress * 10 : 24;
  const titleFontSize = isMobile ? 1.75 - activeProgress * 0.625 : 2.25;

  const eyebrowMaxHeight = (1 - activeProgress) * 24;
  const eyebrowMarginBottom = (1 - activeProgress) * 4;
  const descMaxHeight = (1 - activeProgress) * 80;
  const descMarginTop = (1 - activeProgress) * 8;
  const contentOpacity = Math.max(0, 1 - activeProgress * 1.4);

  return (
    <>
      {/* 
        1. STATIC LAYOUT SPACER
        Holds layout space constant in document flow so page height 
        never changes and window.scrollY never shifts unexpectedly.
      */}
      <div 
        aria-hidden="true" 
        className="w-full pointer-events-none h-37 md:h-40" 
      />

      {/* 
        2. FIXED VISUAL HEADER
        Positioned fixed over the spacer. Collapses visually on mobile only.
      */}
      <section
        className={cn(
          'fixed top-0 right-0 z-40 w-full lg:w-[calc(100%-18rem)] backdrop-blur-md border-b px-6 md:px-8',
          className
        )}
        style={{
          paddingTop: `${py}px`,
          paddingBottom: `${py}px`,
          backgroundColor: `rgba(255, 255, 255, ${activeProgress * 0.85})`,
          borderColor: `rgba(226, 232, 240, ${activeProgress})`, // slate-200
          boxShadow: activeProgress > 0.75 ? '0 1px 3px 0 rgba(0, 0, 0, 0.05)' : 'none',
        }}
        {...props}
      >
        <div className="max-w-7xl mx-auto flex flex-col items-start justify-center">
          
          {/* Eyebrow / Breadcrumb Tag */}
          <div
            className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 overflow-hidden"
            style={{
              maxHeight: `${eyebrowMaxHeight}px`,
              marginBottom: `${eyebrowMarginBottom}px`,
              opacity: contentOpacity,
            }}
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

          {/* Main Title */}
          <div className="flex items-center justify-start w-full">
            <h1
              className="font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug"
              style={{
                fontSize: `${titleFontSize}rem`,
              }}
            >
              Bonjour{' '}
              <span className="text-lime-600 dark:text-lime-400">
                {user.firstName}
              </span>{' '}
              👋 !
            </h1>
          </div>

          {/* Subtitle / Description */}
          <div
            className="overflow-hidden w-full"
            style={{
              maxHeight: `${descMaxHeight}px`,
              marginTop: `${descMarginTop}px`,
              opacity: contentOpacity,
            }}
          >
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-xl text-balance leading-relaxed">
              {description}
            </p>
          </div>

        </div>
      </section>
    </>
  );
};

export default TabHeader;