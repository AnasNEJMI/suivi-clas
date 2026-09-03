import type { BilanEntry } from '@/api/student/apiCalls'
import { BrandButton } from '@/components/brand-button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';
import type { Subject } from '@/lib/types/data.types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { AtomIcon, CalendarIcon, CalendarX2Icon, LandmarkIcon, LanguagesIcon, LeafIcon, PiIcon,TrophyIcon,type LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

const CARD_STYLES : Record<Subject, {label : string, bgColor : string, highlightTextColor : string, icon : ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>}> = {
    'Anglais' : {
        label : 'Anglais',
        bgColor : 'bg-taupe-200',
        highlightTextColor : 'text-taupe-600',
        icon : LanguagesIcon
    },
    'Français' : {
        label : 'Français',
        bgColor : 'bg-violet-200',
        highlightTextColor : 'text-violet-600',
        icon : LanguagesIcon
    },
    'Histoire-Géographie' : {
        label : 'Histoire/Géo',
        bgColor : 'bg-emerald-200',
        highlightTextColor : 'text-red-600',
        icon : LandmarkIcon
    },
    'Mathématiques' : {
        label : 'Maths',
        bgColor : 'bg-blue-100/75',
        highlightTextColor : 'text-blue-500',
        icon : PiIcon
    },
    'Physique-Chimie' : {
        label : 'Physique/Chimie',
        bgColor : 'bg-amber-200',
        highlightTextColor : 'text-amber-600',
        icon : AtomIcon
    },
    'Sciences de la Vie et de la Terre' : {
        label : 'SVT',
        bgColor : 'bg-emerald-200',
        highlightTextColor : 'text-emerald-600',
        icon : LeafIcon
    }
}
const LastSeanceCard = ({bilans} : {bilans : BilanEntry[]}) => {
    const isMobile = useIsMobile();
    
    if(bilans.length === 0){
        return (
            <div className='mt-6'>
                <h3 className='font-bold text-xl opacity-80'>Dernière séance</h3>
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
                <h3 className='font-bold text-xl opacity-80'>Dernière séance</h3>
                <Card className=' flex flex-col items-start justify-start w-full rounded-xl bg-white border-red-400 shadow-sm mt-4'>
                    <CardHeader className='flex flex-col gap-6 justify-center w-full h-full'>
                        <div className='flex items-center justify-between w-full'>
                            <div className='flex gap-2'>
                                <CalendarIcon className='size-8 text-red-500'/>
                                <CardTitle className='text-2xl font-medium text-end text-red-500'>Absence</CardTitle>
                            </div>
                            <span className='px-2 rounded-full bg-red-500 text-white text-base font-medium'>{format(recentBilan.date, 'd/MM/y', {locale : fr})}</span>
                        </div>
                        <CardDescription className='text-zinc-900'>Vous n'avez pas assistez à cette séance, nous avons hâte de vous revoir très prochainement.</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <div className='flex gap-2'>
                            <div className='w-16 h-16 rounded-full bg-red-300 flex items-center justify-center font-bold text-xl'>
                                {recentBilan.submittedBy.firstName.slice(0,1)}
                            </div>
                            <div className='flex flex-col'>
                                <p className=''>Avec <span className='font-bold'>{recentBilan.submittedBy.firstName} {recentBilan.submittedBy.lastName}</span></p>
                                <span className='text-sm opacity-75'>Le {format(recentBilan.date, 'd/MM/y', {locale : fr})}</span>
                                <span className='text-sm opacity-75'>{recentBilan.seanceId}</span>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        )
    }
    const cardStyle = CARD_STYLES[recentBilan.lesson!.subject.label as Subject];

    const getElapsedDays = (date : Date) => {
        console.log("date ", date);
        const targetDate = new Date(date);
        const now = new Date();

        const targetMidnight = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
        const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        const diffInMs = todayMidnight.getTime() - targetMidnight.getTime();
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) {
            return "Aujourd'hui";
        }

        if (diffInDays === 1) {
            return "Hier";
        }

        if (diffInDays >= 2 && diffInDays <= 6) {
            return `Il y a ${diffInDays} jours`;
        }

        return targetDate.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }
    
  return (
    <div className='mt-6'>
        <h3 className='font-semibold text-lg lg:text-xl text-zinc-900'>Dernière séance</h3>
        <div className='w-full flex flex-col lg:flex-row mt-4 rounded-xl overflow-hidden shadow-card'>
            <Card 
                className={cn(
                    'border-none shadow-none  flex flex-col items-start justify-start flex-2/3 rounded-none md:pt-4',
                    cardStyle.bgColor
                )}
            >
                <CardHeader className='flex flex-col items-center justify-start w-full'>
                    <div className='flex gap-2 w-full'>
                        <cardStyle.icon className={cn('size-12 bg-blue-200/60 p-3 rounded-xl',cardStyle.highlightTextColor)}/>
                        <div className='flex flex-col w-full'>
                            <div className='flex items-start justify-between w-full'>
                                <span className={cn('font-bold tracking-tight uppercase text-sm',cardStyle.highlightTextColor)}>{cardStyle.label}</span>
                                <span className={cn('bg-blue-200/60 px-2 rounded-full font-medium border border-blue-300 tracking-tight text-sm', cardStyle.highlightTextColor)}>{getElapsedDays(recentBilan.date)}</span>
                            </div>
                            <CardTitle className='text-xl lg:text-2xl font-semibold'>{recentBilan.lesson.label}</CardTitle>
                        </div>
                    </div>
                    <CardDescription className='text-start line-clamp-3 w-full text-zinc-900 mt-2'>{recentBilan.summary}</CardDescription>
                </CardHeader>
                <CardFooter className='flex items-start justify-between w-full'>
                    <div className='flex gap-2'>
                        <div className={cn('w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center font-bold text-xl', cardStyle.highlightTextColor)}>
                            {recentBilan.submittedBy.firstName.slice(0,1)}
                        </div>
                        <div className='flex flex-col'>
                            <p className='tracking-tight'>Avec <span className='font-bold'>{recentBilan.submittedBy.firstName} {recentBilan.submittedBy.lastName}</span></p>
                            <span className='text-sm opacity-75 leading-4 tracking-tight'>{format(recentBilan.date, 'd/MM/y', {locale : fr})} - {recentBilan.seanceId}</span>
                        </div>
                    </div>
                    <BrandButton variant={'outline'} className='h-10'>Details</BrandButton>
                </CardFooter>
            </Card>
            <div className='py-0 lg:py-4'>
                <Separator orientation='vertical'/>
            </div>
            <Card className='border-none shadow-none flex flex-col items-center justify-center flex-1/3 rounded-none bg-white p-4'>
                {
                    !recentBilan.qcm &&
                    <CardHeader className='flex flex-col items-center justify-center w-full pt-2 lg:pt-0'>
                        <CardTitle className='text-lg font-medium text-center'>Vous n'avez pas de QCM pour cette séance</CardTitle>
                        <CardDescription className='text-balance max-w-md text-center'>Préparez en revoyant les exercices travaillés pendant la séance.</CardDescription>
                    </CardHeader>
                }
                {
                    recentBilan.qcm && !recentBilan.qcm.completed &&
                    <CardHeader className='flex flex-col items-center justify-center w-full pt-2 lg:pt-0 '>
                        <span className='font-bold text-sm uppercase opacity-75'>à faire</span>
                        <CardTitle className='text-xl font-medium text-center'>Testez vos connaissances !</CardTitle>
                        <CardDescription className='text-balance max-w-md text-center'>Vous avez un QCM à compléter pour la prochaine séance.</CardDescription>
                        <BrandButton className='mt-4 h-10'>Compléter le QCM</BrandButton>
                    </CardHeader>
                }
                {
                    recentBilan.qcm && recentBilan.qcm.completed &&
                    <CardHeader className='flex flex-col items-center justify-center w-full pt-2 lg:pt-0 '>
                        <span className='font-bold text-sm uppercase'>Résultat du QCM</span>
                        <CardTitle className='text-lg font-medium text-center bg-emerald-200 rounded-md py-2 px-3 flex items-center justify-center gap-2'>
                            <TrophyIcon className='size-6 text-amber-600'/>
                            <span className='font-bold text-2xl'>{recentBilan.qcm.score!}/{recentBilan.qcm.qcmQuestions.length}</span>
                        </CardTitle>
                        <CardDescription className='text-pretty max-w-md text-center'>Tu peux consulter les réponses aux questions.</CardDescription>
                        <BrandButton  className='mt-4 h-10'>Voir les réponses</BrandButton>
                    </CardHeader>
                }
            </Card>
        </div>
    </div>
  )
}

export default LastSeanceCard