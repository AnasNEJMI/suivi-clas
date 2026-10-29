import { Link } from 'react-router';
import NavBar from './navbar';
import { useAuth } from '@/contexts/auth/use-auth';
import { BookOpenCheckIcon, LogInIcon, UserRoundIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const Header = () => {
  const { user, isAuthenticated } = useAuth();

  const accountHref =
    user?.userType === 'student'
      ? '/etudiant'
      : user?.userType === 'animator'
        ? '/animateur'
        : user?.userType === 'associationMember'
          ? '/association'
          : '/connexion';

  const accountLabel = isAuthenticated ? 'Mon espace' : 'Connexion';
  const AccountIcon = isAuthenticated ? UserRoundIcon : LogInIcon;

  return (
    <header
      aria-label="En-tête du site"
      className={cn(
        'fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:px-6 sm:pt-5',
        'transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none',
        'translate-y-0 opacity-100',
      )}
    >
      <div className={cn('flex w-full max-w-7xl items-center gap-3 justify-between')}>
        <Link
          to="/"
          tabIndex={0}
          className={cn(
            'group relative inline-flex min-w-0 items-center gap-3 overflow-hidden rounded-2xl border border-lime-300/80 bg-lime-400 px-4 py-2.5 text-slate-950 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.45)]',
            'transition-[opacity,transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
            'hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-17px_rgba(15,23,42,0.55)]',
            'translate-y-0 scale-100 opacity-100',
          )}
        >
          <span className="relative grid size-9 shrink-0 place-items-center rounded-xl bg-slate-950 text-lime-300 transition-transform duration-500 group-hover:rotate-[-5deg] group-hover:scale-105">
            <BookOpenCheckIcon className="size-[1.15rem]" />
            <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full border-2 border-lime-400 bg-white" />
          </span>
          <span className="flex min-w-0 flex-col font-outfit">
            <span className="whitespace-nowrap text-[15px] font-extrabold leading-none tracking-[-0.035em] sm:text-base">
              Mon Suivi Scolaire
            </span>
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div
            className={cn(
              'overflow-hidden transition-[max-width,opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
              'max-w-47.5 translate-y-0 scale-100 opacity-100',
            )}
          >
            <Button className='h-12 '>
              <Link to={accountHref} tabIndex={0} className="block">
                <span className="inline-flex items-center justify-center gap-2.5 whitespace-nowrap">
                  <span className="hidden lg:inline">{accountLabel}</span>
                  <AccountIcon className="size-5" />
                </span>
              </Link>
            </Button>
          </div>

          <div>
            <NavBar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
