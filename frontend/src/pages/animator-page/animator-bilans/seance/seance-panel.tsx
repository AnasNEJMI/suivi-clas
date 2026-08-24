import { animatorApiCalls } from '@/api/animator/apiCalls'
import { animatorKeys } from '@/api/animator/query-keys'
import type {LessonsByLevelEntry, SeanceBilanEntry, SeanceDurationEntry, SeanceEntry, SeanceQueryParams,} from '@/api/animator/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import SeanceStatusCards from './cards/seance-status-cards'
import BilansSection from '../bilan/bilans-section'
import { useState } from 'react'

interface BilansFormProps{
  params: SeanceQueryParams,
  lessonsByLevel: LessonsByLevelEntry[],
  seanceDurations : SeanceDurationEntry[]
}

const SeancePanel = ({
  params,
  lessonsByLevel,
  seanceDurations
} : BilansFormProps) => {
  
  const queryClient = useQueryClient();
  const queryKey = animatorKeys.seance(params);

   const [selectedDurationId, setSelectedDurationId] = useState<number>(
    seanceDurations[0]?.id ?? 0
  )

  const {data : seance, isLoading, isError} = useQuery({
    queryKey,
    queryFn : () => animatorApiCalls.fetchSeance(params),
    staleTime : 0,
    gcTime : 45 * 60 * 1000
  })

  const submitMutation = useMutation({
    mutationFn : () => animatorApiCalls.submitSeance({...params, seanceDurationId : selectedDurationId}),
    onSuccess : () => {
      queryClient.invalidateQueries({queryKey});
      toast.success('Séance enregistrée avec succès.');
    },
    onError : () => toast.error('Erreur lors de l\'enregistrement de la séance.'),
  })
  
  const deleteMutation = useMutation({
    mutationFn : () => animatorApiCalls.deleteSeance(params),
    onSuccess : () => {
      queryClient.setQueryData(queryKey, null);
      toast.success('Séance supprimée avec succès.');
    },
    onError : () => toast.error('Erreur lors de la suppression de la séance.'),
  })

  function handleBilanSubmitted(studentId : number, bilan : SeanceBilanEntry){
    queryClient.setQueryData<SeanceEntry | null>(queryKey, (prev) => 
      prev 
      ? {
        ...prev,
        students : prev.students.map(s => 
          s.id === studentId ? {...s, bilan} : s
        ),
      }
      : null
    )
  }

  return (
    <>
      <SeanceStatusCards
        seance = {seance ?? null}
        seanceDurations = {seanceDurations}
        selectedDurationId={selectedDurationId}
        onDurationChange={setSelectedDurationId}
        isLoading = {isLoading}
        isError = {isError}
        isSubmitting = {submitMutation.isPending}
        isDeleting = {deleteMutation.isPending}
        onSubmit = {submitMutation.mutate}
        onDelete = {() => deleteMutation.mutate()}
        />
      {
        !isLoading && seance &&
        <BilansSection
          seance = {seance ?? null}
          animatorId = {params.animatorId}
          lessonsByLevel = {lessonsByLevel}
          onBilanSubmitted = {handleBilanSubmitted}  
        />
      }
    </>
  )
}

export default SeancePanel