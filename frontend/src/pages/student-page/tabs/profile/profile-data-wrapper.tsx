import type { User } from '@/api/auth';
import { studentApiCalls } from '@/api/student/apiCalls';
import { studentKeys } from '@/api/student/query-keys';
import { useSuspenseQuery } from '@tanstack/react-query';
import ProfileCard from './profile-card';
import AssociationCard from './association-card';
import StatsCard from './stats-card';
import LogoutCard from '../../../logout-card';
import BadgesCard from './badges-card';

const ProfileTabDataWrapper = ({ student }: { student: User }) => {
  const {
    data: { bilans },
  } = useSuspenseQuery({
    queryKey: studentKeys.bilans({ studentId: student.id }),
    queryFn: studentApiCalls.fetchBilans,
    staleTime: 2 * 60 * 1000,
  });

  const {
    data: { lessonsBySubject },
  } = useSuspenseQuery({
    queryKey: studentKeys.lessonEvals({ studentId: student.id }),
    queryFn: studentApiCalls.fetchLessonEvals,
    staleTime: 2 * 60 * 1000,
  });

  return (
    <div className="space-y-6 font-outfit max-w-4xl mx-auto pb-10">
      {/* Carte d'identité / En-tête profil */}
      <ProfileCard student={student} bilans={bilans} />

      {/* Trophées et Badges débloqués */}
      <BadgesCard bilans={bilans} lessonsBySubject={lessonsBySubject} />

      {/* Grille d'informations : Stats & Association */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatsCard lessonsBySubject={lessonsBySubject} bilans={bilans} />
        <AssociationCard student={student} />
      </div>

      {/* Déconnexion */}
      <div className="pt-2">
        <LogoutCard />
      </div>
    </div>
  );
};

export default ProfileTabDataWrapper;