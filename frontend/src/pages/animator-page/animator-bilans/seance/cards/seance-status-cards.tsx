import type { SeanceDurationEntry, SeanceEntry } from '@/api/animator/types'
import SeanceStatusSkeletonCard from './seance-status-skeleton-card'
import SeanceStatusErrorCard from './seance-status-error-card'
import SeanceExistsCard from './seance-exists-card'
import SeanceNotFoundCard from './seance-not-found-card'

interface SeanceStatusCardsProps {
  seance:      SeanceEntry | null,
  seanceDurations : SeanceDurationEntry[],
  selectedDurationId: number
  onDurationChange:   (id: number) => void
  isLoading:   boolean
  isError:     boolean
  isSubmitting: boolean
  isDeleting:  boolean
  onSubmit:    () => void
  onDelete:    () => void
}

const SeanceStatusCards = ({
  seance,
  seanceDurations,
  selectedDurationId,
  onDurationChange,
  isLoading,
  isError,
  isSubmitting,
  isDeleting,
  onSubmit,
  onDelete,
} : SeanceStatusCardsProps) => {
  
  if (isLoading || isSubmitting || isDeleting) return <SeanceStatusSkeletonCard/>
  if (isError) return <SeanceStatusErrorCard/>
  if (seance) return <SeanceExistsCard seance = {seance} onDelete = {onDelete} isDeleting = {isDeleting}/>
  return <SeanceNotFoundCard 
            selectedDurationId={selectedDurationId}
            onDurationChange={onDurationChange}
            seanceDurations ={seanceDurations}
            onSubmit = {onSubmit}
            isSubmitting = {isSubmitting}/>

}

export default SeanceStatusCards