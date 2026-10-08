import type { SkillsEvalEntry } from '@/api/student/apiCalls';
import { RotateCwFadingClockIcon } from 'lucide-react';
import SkillsEvalCard from './skills-eval-card';

interface SkillsEvalsCardListProps {
  skillsEvals: SkillsEvalEntry[];
}

const SkillsEvalsCardList = ({ skillsEvals }: SkillsEvalsCardListProps) => {
  // État vide
  if (!skillsEvals || skillsEvals.length === 0) {
    return (
      <div className="font-outfit mt-8 space-y-3">
        <h3 className="text-lg lg:text-xl font-bold text-slate-900 tracking-tight">
          Évaluations des animateurs
        </h3>
        <div className="flex flex-col items-center justify-center p-8 bg-white border border-dashed border-slate-200/80 rounded-2xl text-center">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-3">
            <RotateCwFadingClockIcon className="size-5 text-slate-400" />
          </div>
          <p className="text-sm font-semibold text-slate-700">
            Aucune évaluation de méthodologie enregistrée
          </p>
          <p className="text-xs text-slate-400 mt-1 max-w-md">
            Une fois les évaluations soumises, vous découvrirez ici les commentaires de chacun des animateurs qui vous accompagnent.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-outfit mt-8 space-y-4">
      {/* En-tête de section avec compteur */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg lg:text-xl font-bold text-slate-900 tracking-tight">
          Évaluations des animateurs
        </h3>
        <span className="bg-slate-100/80 border border-slate-200/80 px-3.5 py-1 text-xs font-bold text-slate-700 rounded-full">
          {skillsEvals.length} {skillsEvals.length > 1 ? 'évaluations' : 'évaluation'}
        </span>
      </div>

      {/* Liste des cartes d'évaluations */}
      <div className="w-full space-y-4">
        {skillsEvals.map((skillsEval) => (
          <SkillsEvalCard key={skillsEval.id} skillsEval={skillsEval} />
        ))}
      </div>
    </div>
  );
};

export default SkillsEvalsCardList;