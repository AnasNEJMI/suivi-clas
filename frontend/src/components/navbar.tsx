import { useEffect, useRef, useState } from 'react';
import { NavLink as RouterNavLink } from 'react-router';
import { cn } from '@/lib/utils';
import { BrandButton } from './brand-button';
import {
  ArrowUpRightIcon,
  BookOpenCheckIcon,
  GraduationCapIcon,
  LightbulbIcon,
  MenuIcon,
  SparklesIcon,
  XIcon,
} from 'lucide-react';

interface NavBarProps extends React.ComponentProps<'div'> {
  className?: string;
}

const links = [
  {
    label: 'Ma méthode',
    to: '/methode',
    number: '01',
    description: 'Une méthode claire pour progresser.',
    icon: BookOpenCheckIcon,
  },
  {
    label: 'Contact',
    to: '/contact',
    number: '02',
    description: 'Parlons de votre parcours.',
    icon: GraduationCapIcon,
  },
];

const EXIT_ANIMATION_MS = 420;

const NavBar = ({ className, ...props }: NavBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame1 = 0;
    let frame2 = 0;
    let timeout = 0;

    if (isOpen) {
        // Mount on the next animation frame.
        frame1 = window.requestAnimationFrame(() => {
        setIsMounted(true);

        // Trigger the enter transition after mounting.
        frame2 = window.requestAnimationFrame(() => {
            setIsVisible(true);
        });
        });
    } else {
        // Trigger the exit transition asynchronously.
        frame1 = window.requestAnimationFrame(() => {
        setIsVisible(false);
        });

        // Unmount after the exit animation finishes.
        timeout = window.setTimeout(() => {
        setIsMounted(false);
        }, EXIT_ANIMATION_MS);
    }

    return () => {
        window.cancelAnimationFrame(frame1);
        window.cancelAnimationFrame(frame2);
        window.clearTimeout(timeout);
    };
    }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <div ref={rootRef} className={cn('relative z-70', className)} {...props}>
      {/* Full-page dimmer keeps focus on the open navigation without covering the trigger. */}
      {isMounted && (
        <button
          type="button"
          aria-label="Fermer le menu de navigation"
          tabIndex={isVisible ? 0 : -1}
          onClick={closeMenu}
          className={cn(
            'fixed h-dvh inset-0 z-40 cursor-default bg-slate-950/20 backdrop-blur-[3px] transition-opacity duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
            isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none',
          )}
        />
      )}

      <BrandButton
        type="button"
        aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={isOpen}
        aria-controls="school-navigation-panel"
        onClick={() => setIsOpen((open) => !open)}
        className={cn('h-11 w-14 top-0.5')}
      >
        <span className="relative flex size-full items-center justify-center">
          <MenuIcon
            className={cn(
              'absolute size-5 transition-[transform,opacity] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
              isOpen ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100',
            )}
          />
          <XIcon
            className={cn(
              'absolute size-5 transition-[transform,opacity] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
              isOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0',
            )}
          />
        </span>
      </BrandButton>

      {isMounted && (
        <div
          id="school-navigation-panel"
          aria-hidden={!isVisible}
          role="dialog"
          aria-label="Menu de navigation"
          onClick={(event) => event.stopPropagation()}
          className={cn(
            'absolute right-0 top-[calc(100%+0.85rem)] z-50 w-[min(92vw,430px)] origin-top-right overflow-hidden rounded-[1.75rem] border border-white/80 bg-[#fbfcf6] text-slate-900 shadow-[0_28px_90px_-24px_rgba(15,23,42,0.48)] ring-1 ring-slate-900/5 transition-[opacity,transform,filter] duration-420 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
            isVisible
              ? 'translate-y-0 scale-100 opacity-100'
              : 'pointer-events-none -translate-y-3 scale-[0.965] opacity-0',
          )}
        >
          {/* A small academic brand moment */}
          <div className="relative overflow-hidden bg-lime-400 px-6 pb-6 pt-5 sm:px-7 sm:pt-6">
            <div className="pointer-events-none absolute -right-8 -top-12 size-40 rounded-full border-24 border-white/20" />
            <div className="pointer-events-none absolute right-12 top-14 size-3 rotate-12 rounded-sm bg-slate-900/10" />
            <div className="relative flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/50 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-800">
                <SparklesIcon className="size-3.5" />
                Le chemin de la réussite
              </div>
              <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-slate-950 text-lime-300 shadow-sm">
                <BookOpenCheckIcon className="size-5" />
              </span>
            </div>
            <div className="relative mt-6 max-w-[18rem]">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-800/65">Mon Suivi Scolaire</p>
              <h2 className="mt-1.5 text-[1.75rem] font-extrabold leading-[1.05] tracking-[-0.055em] text-slate-950 sm:text-3xl">
                Apprendre mieux.
                <br />
                Grandir en confiance.
              </h2>
            </div>
          </div>

          <div className="px-4 pb-4 pt-5 sm:px-5 sm:pb-5">
            <div className="mb-3 flex items-center justify-between px-2">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">Explorer</p>
              <span className="text-[10px] font-semibold text-slate-400">{links.length.toString().padStart(2, '0')} destinations</span>
            </div>

            <nav aria-label="Navigation principale">
              <ul className="space-y-1.5">
                {links.map((link, index) => {
                  const LinkIcon = link.icon;
                  return (
                    <li
                      key={link.to}
                      className={cn(
                        'transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-3 opacity-0',
                      )}
                      style={{ transitionDelay: isOpen ? `${90 + index * 75}ms` : '0ms' }}
                    >
                      <RouterNavLink
                        to={link.to}
                        tabIndex={isVisible ? 0 : -1}
                        onClick={closeMenu}
                        className={({ isActive }) => cn(
                          'group flex items-center gap-3 rounded-2xl border p-3 transition-[background-color,border-color,transform] duration-200 hover:translate-x-0.5 hover:border-slate-200/80 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 sm:p-3.5',
                          isActive ? 'border-lime-200 bg-white/80' : 'border-transparent',
                        )}
                      >
                        <span className="flex size-12 shrink-0 items-center justify-center rounded-[1.1rem] bg-slate-100 text-slate-700 transition-[background-color,color,transform] duration-300 group-hover:rotate-[-4deg] group-hover:bg-lime-200 group-hover:text-slate-950">
                          <LinkIcon className="size-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2">
                            <span className="text-base font-extrabold tracking-tight text-slate-900">{link.label}</span>
                            <span className="text-[10px] font-bold tracking-wider text-slate-300">{link.number}</span>
                          </span>
                          <span className="mt-0.5 block text-xs font-medium leading-relaxed text-slate-500">{link.description}</span>
                        </span>
                        <ArrowUpRightIcon className="size-4 shrink-0 text-slate-400 transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-slate-900" />
                      </RouterNavLink>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div
              className={cn(
                'mt-4 flex items-start gap-3 rounded-2xl border border-lime-900/5 bg-lime-50 px-4 py-3.5 transition-[opacity,transform] duration-500 motion-reduce:transition-none',
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
              )}
              style={{ transitionDelay: isOpen ? `${120 + links.length * 75}ms` : '0ms' }}
            >
              <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-xl bg-lime-200 text-lime-950">
                <LightbulbIcon className="size-4" />
              </span>
              <p className="text-xs font-medium leading-relaxed text-slate-600">
                <strong className="font-extrabold text-slate-900">Chaque progrès compte.</strong>{' '}
                Avance à ton rythme, une étape après l’autre.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
