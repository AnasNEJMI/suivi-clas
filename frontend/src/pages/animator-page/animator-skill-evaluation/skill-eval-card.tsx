import { animatorApiCalls } from '@/api/animator/apiCalls';
import { animatorKeys } from '@/api/animator/query-keys';
import type { SkillEvalEntry, SkillEvalQueryParams } from '@/api/animator/types'
import { type SkillEvalFormValues } from '@/lib/schemas/skill-eval.schema';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import SkillEvalSkeletonCard from './cards/skill-eval-skeleton-card';
import SkillEvalErrorCard from './cards/skill-eval-error-card';
import SkillEvalForm from './skill-eval-form';

interface SkillEvalCardProps{
  params: SkillEvalQueryParams,
}

const   SkillEvalCard = ({
    params,
} : SkillEvalCardProps) => {
    const queryClient = useQueryClient();
    const queryKey = animatorKeys.skillEval(params);

    const {data : skillEval, isLoading, isError} = useQuery({
        queryKey,
        queryFn : () => animatorApiCalls.fetchSkillEval(params),
        staleTime : 0,
        gcTime : 45 * 60 * 1000
    })

    const submitMutation = useMutation({
        mutationFn : (data : SkillEvalFormValues) => {
            console.log('data ', data);

            return animatorApiCalls.submitSkillEval({
                animatorId : params.animatorId,
                studentId : params.studentId,
                autonomy : data.autonomy,
                discipline : data.discipline,
                organisation : data.organisation,
                ponctuality : data.ponctuality,
                regularity : data.regularity,
                respect : data.respect,
                preparation : data.preparation,
                positive : data.positive,
                negative :  data.negative,
                improvements : data.improvements,
                })
        },
        onSuccess : (skillEval) => {
            console.log('skillEval : ',skillEval)
            if(!skillEval){
                toast.error('Erreur lors de la soumission de l\'évaluation.');
            }else{
                toast.success('Évalution soumise avec succès.');
            }
            handleLessonEvalSubmitted(skillEval);
        },
        onError : () => toast.error('Erreur lors de l\'enregistrement de l\'èvaluation.'),
    })

    function handleLessonEvalSubmitted(skillEval : SkillEvalEntry | null){
        queryClient.setQueryData<SkillEvalEntry| null>(queryKey, skillEval)
    }

    if(isLoading) return <SkillEvalSkeletonCard/>
    if(isError) return <SkillEvalErrorCard/>

    console.log('skillEval cache : ', skillEval);

  return (
    <SkillEvalForm
        key = {params.studentId}
        skillEval = {skillEval ?? null}
        isPending = {submitMutation.isPending}
        onSubmit = {(data) => submitMutation.mutate(data)}
    />
  )
}

export default SkillEvalCard