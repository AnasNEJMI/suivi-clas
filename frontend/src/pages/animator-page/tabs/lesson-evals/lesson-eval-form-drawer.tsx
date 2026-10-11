import { useState, type ReactNode } from 'react';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, CalendarIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { animatorApiCalls } from '@/api/animator/apiCalls';
import { toast } from 'sonner';
import { Field } from '@/components/ui/field';
import { BrandButton } from '@/components/brand-button';
import type { LessonEvalData, StudentLessonEvalsEntry } from '@/api/animator/lesson-evals.types';
import { lessonEvalFormSchema, type LessonEvalFormValues } from '@/lib/schemas/lesson-eval.schema';
import type { LessonEntry } from '@/api/animator/types';
import { cn, getElapsedDays } from '@/lib/utils';
import { type CardStyle } from '@/lib/types/data.types';
import EvaluationField from './evaluation-field';

interface AnimLessonEvalFormDrawerProps {
    student: StudentLessonEvalsEntry;
    animatorId: number;
    lesson: LessonEntry;
    cardStyle: CardStyle;
    lessonEval: LessonEvalData | undefined;
    onLessonEvalUpserted: (lessonEval: LessonEvalData) => void;
    children: ReactNode;
}

const AnimLessonEvalFormDrawer = ({
    student,
    animatorId,
    onLessonEvalUpserted,
    lesson,
    lessonEval,
    cardStyle,
    children,
}: AnimLessonEvalFormDrawerProps) => {
    const isMobile = useIsMobile();
    const [open, setOpen] = useState(false);
    const initials = `${student.firstName?.[0] ?? ''}${student.lastName?.[0] ?? ''}`.toUpperCase();

    const form = useForm<LessonEvalFormValues>({
        resolver: zodResolver(lessonEvalFormSchema),
        defaultValues: {
            evaluation: lessonEval?.evaluation ?? 'notAcquired',
        },
    });

    const submitMutation = useMutation({
        mutationFn: (data: LessonEvalFormValues) => {
            return animatorApiCalls.submitLessonEval({
                animatorId,
                studentId: student.id,
                lessonId: lesson.id,
                evaluation: data.evaluation,
            });
        },
        onSuccess: (resLessonEval) => {
            if (!resLessonEval) {
                toast.error("Erreur lors de l'enregistrement de l'évaluation de la leçon.");
            } else {
                toast.success('Évaluation de la leçon soumise avec succès.');
                onLessonEvalUpserted(resLessonEval);
                setOpen(false);
            }
        },
        onError: (err) => {
            console.error(err);
            toast.error("Erreur lors de l'enregistrement de l'évaluation de la leçon.");
        },
    });

    return (
        <Drawer direction={isMobile ? 'left' : 'right'} open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            
            <DrawerContent className="h-dvh flex flex-col font-outfit shadow-2xl border-l border-slate-200/80 bg-slate-50/95 backdrop-blur-md p-0 md:rounded-l-2xl overflow-hidden focus:outline-none gap-0">
                {/* --- EN-TÊTE DU DRAWER --- */}
                <DrawerHeader className="p-4 sm:p-5 border-b border-slate-200/80 bg-white/90 shrink-0 space-y-3 text-left">
                    <div className="flex items-center justify-between">
                        <DrawerClose asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2.5 -ml-2 gap-1.5 font-bold text-slate-900 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                            >
                                <ArrowLeftIcon className="size-4" />
                                <span>Retour</span>
                            </Button>
                        </DrawerClose>

                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200/80">
                            Évaluation de leçon
                        </span>
                    </div>

                    <div className="flex items-center gap-3 pt-1">
                        <div className="size-11 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100/80 flex items-center justify-center font-extrabold text-sm shadow-2xs shrink-0">
                            {initials}
                        </div>
                        <div className="space-y-0.5 min-w-0 flex-1">
                            <DrawerTitle className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 truncate">
                                {student.firstName} {student.lastName}
                            </DrawerTitle>
                            <DrawerDescription className="text-xs font-medium text-slate-500">
                                Attribuez un niveau de maîtrise pour cette leçon
                            </DrawerDescription>
                        </div>
                    </div>
                </DrawerHeader>

                {/* --- FORMULAIRE DÉFILANT --- */}
                <FormProvider {...form}>
                    <form
                        onSubmit={form.handleSubmit((data) => submitMutation.mutate(data))}
                        className="brand-v-scrollbar overflow-x-hidden overflow-y-auto p-4 sm:p-5 flex-1 space-y-6 flex flex-col justify-between"
                    >
                        <div className="space-y-5">
                            {/* Carte rappel de la leçon */}
                            <div className={cn('p-5 rounded-3xl border shadow-2xs relative overflow-hidden', cardStyle.bgColor, cardStyle.borderColor)}>
                                <div className="flex items-start gap-3.5">
                                    <div className={cn('size-11 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs', cardStyle.iconBgColor, cardStyle.highlightTextColor)}>
                                        <cardStyle.icon className="size-6" />
                                    </div>
                                    <div className="space-y-1 min-w-0">
                                        <span className={cn('font-extrabold tracking-wider uppercase text-xs block', cardStyle.highlightTextColor)}>
                                            {cardStyle.label}
                                        </span>
                                        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                                            {lesson.label}
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            {/* Section Choix de l'évaluation */}
                            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
                                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                                    <h4 className="font-bold text-sm text-slate-900">Niveau d'acquisition</h4>
                                    {lessonEval ? (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                                            <CalendarIcon className="size-3.5 text-emerald-500" />
                                            <span>Mise à jour {getElapsedDays(lessonEval.updatedAt)}</span>
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-xs font-semibold">
                                            <span>Première évaluation</span>
                                        </span>
                                    )}
                                </div>

                                <div className="pt-2">
                                    <EvaluationField />
                                </div>
                            </div>
                        </div>

                        {/* Boutons d'action */}
                        <Field className="pt-4 flex flex-row items-center gap-3 mt-auto">
                            <BrandButton
                                type="button"
                                variant="outline"
                                size="lg"
                                onClick={() => form.reset()}
                                disabled={submitMutation.isPending}
                                className="flex-1 h-11 text-sm font-bold"
                            >
                                Réinitialiser
                            </BrandButton>

                            <BrandButton
                                type="submit"
                                size="lg"
                                disabled={submitMutation.isPending}
                                className="flex-1 h-11 text-sm font-bold"
                            >
                                {submitMutation.isPending ? 'Enregistrement...' : "Enregistrer l'évaluation"}
                            </BrandButton>
                        </Field>
                    </form>
                </FormProvider>
            </DrawerContent>
        </Drawer>
    );
};

export default AnimLessonEvalFormDrawer;