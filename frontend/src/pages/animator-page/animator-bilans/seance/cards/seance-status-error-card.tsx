import { Card, CardContent } from '@/components/ui/card'

const SeanceStatusErrorCard = () => {
  return (
    <Card className='font-outfit border-none shadow-card border-red-200'>
        <CardContent className='pt-6'>
            <p className='text-red-600 text-sm'>
                Erreur lors du chargement de la séance. Veuillez rafraîchir la page.
            </p>
        </CardContent>
    </Card>
  )
}

export default SeanceStatusErrorCard