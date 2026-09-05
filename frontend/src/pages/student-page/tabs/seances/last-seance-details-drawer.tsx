import type { BilanEntry, QcmEntry } from '@/api/student/apiCalls'
import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Drawer, DrawerClose, DrawerContent,DrawerDescription,DrawerHeader,DrawerTitle,DrawerTrigger } from '@/components/ui/drawer'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn, getCongralutoryMessage } from '@/lib/utils'
import { ArrowLeftIcon, BookOpenIcon, CalendarIcon, ClockIcon, LibraryBigIcon, MessageCircleQuestionIcon, NotebookPenIcon, TrophyIcon, UserIcon} from 'lucide-react'
import type { CardStyle } from './last-seance-card'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Separator } from '@/components/ui/separator'
import QcmResultsQuestionnaire from '../../bilans/qcm-results-questionnaire'
import QcmQuestionnaire from '../../bilans/qcm-questionnaire'

const LastSeanceDetailsDrawer = ({bilan, cardStyle, onQcmSubmit} : {bilan : BilanEntry, cardStyle : CardStyle, onQcmSubmit : (qcm: QcmEntry) => void}) => {
    const isMobile = useIsMobile();

    
  return (
    <Drawer direction={isMobile? 'left' : 'right'}>
        <DrawerTrigger asChild>
            <Button className='h-10 font-outfit text-base'>Details</Button>
        </DrawerTrigger>
        <DrawerContent className='h-dvh pl-4 pr-2 pb-2 font-outfit shadow-none border-none bg-zinc-100 md:rounded-t-xl'>
            <DrawerHeader className='flex'>
                <DrawerClose asChild>
                    <Button variant={'ghost'} className='w-fit h-12 opacity-75'><ArrowLeftIcon className='size-6'/> <span>Retour à l'historique</span></Button>
                </DrawerClose>
                <DrawerDescription>Séance du <span>{(new Date(bilan.date)).toLocaleDateString('fr-FR', {day: '2-digit',month: '2-digit',year: 'numeric',})}</span></DrawerDescription>
                <DrawerTitle className='font-bold text-xl  md:text-3xl tracking-tight'>Résumé de la séance</DrawerTitle>
            </DrawerHeader>
            <div className="brand-v-scrollbar overflow-x-hidden overflow-y-auto px-4">
                <Card 
                    className={cn(
                        'border-none shadow-none  rounded-2xl flex flex-col lg:flex-row items-start justify-start lg:justify-between mt-6',
                        cardStyle.bgColor
                    )}
                >
                    <CardHeader className='flex flex-col items-center justify-start w-full'>
                        <div className='flex gap-2 w-full'>
                            <cardStyle.icon className={cn('size-12 p-3 rounded-xl', cardStyle.iconBgColor, cardStyle.highlightTextColor)}/>
                            <div className='flex flex-col w-full'>
                                <div className='flex items-start justify-between w-full'>
                                    <span className={cn('font-bold tracking-tight uppercase text-sm',cardStyle.highlightTextColor)}>{cardStyle.label}</span>
                                </div>
                                <CardTitle className='text-xl lg:text-2xl font-semibold'>{bilan.lesson!.label}</CardTitle>
                            </div>
                        </div>
                    </CardHeader>
                    <CardFooter className='flex items-start justify-between w-full'>
                        <div className='flex gap-2'>
                            <div className={cn('w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-xl', cardStyle.iconBgColor, cardStyle.highlightTextColor)}>
                                {bilan.submittedBy.firstName.slice(0,1)}
                            </div>
                            <div className='flex flex-col justify-between'>
                                <p className='tracking-tight text-base lg:text-lg'>Avec <span className='font-bold'>{bilan.submittedBy.firstName} {bilan.submittedBy.lastName}</span></p>
                                <p className='text-sm opacity-75 leading-4 tracking-tight flex items-center justify-start gap-2'><span className='flex items-center justify-center gap-1'><CalendarIcon className='size-4'/> {format(bilan.date, 'd/MM/y', {locale : fr})}</span> · <span className='flex items-center justify-center gap-1'><ClockIcon className='size-4'/> {bilan.seance.seanceDuration.label}</span></p>
                            </div>
                        </div>
                    </CardFooter>
                </Card>

                <div className='flex gap-4 flex-col lg:flex-row mt-4 pb-4'>
                    <div className='flex-2/3 h-fit rounded-2xl bg-white p-4'>
                        <div className='flex gap-2'><NotebookPenIcon/><span className='tracking-tight text-lg font-semibold'>Bilan de la séance</span></div>
                        <p className='text-sm opacity-75 leading-4'>Les commentaires de {bilan.submittedBy.firstName}</p>
                        <p className='mt-4'>{bilan.summary}</p>
                    </div>
                    <div className='flex-1/3 flex flex-col gap-4 min-w-xs'>
                        <div className='flex flex-col bg-white rounded-2xl p-4'>
                            <div className='flex items-center justify-between'>
                                <div className='flex w-full gap-2'><MessageCircleQuestionIcon/><span className='tracking-tight text-lg font-semibold'>Qcm</span></div>
                                {bilan.qcm && bilan.qcm.completed && <span className='bg-emerald-200 border border-emerald-500 rounded-full text-sm px-2 text-emerald-700'>Complété</span>}
                                {bilan.qcm && !bilan.qcm.completed && <span className='bg-red-200 border border-red-500 rounded-full text-sm px-2 capitalize text-nowrap text-red-700'>à faire</span>}
                            </div>
                            {bilan.qcm && bilan.qcm.completed &&
                                <>
                                    <p className='mt-4 opacity-75'>Tu peux consulter les réponses aux questions.</p>
                                    <div className='p-4 mt-4 mb-2 rounded-lg bg-emerald-200'>
                                        <div className='flex items-center justify-center gap-2'>
                                            <TrophyIcon className='size-10'/>
                                            <div className='text-3xl tracking-tight font-bold'>
                                                <span>{bilan.qcm.score}/{bilan.qcm.qcmQuestions.length}</span>
                                            </div>
                                        </div>
                                        <p className='text-sm tracking-normal font-light text-balance text-center mt-2'>{getCongralutoryMessage(bilan.qcm.score)}</p>
                                    </div>
                                    <QcmResultsQuestionnaire qcm={bilan.qcm!}/>
                                </>
                            }
                            {
                                bilan.qcm && !bilan.qcm.completed &&
                                <>
                                    <p className='mt-4 opacity-75'>Vous avez un QCM à compléter suite à cette séance.</p>
                                    <QcmQuestionnaire onQcmSubmit={onQcmSubmit} qcm={bilan.qcm!}/>
                                </>
                            }
                            {
                                !bilan.qcm &&
                                <>
                                    <p className='mt-4 opacity-75'>Vous n'avez pas de QCM à compléter suite à cette séance.</p>
                                </>
                            }
                        </div>
                        <div className='flex flex-col bg-white rounded-2xl p-4'>
                            <div className='flex w-full gap-2'><NotebookPenIcon/><span className='tracking-tight text-lg font-semibold'>Détails de la séance</span></div>
                            <div className='flex items-center justify-between w-full mt-4'><span className='text-sm flex items-center gap-2 opacity-75'><CalendarIcon className='size-4'/> Date</span><span className='font-medium capitalize'>{format(bilan.date, 'PPP', {locale : fr})}</span></div>
                            <div className='flex items-center justify-between w-full mt-2'><span className='text-sm flex items-center gap-2 opacity-75'><ClockIcon className='size-4'/> Durée</span><span className='font-medium capitalize'>{bilan.seance.seanceDuration.label}</span></div>
                            <div className='flex items-center justify-between w-full mt-2'><span className='text-sm flex items-center gap-2 opacity-75'><LibraryBigIcon className='size-4'/> Matière</span><span className='font-medium capitalize'>{cardStyle.label}</span></div>
                            <div className='flex items-center justify-between w-full mt-2'><span className='text-sm flex items-center gap-2 opacity-75'><BookOpenIcon className='size-4'/> Leçon</span><span className='font-medium capitalize'>{bilan.lesson!.label}</span></div>
                            <Separator className='my-4'/>
                            <div className='flex items-center justify-between w-full'><span className='text-sm flex items-center gap-2 opacity-75'><UserIcon className='size-4'/> Animateur(trice)</span><span className='font-medium capitalize'>{bilan.submittedBy.firstName} {bilan.submittedBy.lastName}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </DrawerContent>
    </Drawer>
  )
}

export default LastSeanceDetailsDrawer