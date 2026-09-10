import { Card, CardContent } from '@/components/ui/card'
import { CircleXIcon } from 'lucide-react'

const SectionError = ({desc} : {desc : string}) => {
  return (
    <Card className='font-outfit border-none shadow-card border-red-200 w-full max-w-7xl mt-16'>
        <CardContent className='mt-0'>
            <p className='text-red-600 text-base flex flex-col gap-2 items-center justify-center py-6 text-center'>
              <CircleXIcon size={48}/>
                Erreur lors du chargement {desc}. Veuillez rafraîchir la page.
            </p>
        </CardContent>
    </Card>
  )
}

export default SectionError