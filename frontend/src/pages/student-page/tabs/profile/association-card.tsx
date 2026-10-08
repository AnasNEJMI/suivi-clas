import type { User } from '@/api/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2Icon, GraduationCapIcon, UsersIcon } from 'lucide-react';

export const AssociationCard = ({ student }: { student: User }) => {
  const assocName = student.association?.label ?? 'Non rattaché';
  const groupName = student.class?.label ?? 'Non renseigné';

  return (
    <Card className="bg-white border-slate-200 rounded-3xl p-5 lg:p-6 shadow-xs flex flex-col justify-between">
      <div>
        <CardHeader className="p-0 mb-4">
          <CardTitle className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
              <Building2Icon className="size-5 text-emerald-600" />
            </div>
            Mon Association & Groupe
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0 space-y-3">
          <div className="p-3.5 bg-slate-50/80 border border-slate-200/80 rounded-2xl flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-bold text-slate-600">
              <Building2Icon className="size-4 text-slate-400" />
              Association
            </span>
            <span className="text-xs font-extrabold text-slate-900 bg-white px-3 py-1 rounded-xl border border-slate-200/80 shadow-2xs">
              {assocName}
            </span>
          </div>

          <div className="p-3.5 bg-slate-50/80 border border-slate-200/80 rounded-2xl flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-bold text-slate-600">
              <UsersIcon className="size-4 text-slate-400" />
              Groupe / Classe
            </span>
            <span className="text-xs font-extrabold text-slate-900 bg-white px-3 py-1 rounded-xl border border-slate-200/80 shadow-2xs">
              {groupName}
            </span>
          </div>

          <div className="p-3.5 bg-slate-50/80 border border-slate-200/80 rounded-2xl flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-bold text-slate-600">
              <GraduationCapIcon className="size-4 text-slate-400" />
              Niveau scolaire
            </span>
            <span className="text-xs font-extrabold text-slate-900 bg-white px-3 py-1 rounded-xl border border-slate-200/80 shadow-2xs">
              {student.level?.label ?? 'N/A'}
            </span>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default AssociationCard;