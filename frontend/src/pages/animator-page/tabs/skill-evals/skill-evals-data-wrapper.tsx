import type { User } from '@/api/auth'
import {useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { animatorKeys } from '@/api/animator/query-keys';
import { animatorApiCalls } from '@/api/animator/apiCalls';
import type { SkillEvalData, SkillEvalsResponse } from '@/api/animator/skill-evals.types';
import AnimSkillEvalStats from './skill-eval-stats';
import AnimSkillEvalsByGroup from './skill-evals-by-group';

const AnimSkillEvalsTabDataWrapper = ({animator} : {animator : User}) => {
    const {data : {classes}} = useSuspenseQuery({
        queryKey : animatorKeys.skillEvals,
        queryFn : animatorApiCalls.fetchSkillEvalsData,
        staleTime : 2 * 60 * 1000
    })

    const queryClient = useQueryClient();

    const onSkillEvalUpserted = (skillEvalData: SkillEvalData) => {
        queryClient.setQueryData<SkillEvalsResponse>(animatorKeys.skillEvals, (prev) => {
            if (!prev) return prev;

            return {
            ...prev,
            classes: prev.classes.map((clas) => {
                if (!clas.students.some(s => s.id === skillEvalData.studentId)) return clas;

                return {
                ...clas,
                students: clas.students.map((s) => {
                    if (s.id !== skillEvalData.studentId) return s;

                    return {
                        ...s,
                        skillEval: skillEvalData
                    };
                }),
                };
            }),
            };
        });
    };

    return (
        <>
            <AnimSkillEvalStats classes = {classes}/>
            <AnimSkillEvalsByGroup
                classes = {classes}
                animatorId={animator.id}
                onSkillEvalUpserted = {onSkillEvalUpserted}
            />
        </>
    )
}

export default AnimSkillEvalsTabDataWrapper