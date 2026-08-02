import type { SeanceEntry } from '@/api/animator/types'
import SeanceStatusSkeleton from './seance-status-skeleton'
import SeanceStatusError from './seance-status-error'
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
  
  if (isLoading || isSubmitting || isDeleting) return <SeanceStatusSkeleton/>
  if (isError) return <SeanceStatusError/>
  if (seance) return <SeanceExistsCard onDelete = {onDelete} isDeleting = {isDeleting}/>
  return <SeanceNotFoundCard onSubmit = {onSubmit} isSubmitting = {isSubmitting}/>

}

export default SeanceStatusCards