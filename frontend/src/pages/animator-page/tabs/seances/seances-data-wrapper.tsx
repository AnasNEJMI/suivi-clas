import type { User } from '@/api/auth'
import {useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { animatorKeys } from '@/api/animator/query-keys';
import { animatorApiCalls } from '@/api/animator/apiCalls';
import SeancesStats from './seances-stats';
import SeancesHistoryByGroup from './seances-history-by-group';
import CreateSeanceDrawer from './create-seance-drawer';
import type { BilanEntry, DeleteBilanEntry, SeanceEntry, SeancesDataResponse } from '@/api/animator/seances.types';
import AnimCreateSeanceButton from './create-seance-button';

const AnimSeancesTabDataWrapper = ({animator} : {animator : User}) => {
    const {data : {scolarYears, lessonsByLevel, seanceDurations}} = useSuspenseQuery({
        queryKey : animatorKeys.baseData,
        queryFn : animatorApiCalls.fetchBaseData,
        staleTime : 2 * 60 * 1000
    })

    const queryClient = useQueryClient();
    const seancesQueryKey = animatorKeys.seances;

    const {data : {scolarYears : seancesByScolarYear}} = useSuspenseQuery({
        queryKey : seancesQueryKey,
        queryFn : animatorApiCalls.fetchSeancesData,
        staleTime : 2 * 60 * 1000
    })

    const onSeanceCreated = (seance: SeanceEntry) => {
        queryClient.setQueryData<SeancesDataResponse>(animatorKeys.seances, (prev) => {
            if (!prev) return prev;

            return {
            ...prev,
            scolarYears: prev.scolarYears.map((scolarYear) => {
                if (scolarYear.id !== seance.scolarYearId) return scolarYear;

                return {
                ...scolarYear,
                classes: scolarYear.classes.map((c) => {
                    if (c.id !== seance.classId) return c;

                    return {
                    ...c,
                    seances: [seance, ...c.seances].sort(
                        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
                    ),
                    };
                }),
                };
            }),
            };
        });
    };
    
    const onBilanSubmitted = (bilan: BilanEntry) => {
        queryClient.setQueryData<SeancesDataResponse>(animatorKeys.seances, (prev) => {
            if (!prev) return prev;
    
            return {
            ...prev,
            scolarYears: prev.scolarYears.map((scolarYear) => {
    
                return {
                ...scolarYear,
                classes: scolarYear.classes.map((c) => {
    
                    return {
                        ...c,
                        seances : c.seances.map((seance) => {
                            if(seance.id !== bilan.seanceId) return seance;

                            return {
                                ...seance,
                                studentBilans : seance.studentBilans.map((s) => {
                                    if(s.id !== bilan.studentId) return s;
                                    
                                    return {...s,bilan}
                                })
                            }
                        })
                    };
                }),
                };
            }),
            };
        });
    }

    const onBilanDeleted = (bilan: DeleteBilanEntry) => {
        queryClient.setQueryData<SeancesDataResponse>(animatorKeys.seances, (prev) => {
            if (!prev) return prev;
    
            return {
            ...prev,
            scolarYears: prev.scolarYears.map((scolarYear) => {
    
                return {
                ...scolarYear,
                classes: scolarYear.classes.map((c) => {
    
                    return {
                        ...c,
                        seances : c.seances.map((seance) => {
                            if(seance.id !== bilan.seanceId) return seance;

                            return {
                                ...seance,
                                studentBilans : seance.studentBilans.map((s) => {
                                    if(s.id !== bilan.studentId) return s;
                                    
                                    return {...s,bilan : null}
                                })
                            }
                        })
                    };
                }),
                };
            }),
            };
        });
    }

    return (
        <>
            <CreateSeanceDrawer
                animator={animator} 
                classes = {scolarYears[0].classes}
                seanceDurations = {seanceDurations}
                existingSeancesByClass = {seancesByScolarYear[0]?.classes?? []}
                onSeanceCreated = {onSeanceCreated}
            >
                <AnimCreateSeanceButton/>
            </CreateSeanceDrawer>
            <SeancesStats seancesByScolarYear = {seancesByScolarYear}/>
            <SeancesHistoryByGroup
                seancesByScolarYear = {seancesByScolarYear}
                lessonsByLevel={lessonsByLevel}
                onBilanSubmitted={onBilanSubmitted}
                onBilanDeleted={onBilanDeleted}
            />
        </>
    )
}

export default AnimSeancesTabDataWrapper