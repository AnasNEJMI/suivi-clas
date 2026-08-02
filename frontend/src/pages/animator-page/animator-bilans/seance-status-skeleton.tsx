import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
const SeanceStatusSkeleton = () => {
  return (
    <Card className='font-outfit border-none shadow-card'>
        <CardHeader>
            <CardTitle><div className='w-60 h-7 rounded-lg bg-zinc-200 animate-pulse' /></CardTitle>
            <CardDescription className='flex flex-col gap-2 mt-4'>
                <div className='w-full h-8 rounded-lg bg-zinc-200 animate-pulse' />
                <div className='w-3/4 h-8 rounded-lg bg-zinc-200 animate-pulse' />
            </CardDescription>
        </CardHeader>
    </Card>
)
}

export default SeanceStatusSkeleton