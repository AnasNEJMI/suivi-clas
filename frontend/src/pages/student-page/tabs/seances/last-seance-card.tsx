import type { BilanEntry, QcmEntry } from '@/api/student/apiCalls'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator';
import { CARD_STYLES, type Subject } from '@/lib/types/data.types';
import { cn, getCongralutoryMessage, getElapsedDays } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {CalendarIcon, CalendarX2Icon, ClockIcon, MessageCircleQuestionIcon,TrophyIcon,} from 'lucide-react';
import SeanceDetailsDrawer from './seance-details-drawer';
import QcmResultsQuestionnaire from '../../bilans/qcm-results-questionnaire';
import QcmQuestionnaire from '../../bilans/qcm-questionnaire';
import { Button } from '@/components/ui/button';
import { BrandButton } from '@/components/brand-button';


const LastSeanceCard = ({bilans, onQcmSubmit} : {bilans : BilanEntry[], onQcmSubmit : (qcm: QcmEntry) => void}) => {    
    if(bilans.length === 0){
        return (
            <div className='mt-6'>
                <h3 className='font-semibold text-lg lg:text-xl text-zinc-900'>Dernière séance</h3>
                <Card className='border-none h-72 flex flex-col items-center justify-center w-full rounded-xl bg-zinc-200/20 shadow-sm mt-4 p-4'>
                    <CardHeader className='flex flex-col items-center justify-center w-full'>
                        <CalendarX2Icon className='size-12'/>
                        <CardTitle className='text-lg font-medium'>Aucune séance récente</CardTitle>
                        <CardDescription className='text-balance max-w-md text-center'>Aucune séance n'a encore eu lieu, cette page sera mise à jour dès la première séance de l'année.</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        )
    }

    const recentBilan = bilans[0];
    
    if(!recentBilan.presence || !recentBilan.lesson){
        return (
            <div className='mt-6'>
                <h3 className='font-semibold text-lg lg:text-xl text-zinc-900'>Dernière séance</h3>
                <Card className=' flex flex-col items-start justify-start w-full rounded-xl bg-red-50 border-red-400 shadow-sm mt-4'>
                    <CardHeader className='flex flex-col gap-6 justify-center w-full h-full'>
                        <div className='flex items-center justify-between w-full'>
                            <div className='flex gap-2'>
                                <CalendarX2Icon className='size-8 text-red-500'/>
                                <CardTitle className='text-xl font-semibold tracking-tight text-end text-red-500'>Absence</CardTitle>
                            </div>
                            <span className='px-2 rounded-full bg-red-500 text-white text-base font-medium'>{format(recentBilan.date, 'd/MM/y', {locale : fr})}</span>
                        </div>
                        <CardDescription className='text-zinc-900'>Vous n'avez pas assisté à cette séance, nous avons hâte de vous revoir très prochainement.</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <div className='flex gap-2'>
                            <div className='w-10 h-10 rounded-full bg-red-300 flex items-center justify-center font-bold text-xl'>
                                {recentBilan.submittedBy.firstName.slice(0,1)}
                            </div>
                            <div className='flex flex-col'>
                                <p className='tracking-tight'>Avec <span className='font-bold'>{recentBilan.submittedBy.firstName} {recentBilan.submittedBy.lastName}</span></p>
                                <p className='text-sm opacity-75 leading-4 tracking-tight flex items-center justify-start gap-2'><span className='flex items-center justify-center gap-1'><CalendarIcon className='size-4'/> {format(recentBilan.date, 'd/MM/y', {locale : fr})}</span> · <span className='flex items-center justify-center gap-1'><ClockIcon className='size-4'/> {recentBilan.seance.seanceDuration.label}</span></p>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        )
    }
    const cardStyle = CARD_STYLES[recentBilan.lesson!.subject.label as Subject];

    
    
  return (
    <div className='mt-6'>
        <h3 className='font-semibold text-lg lg:text-xl text-zinc-900'>Dernière séance</h3>
        <div className='w-full flex flex-col lg:flex-row mt-4 rounded-xl overflow-hidden shadow-card'>
            <Card 
                className={cn(
                    'border-none shadow-none font-outfit flex flex-col items-start justify-start flex-2/3 rounded-none md:pt-4',
                    cardStyle.bgColor
                )}
            >
                <CardHeader className='flex flex-col items-center justify-start w-full'>
                    <div className='flex gap-2 w-full'>
                        <cardStyle.icon className={cn('size-12 p-3 rounded-xl', cardStyle.iconBgColor, cardStyle.highlightTextColor)}/>
                        <div className='flex flex-col w-full'>
                            <div className='flex items-start justify-between w-full'>
                                <span className={cn('font-bold tracking-tight uppercase text-sm',cardStyle.highlightTextColor)}>{cardStyle.label}</span>
                                <span className={cn(' px-2 rounded-full font-medium border tracking-tight text-sm', cardStyle.borderColor, cardStyle.iconBgColor, cardStyle.highlightTextColor)}>{getElapsedDays(recentBilan.date)}</span>
                            </div>
                            <CardTitle className='text-xl lg:text-2xl font-semibold'>{recentBilan.lesson.label}</CardTitle>
                        </div>
                    </div>
                    <CardDescription className='text-start line-clamp-3 w-full text-zinc-900 mt-2'>{recentBilan.summary}</CardDescription>
                </CardHeader>
                <CardFooter className='flex items-start justify-between w-full'>
                    <div className='flex gap-2'>
                        <div className={cn('w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl', cardStyle.iconBgColor, cardStyle.highlightTextColor)}>
                            {recentBilan.submittedBy.firstName.slice(0,1)}
                        </div>
                        <div className='flex flex-col'>
                            <p className='tracking-tight'>Avec <span className='font-bold'>{recentBilan.submittedBy.firstName} {recentBilan.submittedBy.lastName}</span></p>
                            <p className='text-sm opacity-75 leading-4 tracking-tight flex items-center justify-start gap-2'><span className='flex items-center justify-center gap-1'><CalendarIcon className='size-4'/> {format(recentBilan.date, 'd/MM/y', {locale : fr})}</span> <span className='flex items-center justify-center gap-1'><ClockIcon className='size-4'/> {recentBilan.seance.seanceDuration.label}</span></p>
                        </div>
                    </div>
                    <SeanceDetailsDrawer onQcmSubmit={onQcmSubmit} bilan={recentBilan} cardStyle={cardStyle}>     
                        <Button className='h-10 font-outfit text-base'>Details</Button>
                    </SeanceDetailsDrawer>
                </CardFooter>
            </Card>
            <div className='py-0 lg:py-4'>
                <Separator orientation='vertical'/>
            </div>
            <Card className='border-none shadow-none gap-0 flex flex-col items-center justify-between flex-1/3 rounded-none bg-white p-4'>
                <div className='flex items-center justify-between w-full'>
                    <div className='flex w-full gap-2'><MessageCircleQuestionIcon/><span className='tracking-tight text-lg font-semibold'>Qcm</span></div>
                    {recentBilan.qcm && recentBilan.qcm.completed && <span className='bg-emerald-200 border border-emerald-500 rounded-full text-sm px-2 text-emerald-700'>Complété</span>}
                    {recentBilan.qcm && !recentBilan.qcm.completed && <span className='bg-red-200 border border-red-500 rounded-full text-sm px-2 capitalize text-nowrap text-red-700'>à faire</span>}
                </div>
                {recentBilan.qcm && recentBilan.qcm.completed &&
                    <>
                        <p className='mt-2 opacity-75 text-start w-full'>Tu peux consulter les réponses aux questions.</p>
                        <div className='p-4 mt-4 rounded-lg bg-emerald-200 mb-auto'>
                            <div className='flex items-center justify-center gap-2'>
                                <TrophyIcon className='size-8'/>
                                <div className='text-2xl tracking-tight font-bold'>
                                    <span>{recentBilan.qcm.score}/{recentBilan.qcm.qcmQuestions.length}</span>
                                </div>
                            </div>
                            <p className='text-sm tracking-normal font-light text-balance text-center mt-2'>{getCongralutoryMessage(recentBilan.qcm.score)}</p>
                        </div>
                        <QcmResultsQuestionnaire qcm={recentBilan.qcm!}>
                            <BrandButton className='w-full mt-4 text-base h-12'>Voir les résultats</BrandButton>
                        </QcmResultsQuestionnaire>
                    </>
                }
                {
                    recentBilan.qcm && !recentBilan.qcm.completed &&
                    <>
                        <p className='mt-2 opacity-75 w-full text-start'>Vous avez un QCM à compléter suite à cette séance.</p>
                        <QcmQuestionnaire onQcmSubmit={onQcmSubmit} qcm={recentBilan.qcm!}>
                            <BrandButton className='w-full mt-4 text-base h-12'>Compléter le QCM</BrandButton>
                        </QcmQuestionnaire>
                    </>
                }
                {
                    !recentBilan.qcm &&
                    <>
                        <p className='mt-2 opacity-75 w-full text-start'>Vous n'avez pas de QCM à compléter suite à cette séance.</p>
                    </>
                }
            </Card>
        </div>
    </div>
  )
}

export default LastSeanceCard