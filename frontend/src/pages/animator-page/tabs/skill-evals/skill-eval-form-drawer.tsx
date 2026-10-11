import type { SkillEvalData, SkillEvalStudentEntry } from '@/api/animator/skill-evals.types'
import { useState, type ReactNode } from 'react'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, MessageSquareTextIcon, NotebookPenIcon, SlidersIcon } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'
import { FormProvider, useForm } from 'react-hook-form'
import { skillEvalFormSchema, type SkillEvalFormValues } from '@/lib/schemas/skill-eval.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { animatorApiCalls } from '@/api/animator/apiCalls'
import { toast } from 'sonner'
import { Field } from '@/components/ui/field'
import { BrandButton } from '@/components/brand-button'
import AnimSkillSliderField from './skill-slider-field'
import AnimSkillCommentaryField from './skill-commentary-field'

interface AnimSkillEvalDrawerProps {
    student: SkillEvalStudentEntry
    animatorId: number
    onSkillEvalUpserted: (skillEval: SkillEvalData) => void
    children: ReactNode
}

const AnimSkillEvalDrawer = ({
    student,
    animatorId,
    onSkillEvalUpserted,
    children,
}: AnimSkillEvalDrawerProps) => {
    const isMobile = useIsMobile()
    const [open, setOpen] = useState(false)
    const name = `${student.firstName} ${student.lastName}`
    const initials = `${student.firstName?.[0] ?? ''}${student.lastName?.[0] ?? ''}`.toUpperCase()

    const form = useForm<SkillEvalFormValues>({
        resolver: zodResolver(skillEvalFormSchema),
        defaultValues: {
            autonomy: student.skillEval?.autonomy ?? 0,
            discipline: student.skillEval?.discipline ?? 0,
            organisation: student.skillEval?.organisation ?? 0,
            ponctuality: student.skillEval?.ponctuality ?? 0,
            regularity: student.skillEval?.regularity ?? 0,
            respect: student.skillEval?.respect ?? 0,
            preparation: student.skillEval?.preparation ?? 0,
            positive: student.skillEval?.positive ?? '',
            negative: student.skillEval?.negative ?? '',
            improvements: student.skillEval?.improvements ?? '',
        },
    })

    const submitMutation = useMutation({
        mutationFn: (data: SkillEvalFormValues) => {
            return animatorApiCalls.submitSkillEval({
                animatorId: animatorId,
                studentId: student.id,
                autonomy: data.autonomy,
                discipline: data.discipline,
                organisation: data.organisation,
                ponctuality: data.ponctuality,
                regularity: data.regularity,
                respect: data.respect,
                preparation: data.preparation,
                positive: data.positive,
                negative: data.negative,
                improvements: data.improvements,
            })
        },
        onSuccess: (skillEval) => {
            if (!skillEval) {
                toast.error("Erreur lors de la soumission de l'évaluation.")
            } else {
                toast.success('Évaluation soumise avec succès.')
                onSkillEvalUpserted(skillEval)
                setOpen(false)
            }
        },
        onError: (err) => {
            console.error(err)
            toast.error("Erreur lors de l'enregistrement de l'évaluation.")
        },
    })

    return (
        <Drawer direction={isMobile ? 'left' : 'right'} open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            
            <DrawerContent className="h-dvh flex flex-col font-outfit shadow-2xl border-l border-slate-200/80 bg-slate-50/95 backdrop-blur-md p-0 md:rounded-l-2xl overflow-hidden focus:outline-none gap-0">
                {/* --- EN-TÊTE DU DRAWER --- */}
                <DrawerHeader className="p-4 sm:p-5 border-b border-slate-200/80 bg-white/90 shrink-0 space-y-4 text-left">
                    {/* Ligne 1 : Navigation Retour & Badge */}
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

                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/80 text-[11px] font-bold">
                            <NotebookPenIcon className="size-3 text-indigo-500" />
                            <span>Méthodologie</span>
                        </span>
                    </div>

                    {/* Ligne 2 : Identité Élève & Titre */}
                    <div className="flex items-center gap-3">
                        <div className="size-11 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100/80 flex items-center justify-center font-extrabold text-sm shadow-2xs shrink-0">
                            {initials}
                        </div>

                        <div className="space-y-0.5 min-w-0 flex-1">
                            <DrawerTitle className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 truncate">
                                {name}
                            </DrawerTitle>
                            <DrawerDescription className="text-xs font-medium text-slate-500">
                                Renseignez ou modifiez la grille de compétences
                            </DrawerDescription>
                        </div>
                    </div>
                </DrawerHeader>

                {/* --- FORMULAIRE DÉFILANT --- */}
                <FormProvider {...form}>
                    <form
                        id="skill-eval-form"
                        onSubmit={form.handleSubmit((data) => submitMutation.mutate(data))}
                        className="brand-v-scrollbar overflow-x-hidden overflow-y-auto p-4 sm:p-5 flex-1 space-y-6 flex flex-col justify-between"
                    >
                        <div className="space-y-5">
                            {/* --- CARTE 1 : NOTES & SLIDERS --- */}
                            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-2xs space-y-4 relative overflow-hidden">
                                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                                    <div className="size-8 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shrink-0">
                                        <SlidersIcon className="size-4 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-base text-indigo-600">Notes & Compétences</h4>
                                        <p className="text-xs text-slate-500">Ajustez les curseurs de notation de 0 à 20</p>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-1">
                                    <AnimSkillSliderField name="autonomy" />
                                    <AnimSkillSliderField name="discipline" />
                                    <AnimSkillSliderField name="organisation" />
                                    <AnimSkillSliderField name="ponctuality" />
                                    <AnimSkillSliderField name="regularity" />
                                    <AnimSkillSliderField name="respect" />
                                    <AnimSkillSliderField name="preparation" />
                                </div>
                            </div>

                            {/* --- CARTE 2 : COMMENTAIRES & RETOURS --- */}
                            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-2xs space-y-4 relative overflow-hidden">
                                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                                    <div className="size-8 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                                        <MessageSquareTextIcon className="size-4 textindo-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-base text-indigo-600">Retours & Commentaires</h4>
                                        <p className="text-xs text-slate-500">Synthèse des points forts et axes d'amélioration</p>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-1">
                                    <AnimSkillCommentaryField name="positive" />
                                    <AnimSkillCommentaryField name="negative" />
                                    <AnimSkillCommentaryField name="improvements" />
                                </div>
                            </div>
                        </div>

                        {/* --- ACTIONS DE FORMULAIRE --- */}
                        <Field className="pt-4 flex flex-row items-center gap-3">
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
    )
}

export default AnimSkillEvalDrawer