import type { User } from '@/api/auth';
import type { BilanEntry } from '@/api/student/apiCalls';
import { Card } from '@/components/ui/card';
import { BookMarkedIcon, FlameIcon, SparklesIcon, ShieldCheckIcon } from 'lucide-react';

export const ProfileCard = ({
  student,
  bilans,
}: {
  student: User;
  bilans: BilanEntry[];
}) => {
  const firstName = student.firstName;
  const lastName = student.lastName;
  const level = student.level?.label ?? 'Niveau non renseigné';
  const associationName = student.association?.label;
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  const seancesCount = bilans?.length ?? 0;
  const presentCount = bilans.filter((b) => b.presence).length;
  const presenceRate = seancesCount === 0 ? 0 : Math.round((presentCount / seancesCount) * 100);

  const isTopStudent = presenceRate >= 80 && seancesCount > 0;

  return (
    <Card className="relative overflow-hidden border-slate-200/80 bg-linear-to-br from-white via-slate-50/50 to-sky-50/30 p-6 lg:p-7 rounded-3xl shadow-xs">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
        {/* Avatar avec halo coloré */}
        <div className="relative shrink-0">
          <div className="w-20 h-20 lg:w-22 lg:h-22 rounded-2xl bg-linear-to-tr from-blue-600 via-violet-600 to-sky-500 text-white flex items-center justify-center font-extrabold text-2xl lg:text-3xl shadow-md border-4 border-white">
            {initials}
          </div>
          {isTopStudent && (
            <div
              className="absolute -bottom-2 -right-2 bg-amber-400 text-amber-950 p-1.5 rounded-xl shadow-xs border-2 border-white"
              title="Élève très assidu !"
            >
              <FlameIcon className="size-4 fill-amber-950" />
            </div>
          )}
        </div>

        {/* Informations Élève */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold">
              <ShieldCheckIcon className="size-3.5 text-sky-600" />
              Compte Élève
            </span>
            {isTopStudent && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold">
                <SparklesIcon className="size-3.5 text-amber-500" />
                En grande forme
              </span>
            )}
          </div>

          <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            <span className="capitalize">{firstName}</span>{' '}
            <span className="uppercase">{lastName}</span>
          </h2>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-2 text-xs lg:text-sm font-semibold text-slate-600">
            <span className="flex items-center gap-1.5 bg-white border border-slate-200/80 px-3 py-1 rounded-xl shadow-2xs">
              <BookMarkedIcon className="size-4 text-indigo-500" />
              {level}
            </span>
            {associationName && (
              <span className="text-slate-500 font-medium">
                Association : <strong className="text-slate-800">{associationName}</strong>
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;