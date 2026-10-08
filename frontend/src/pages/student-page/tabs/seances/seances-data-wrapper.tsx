import type { User } from '@/api/auth';
import { studentApiCalls, type BilanEntry, type QcmEntry } from '@/api/student/apiCalls';
import { studentKeys } from '@/api/student/query-keys';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import StudentLastSeanceCard from './last-seance-card';
import StudentSeanceHistoryCarousel from './seance-history-carousel';
import StudentSeanceStats from './seance-stats';

const StudentSeancesTabDataWrapper = ({ student }: { student: User }) => {
  const queryKey = studentKeys.bilans({ studentId: student.id });

  const {
    data: { bilans },
  } = useSuspenseQuery({
    queryKey,
    queryFn: studentApiCalls.fetchBilans,
    staleTime: 2 * 60 * 1000,
  });

  const queryClient = useQueryClient();

  const onQcmSubmit = (updatedQcm: QcmEntry) => {
    const storageKey = `qcm-progress-${updatedQcm.id}`;
    localStorage.removeItem(storageKey);

    queryClient.setQueryData<{ bilans: BilanEntry[] } | undefined>(queryKey, (prev) => {
      if (!prev) return prev;
      return {
        bilans: prev.bilans.map((b) =>
          b.qcm?.id === updatedQcm.id ? { ...b, qcm: updatedQcm } : b
        ),
      };
    });
  };

  return (
    <div className="transition-all">
      {/* Hero / Recent Session Section */}
      <section className="relative">
        <StudentLastSeanceCard onQcmSubmit={onQcmSubmit} bilans={bilans} />
      </section>

      {/* History Carousel Section */}
      <section>
        <StudentSeanceHistoryCarousel onQcmSubmit={onQcmSubmit} bilans={bilans} />
      </section>

      {/* Analytics & Stats Section */}
      <section>
        <StudentSeanceStats bilans={bilans} />
      </section>
    </div>
  );
};

export default StudentSeancesTabDataWrapper;