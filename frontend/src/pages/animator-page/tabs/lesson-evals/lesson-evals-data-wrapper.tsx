import type { User } from '@/api/auth'
import {useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { animatorKeys } from '@/api/animator/query-keys';
import { animatorApiCalls } from '@/api/animator/apiCalls';
import type { LessonEvalData, LessonEvalsResponse } from '@/api/animator/lesson-evals.types';
import AnimLessonEvalStats from './lesson-eval-stats';
import AnimLessonEvalsByGroup from './lesson-evals-by-group';

const AnimLessonEvalsTabDataWrapper = ({animator} : {animator : User}) => {
    const {data : {classes}} = useSuspenseQuery({
        queryKey : animatorKeys.lessonEvals,
        queryFn : animatorApiCalls.fetchLessonEvalsData,
        staleTime : 2 * 60 * 1000
    })
    const {data : {lessonsByLevel}} = useSuspenseQuery({
        queryKey : animatorKeys.baseData,
        queryFn : animatorApiCalls.fetchBaseData,
        staleTime : 2 * 60 * 1000
    })

    const queryClient = useQueryClient();

    const onLessonEvalUpserted = (lessonEvalData: LessonEvalData) => {
        queryClient.setQueryData<LessonEvalsResponse>(animatorKeys.lessonEvals, (prev) => {
            if (!prev) return prev;
            console.log('lessonEvalData', lessonEvalData)
            return {
            ...prev,
            classes: prev.classes.map((clas) => {
                if (!clas.students.some(s => s.id === lessonEvalData.studentId)) return clas;

                return {
                ...clas,
                students: clas.students.map((s) => {
                    if (s.id !== lessonEvalData.studentId) return s;

                    return {
                        ...s,
                        lessonEvalsBySubject : s.lessonEvalsBySubject.find(evalBySubject => evalBySubject.id === lessonEvalData.subject.id)
                        ?s.lessonEvalsBySubject.map((evalBySubject) => {
                            if(evalBySubject.id !== lessonEvalData.subject.id) return evalBySubject;

                            console.log('found lesson eval subject : ', evalBySubject)
                            return {
                                ...evalBySubject,
                                lessonEvals : evalBySubject.lessonEvals.find(lessonEval => lessonEval.id === lessonEvalData.id)
                                ? evalBySubject.lessonEvals.map((lessonEval) => {
                                    if(lessonEval.id !== lessonEvalData.id) return lessonEval;
                                    console.log('found lesson eval, ', lessonEval, ' now it becomes ', {...lessonEval, evaluation : lessonEvalData.evaluation})
                                    return {...lessonEval, evaluation : lessonEvalData.evaluation}
                                })
                                : [...evalBySubject.lessonEvals, lessonEvalData]
                            }
                        })
                        : [...s.lessonEvalsBySubject, {id : lessonEvalData.subject.id, subject : {id : lessonEvalData.subject.id, label : lessonEvalData.subject.label}, lessonEvals : [lessonEvalData]}]
                    };
                }),
                };
            }),
            };
        });
    };

    return (
        <>
            <AnimLessonEvalStats classes = {classes}/>
            <AnimLessonEvalsByGroup
                classes = {classes}
                animatorId={animator.id}
                onLessonEvalUpserted = {onLessonEvalUpserted}
                lessonsByLevel = {lessonsByLevel}
            />
        </>
    )
}

export default AnimLessonEvalsTabDataWrapper