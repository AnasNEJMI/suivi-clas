import type { SkillsEvalEntry } from '@/api/student/apiCalls';
import { RotateCwFadingClockIcon } from 'lucide-react';
import SkillsEvalCard from './skills-eval-card';
import { EmptyStateCard } from '@/components/ui/empty-state-card';

interface SkillsEvalsCardListProps {
  skillsEvals: SkillsEvalEntry[];
}

const SkillsEvalsCardList = ({ skillsEvals }: SkillsEvalsCardListProps) => {
  // État vide
  if (!skillsEvals || skillsEvals.length === 0) {
    return (
      <div className="font-outfit mt-6 space-y-3">
        <h3 className="text-lg lg:text-xl font-bold text-slate-900 tracking-tight">
          Évaluations des animateurs
        </h3>
        <EmptyStateCard
          icon={RotateCwFadingClockIcon}
          title='Aucune évaluation de méthodologie enregistrée'
          description='Une fois les évaluations soumises, vous découvrirez ici les commentaires de chacun des animateurs qui vous accompagnent.'
        />
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