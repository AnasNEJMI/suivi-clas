import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const NoQcmsCard = () => {
  return (
    <Card className='font-outfit border-none shadow-card'>
        <CardHeader>
            <CardTitle className='flex items-center gap-2'>
                <span className='text-xl lg:text-2xl'>Récapitulatif</span>
            </CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-6'>
            <p>Aucun QCM n'a encore été enregistré.</p>
        </CardContent>
    </Card>
  )
}

export default NoQcmsCard