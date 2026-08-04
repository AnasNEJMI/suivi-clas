import type { SeanceEntry } from '@/api/animator/types'
import SeanceStatusSkeletonCard from './seance-status-skeleton-card'
import SeanceStatusErrorCard from './seance-status-error-card'
import SeanceExistsCard from './seance-exists-card'
import SeanceNotFoundCard from './seance-not-found-card'

interface SeanceStatusCardsProps {
  seance:      SeanceEntry | null
  isLoading:   boolean
  isError:     boolean
  isSubmitting: boolean
  isDeleting:  boolean
  onSubmit:    () => void
  onDelete:    () => void
}

const SeanceStatusCards = ({
  seance,
  isLoading,
  isError,
  isSubmitting,
  isDeleting,
  onSubmit,
  onDelete,
} : SeanceStatusCardsProps) => {
  
  if (isLoading || isSubmitting || isDeleting) return <SeanceStatusSkeletonCard/>
  if (isError) return <SeanceStatusErrorCard/>
  if (seance) return <SeanceExistsCard onDelete = {onDelete} isDeleting = {isDeleting}/>
  return <SeanceNotFoundCard onSubmit = {onSubmit} isSubmitting = {isSubmitting}/>

}

export default SeanceStatusCards