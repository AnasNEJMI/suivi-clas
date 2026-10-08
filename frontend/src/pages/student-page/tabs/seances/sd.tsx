// import type { User } from '@/api/auth'
// import { studentApiCalls, type BilanEntry, type QcmEntry } from '@/api/student/apiCalls';
// import { studentKeys } from '@/api/student/query-keys';
// import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
// import StudentLastSeanceCard from './last-seance-card';
// import StudentSeanceHistoryCarousel from './seance-history-carousel';
// import StudentSeanceStats from './seance-stats';

// const StudentSeancesTabDataWrapper = ({student} : {student : User}) => {
//     const queryKey = studentKeys.bilans({studentId : student.id});

//     const {data : {bilans}} = useSuspenseQuery({
//         queryKey,
//         queryFn : studentApiCalls.fetchBilans,
//         staleTime : 2 * 60 * 1000
//     })

    
//     const queryClient = useQueryClient();

//     const onQcmSubmit = (updatedQcm : QcmEntry) => {
//         const storageKey = `qcm-progress-${updatedQcm.id}`;
//         localStorage.removeItem(storageKey);
        
//         console.log('cache state updated :', queryClient.getQueryData(queryKey))
//         queryClient.setQueryData<{bilans : BilanEntry[]} | undefined>(queryKey, (prev) => 
//             {
//                 console.log('prev', prev);
//                 if (!prev) return prev
//                 return {
//                     bilans: prev.bilans.map(b =>
//                     b.qcm?.id === updatedQcm.id ? { ...b, qcm: updatedQcm } : b
//                 ),
//             }
//         })

//         console.log('cache state updated :', queryClient.getQueryData(queryKey))
//     }
//   return (
//     <>
//         <StudentLastSeanceCard onQcmSubmit={onQcmSubmit} bilans = {bilans}/>
//         <StudentSeanceHistoryCarousel onQcmSubmit={onQcmSubmit} bilans = {bilans}/>
//         <StudentSeanceStats bilans = {bilans}/>
//     </>
//   )
// }

// export default StudentSeancesTabDataWrapper

// ---------------------------------------------------------------------

// import type { BilanEntry, QcmEntry } from '@/api/student/apiCalls'
// import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
// import { Separator } from '@/components/ui/separator';
// import { CARD_STYLES, type Subject } from '@/lib/types/data.types';
// import { cn, getCongralutoryMessage, getElapsedDays } from '@/lib/utils';
// import { format } from 'date-fns';
// import { fr } from 'date-fns/locale';
// import {CalendarIcon, CalendarX2Icon, ClockIcon, MessageCircleQuestionIcon,TrophyIcon,} from 'lucide-react';
// import StudentSeanceDetailsDrawer from './seance-details-drawer';
// import QcmResultsQuestionnaire from '../../bilans/qcm-results-questionnaire';
// import QcmQuestionnaire from '../../bilans/qcm-questionnaire';
// import { Button } from '@/components/ui/button';
// import { BrandButton } from '@/components/brand-button';


// const StudentLastSeanceCard = ({bilans, onQcmSubmit} : {bilans : BilanEntry[], onQcmSubmit : (qcm: QcmEntry) => void}) => {    
//     if(bilans.length === 0){
//         return (
//             <div className='mt-6'>
//                 <h3 className='font-semibold text-lg lg:text-xl text-zinc-900'>Dernière séance</h3>
//                 <Card className='border-none h-72 flex flex-col items-center justify-center w-full rounded-xl bg-zinc-200/20 shadow-sm mt-4 p-4'>
//                     <CardHeader className='flex flex-col items-center justify-center w-full'>
//                         <CalendarX2Icon className='size-12'/>
//                         <CardTitle className='text-lg font-medium'>Aucune séance récente</CardTitle>
//                         <CardDescription className='text-balance max-w-md text-center'>Aucune séance n'a encore eu lieu, cette page sera mise à jour dès la première séance de l'année.</CardDescription>
//                     </CardHeader>
//                 </Card>
//             </div>
//         )
//     }

//     const recentBilan = bilans[0];
    
//     if(!recentBilan.presence || !recentBilan.lesson){
//         return (
//             <div className='mt-6'>
//                 <h3 className='font-semibold text-lg lg:text-xl text-zinc-900'>Dernière séance</h3>
//                 <Card className=' flex flex-col items-start justify-start w-full rounded-xl bg-red-50 border-red-400 shadow-sm mt-4'>
//                     <CardHeader className='flex flex-col gap-6 justify-center w-full h-full'>
//                         <div className='flex items-center justify-between w-full'>
//                             <div className='flex gap-2'>
//                                 <CalendarX2Icon className='size-8 text-red-500'/>
//                                 <CardTitle className='text-xl font-semibold tracking-tight text-end text-red-500'>Absence</CardTitle>
//                             </div>
//                             <span className='px-2 rounded-full bg-red-500 text-white text-base font-medium'>{format(recentBilan.date, 'd/MM/y', {locale : fr})}</span>
//                         </div>
//                         <CardDescription className='text-zinc-900'>Vous n'avez pas assisté à cette séance, nous avons hâte de vous revoir très prochainement.</CardDescription>
//                     </CardHeader>
//                     <CardFooter>
//                         <div className='flex gap-2'>
//                             <div className='w-10 h-10 rounded-full bg-red-300 flex items-center justify-center font-bold text-xl'>
//                                 {recentBilan.submittedBy.firstName.slice(0,1)}
//                             </div>
//                             <div className='flex flex-col'>
//                                 <p className='tracking-tight'>Avec <span className='font-bold'>{recentBilan.submittedBy.firstName} {recentBilan.submittedBy.lastName}</span></p>
//                                 <p className='text-sm opacity-75 leading-4 tracking-tight flex items-center justify-start gap-2'><span className='flex items-center justify-center gap-1'><CalendarIcon className='size-4'/> {format(recentBilan.date, 'd/MM/y', {locale : fr})}</span> · <span className='flex items-center justify-center gap-1'><ClockIcon className='size-4'/> {recentBilan.seance.seanceDuration.label}</span></p>
//                             </div>
//                         </div>
//                     </CardFooter>
//                 </Card>
//             </div>
//         )
//     }
//     const cardStyle = CARD_STYLES[recentBilan.lesson!.subject.label as Subject];

    
    
//   return (
//     <div className='mt-6'>
//         <h3 className='font-semibold text-lg lg:text-xl text-zinc-900'>Dernière séance</h3>
//         <div className='w-full flex flex-col lg:flex-row mt-4 rounded-xl overflow-hidden shadow-card'>
//             <Card 
//                 className={cn(
//                     'border-none shadow-none font-outfit flex flex-col items-start justify-start flex-2/3 rounded-none md:pt-4',
//                     cardStyle.bgColor
//                 )}
//             >
//                 <CardHeader className='flex flex-col items-center justify-start w-full'>
//                     <div className='flex gap-2 w-full'>
//                         <cardStyle.icon className={cn('size-12 p-3 rounded-xl', cardStyle.iconBgColor, cardStyle.highlightTextColor)}/>
//                         <div className='flex flex-col w-full'>
//                             <div className='flex items-start justify-between w-full'>
//                                 <span className={cn('font-bold tracking-tight uppercase text-sm',cardStyle.highlightTextColor)}>{cardStyle.label}</span>
//                                 <span className={cn(' px-2 rounded-full font-medium border tracking-tight text-sm', cardStyle.borderColor, cardStyle.iconBgColor, cardStyle.highlightTextColor)}>{getElapsedDays(recentBilan.date)}</span>
//                             </div>
//                             <CardTitle className='text-xl lg:text-2xl font-semibold'>{recentBilan.lesson.label}</CardTitle>
//                         </div>
//                     </div>
//                     <CardDescription className='text-start line-clamp-3 w-full text-zinc-900 mt-2'>{recentBilan.summary}</CardDescription>
//                 </CardHeader>
//                 <CardFooter className='flex items-start justify-between w-full'>
//                     <div className='flex gap-2'>
//                         <div className={cn('w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl', cardStyle.iconBgColor, cardStyle.highlightTextColor)}>
//                             {recentBilan.submittedBy.firstName.slice(0,1)}
//                         </div>
//                         <div className='flex flex-col'>
//                             <p className='tracking-tight'>Avec <span className='font-bold'>{recentBilan.submittedBy.firstName} {recentBilan.submittedBy.lastName}</span></p>
//                             <p className='text-sm opacity-75 leading-4 tracking-tight flex items-center justify-start gap-2'><span className='flex items-center justify-center gap-1'><CalendarIcon className='size-4'/> {format(recentBilan.date, 'd/MM/y', {locale : fr})}</span> <span className='flex items-center justify-center gap-1'><ClockIcon className='size-4'/> {recentBilan.seance.seanceDuration.label}</span></p>
//                         </div>
//                     </div>
//                     <StudentSeanceDetailsDrawer onQcmSubmit={onQcmSubmit} bilan={recentBilan} cardStyle={cardStyle}>     
//                         <Button className='h-10 font-outfit text-base'>Details</Button>
//                     </StudentSeanceDetailsDrawer>
//                 </CardFooter>
//             </Card>
//             <div className='py-0 lg:py-4'>
//                 <Separator orientation='vertical'/>
//             </div>
//             <Card className='border-none shadow-none gap-0 flex flex-col items-center justify-between flex-1/3 rounded-none bg-white p-4'>
//                 <div className='flex items-center justify-between w-full'>
//                     <div className='flex w-full gap-2'><MessageCircleQuestionIcon/><span className='tracking-tight text-lg font-semibold'>Qcm</span></div>
//                     {recentBilan.qcm && recentBilan.qcm.completed && <span className='bg-emerald-200 border border-emerald-500 rounded-full text-sm px-2 text-emerald-700'>Complété</span>}
//                     {recentBilan.qcm && !recentBilan.qcm.completed && <span className='bg-red-200 border border-red-500 rounded-full text-sm px-2 capitalize text-nowrap text-red-700'>à faire</span>}
//                 </div>
//                 {recentBilan.qcm && recentBilan.qcm.completed &&
//                     <>
//                         <p className='mt-2 opacity-75 text-start w-full'>Tu peux consulter les réponses aux questions.</p>
//                         <div className='p-4 mt-4 rounded-lg bg-emerald-200 mb-auto'>
//                             <div className='flex items-center justify-center gap-2'>
//                                 <TrophyIcon className='size-8'/>
//                                 <div className='text-2xl tracking-tight font-bold'>
//                                     <span>{recentBilan.qcm.score}/{recentBilan.qcm.qcmQuestions.length}</span>
//                                 </div>
//                             </div>
//                             <p className='text-sm tracking-normal font-light text-balance text-center mt-2'>{getCongralutoryMessage(recentBilan.qcm.score)}</p>
//                         </div>
//                         <QcmResultsQuestionnaire qcm={recentBilan.qcm!}>
//                             <BrandButton className='w-full mt-4 text-base h-12'>Voir les résultats</BrandButton>
//                         </QcmResultsQuestionnaire>
//                     </>
//                 }
//                 {
//                     recentBilan.qcm && !recentBilan.qcm.completed &&
//                     <>
//                         <p className='mt-2 opacity-75 w-full text-start'>Vous avez un QCM à compléter suite à cette séance.</p>
//                         <QcmQuestionnaire onQcmSubmit={onQcmSubmit} qcm={recentBilan.qcm!}>
//                             <BrandButton className='w-full mt-4 text-base h-12'>Compléter le QCM</BrandButton>
//                         </QcmQuestionnaire>
//                     </>
//                 }
//                 {
//                     !recentBilan.qcm &&
//                     <>
//                         <p className='mt-2 opacity-75 w-full text-start'>Vous n'avez pas de QCM à compléter suite à cette séance.</p>
//                     </>
//                 }
//             </Card>
//         </div>
//     </div>
//   )
// }

// export default StudentLastSeanceCard

// ---------------------------------------------------------------------

// import type { BilanEntry, QcmEntry } from '@/api/student/apiCalls'
// import { Button } from '@/components/ui/button'
// import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
// import { Drawer, DrawerClose, DrawerContent,DrawerDescription,DrawerHeader,DrawerTitle,DrawerTrigger } from '@/components/ui/drawer'
// import { useIsMobile } from '@/hooks/use-mobile'
// import { cn, getCongralutoryMessage } from '@/lib/utils'
// import { ArrowLeftIcon, BookOpenIcon, CalendarIcon, ClockIcon, LibraryBigIcon, MessageCircleQuestionIcon, NotebookPenIcon, TrophyIcon, UserIcon} from 'lucide-react'
// import { format } from 'date-fns'
// import { fr } from 'date-fns/locale'
// import { Separator } from '@/components/ui/separator'
// import QcmResultsQuestionnaire from '../../bilans/qcm-results-questionnaire'
// import QcmQuestionnaire from '../../bilans/qcm-questionnaire'
// import type { CardStyle } from '@/lib/types/data.types'
// import { BrandButton } from '@/components/brand-button'

// const StudentSeanceDetailsDrawer = ({bilan, cardStyle, onQcmSubmit, children} : {bilan : BilanEntry, cardStyle : CardStyle, onQcmSubmit : (qcm: QcmEntry) => void, children : React.ReactNode}) => {
//     const isMobile = useIsMobile();

//   return (
//     <Drawer direction={isMobile? 'left' : 'right'}>
//         <DrawerTrigger asChild>
//             {children}
//         </DrawerTrigger>
//         <DrawerContent className='h-dvh pl-4 pr-2 pb-2 font-outfit shadow-none border-none bg-zinc-100 md:rounded-t-xl'>
//             <DrawerHeader className='flex'>
//                 <DrawerClose asChild>
//                     <Button variant={'ghost'} className='w-fit h-12 opacity-75'><ArrowLeftIcon className='size-6'/> <span>Retour à l'historique</span></Button>
//                 </DrawerClose>
//                 <DrawerDescription>Séance du <span>{(new Date(bilan.date)).toLocaleDateString('fr-FR', {day: '2-digit',month: '2-digit',year: 'numeric',})}</span></DrawerDescription>
//                 <DrawerTitle className='font-bold text-xl  md:text-3xl tracking-tight'>Résumé de la séance</DrawerTitle>
//             </DrawerHeader>
//             <div className="brand-v-scrollbar overflow-x-hidden overflow-y-auto px-4">
//                 <Card 
//                     className={cn(
//                         'border-none shadow-none  rounded-2xl flex flex-col lg:flex-row items-start justify-start lg:justify-between mt-6',
//                         cardStyle.bgColor
//                     )}
//                 >
//                     <CardHeader className='flex flex-col items-center justify-start w-full'>
//                         <div className='flex gap-2 w-full'>
//                             <cardStyle.icon className={cn('size-12 p-3 rounded-xl', cardStyle.iconBgColor, cardStyle.highlightTextColor)}/>
//                             <div className='flex flex-col w-full'>
//                                 <div className='flex items-start justify-between w-full'>
//                                     <span className={cn('font-bold tracking-tight uppercase text-sm',cardStyle.highlightTextColor)}>{cardStyle.label}</span>
//                                 </div>
//                                 <CardTitle className='text-xl lg:text-2xl font-semibold'>{bilan.lesson!.label}</CardTitle>
//                             </div>
//                         </div>
//                     </CardHeader>
//                     <CardFooter className='flex items-start justify-between w-full'>
//                         <div className='flex gap-2'>
//                             <div className={cn('w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-xl', cardStyle.iconBgColor, cardStyle.highlightTextColor)}>
//                                 {bilan.submittedBy.firstName.slice(0,1)}
//                             </div>
//                             <div className='flex flex-col justify-between'>
//                                 <p className='tracking-tight text-base lg:text-lg'>Avec <span className='font-bold'>{bilan.submittedBy.firstName} {bilan.submittedBy.lastName}</span></p>
//                                 <p className='text-sm opacity-75 leading-4 tracking-tight flex items-center justify-start gap-2'><span className='flex items-center justify-center gap-1'><CalendarIcon className='size-4'/> {format(bilan.date, 'd/MM/y', {locale : fr})}</span> · <span className='flex items-center justify-center gap-1'><ClockIcon className='size-4'/> {bilan.seance.seanceDuration.label}</span></p>
//                             </div>
//                         </div>
//                     </CardFooter>
//                 </Card>

//                 <div className='flex gap-4 flex-col lg:flex-row mt-4 pb-4'>
//                     <div className='flex-2/3 h-fit rounded-2xl bg-white p-4'>
//                         <div className='flex gap-2'><NotebookPenIcon/><span className='tracking-tight text-lg font-semibold'>Bilan de la séance</span></div>
//                         <p className='text-sm opacity-75 leading-4'>Les commentaires de {bilan.submittedBy.firstName}</p>
//                         <p className='mt-4'>{bilan.summary}</p>
//                     </div>
//                     <div className='flex-1/3 flex flex-col gap-4 min-w-xs'>
//                         <div className='flex flex-col bg-white rounded-2xl p-4'>
//                             <div className='flex items-center justify-between'>
//                                 <div className='flex w-full gap-2'><MessageCircleQuestionIcon/><span className='tracking-tight text-lg font-semibold'>Qcm</span></div>
//                                 {bilan.qcm && bilan.qcm.completed && <span className='bg-emerald-200 border border-emerald-500 rounded-full text-sm px-2 text-emerald-700'>Complété</span>}
//                                 {bilan.qcm && !bilan.qcm.completed && <span className='bg-red-200 border border-red-500 rounded-full text-sm px-2 capitalize text-nowrap text-red-700'>à faire</span>}
//                             </div>
//                             {
//                                 bilan.qcm && bilan.qcm.completed &&
//                                 <>
//                                     <p className='mt-4 opacity-75'>Tu peux consulter les réponses aux questions.</p>
//                                     <div className='p-4 mt-4 mb-2 rounded-lg bg-emerald-200'>
//                                         <div className='flex items-center justify-center gap-2'>
//                                             <TrophyIcon className='size-10'/>
//                                             <div className='text-3xl tracking-tight font-bold'>
//                                                 <span>{bilan.qcm.score}/{bilan.qcm.qcmQuestions.length}</span>
//                                             </div>
//                                         </div>
//                                         <p className='text-sm tracking-normal font-light text-balance text-center mt-2'>{getCongralutoryMessage(bilan.qcm.score)}</p>
//                                     </div>
//                                     <QcmResultsQuestionnaire qcm={bilan.qcm!}>
//                                         <BrandButton className='w-full mt-4 text-base h-12'>Voir les résultats</BrandButton>
//                                     </QcmResultsQuestionnaire>
//                                 </>
//                             }
//                             {
//                                 bilan.qcm && !bilan.qcm.completed &&
//                                 <>
//                                     <p className='mt-4 opacity-75'>Vous avez un QCM à compléter suite à cette séance.</p>
//                                     <QcmQuestionnaire onQcmSubmit={onQcmSubmit} qcm={bilan.qcm!}>
//                                         <BrandButton className='w-full mt-4 text-base h-12'>Compléter le QCM</BrandButton>
//                                     </QcmQuestionnaire>
//                                 </>
//                             }
//                             {
//                                 !bilan.qcm &&
//                                 <>
//                                     <p className='mt-4 opacity-75'>Vous n'avez pas de QCM à compléter suite à cette séance.</p>
//                                 </>
//                             }
//                         </div>
//                         <div className='flex flex-col bg-white rounded-2xl p-4'>
//                             <div className='flex w-full gap-2'><NotebookPenIcon/><span className='tracking-tight text-lg font-semibold'>Détails de la séance</span></div>
//                             <div className='flex items-center justify-between w-full mt-4'><span className='text-sm flex items-center gap-2 opacity-75'><CalendarIcon className='size-4'/> Date</span><span className='font-medium capitalize'>{format(bilan.date, 'PPP', {locale : fr})}</span></div>
//                             <div className='flex items-center justify-between w-full mt-2'><span className='text-sm flex items-center gap-2 opacity-75'><ClockIcon className='size-4'/> Durée</span><span className='font-medium'>{bilan.seance.seanceDuration.label}</span></div>
//                             <div className='flex items-center justify-between w-full mt-2'><span className='text-sm flex items-center gap-2 opacity-75'><LibraryBigIcon className='size-4'/> Matière</span><span className='font-medium'>{cardStyle.label}</span></div>
//                             <div className='flex items-center justify-between w-full mt-2'><span className='text-sm flex items-center gap-2 opacity-75'><BookOpenIcon className='size-4'/> Leçon</span><span className='font-medium'>{bilan.lesson!.label}</span></div>
//                             <Separator className='my-4'/>
//                             <div className='flex items-center justify-between w-full'><span className='text-sm flex items-center gap-2 opacity-75'><UserIcon className='size-4'/> Animateur(trice)</span><span className='font-medium capitalize'>{bilan.submittedBy.firstName} {bilan.submittedBy.lastName}</span></div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </DrawerContent>
//     </Drawer>
//   )
// }

// export default StudentSeanceDetailsDrawer

// ---------------------------------------------------------------------

// import { AnswerChoice } from '@/api/api.types'
// import type { QcmEntry } from '@/api/student/apiCalls'
// import { BrandButton } from '@/components/brand-button'

// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import {
//   Questionnaire,
//   QuestionnaireActions,
//   QuestionnaireChoice,
//   QuestionnaireChoices,
//   QuestionnaireError,
//   QuestionnaireItem,
//   QuestionnaireProgress,
//   QuestionnaireSkip,
// } from "@/components/ui/questionnaire"
// import { useMemo, useState } from 'react'


// const QcmResultsQuestionnaire = ({qcm, children} : {qcm : QcmEntry, children : React.ReactNode}) => {
//     const [open, setOpen] = useState(false);
//     const [currentItemName, setCurrentItemName] = useState(`${qcm.qcmQuestions[0].id}-${qcm.qcmQuestions[0].bankQuestion.id}`)
//     const items = useMemo(() => {
//         return qcm.qcmQuestions.map((q) => ({
//         name: `${q.id}-${q.bankQuestion.id}`,
//         required: false
//         }));
//     }, [qcm]);

//     const answers = useMemo(() => {
//         const rec : Record<string, string> = {};
//         for(const q of qcm.qcmQuestions){
//             rec[`${q.id}-${q.bankQuestion.id}`] = q.selectedChoice?? '';
//         }
//         return rec;
//     },[qcm])

//     const onOpenChange = (newOpen : boolean) => {
//         setCurrentItemName(`${qcm.qcmQuestions[0].id}-${qcm.qcmQuestions[0].bankQuestion.id}`);
//         setOpen(newOpen);
//     }
//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogTrigger asChild>
//         {children}
//       </DialogTrigger>
//       <DialogContent className='w-full max-h-dvh p-0'>
//         {open &&
//         <Questionnaire
//           defaultItem={items[0].name}
//           items={items}
//           onItemChange={setCurrentItemName}
//           className='h-dvh pt-6 pb-4'
//         >
//             {
//                 qcm.qcmQuestions.map((q) => {
//                     const itemName = `${q.id}-${q.bankQuestion.id}`;
//                     return (
//                     <QuestionnaireItem name={itemName} key={itemName}  className='h-[calc(100%-4rem)] px-2'>
//                         <DialogHeader className='px-4'>
//                             <DialogTitle className='text-start flex flex-col gap-2'>
//                                 <div className='flex items-center gap-4'>
//                                     <span className='text-sm font-bold opacity-75'>QCM</span>
//                                     <span className='font-bold text-sm px-4 py-1 rounded-md bg-zinc-900 text-white'>Note : {qcm.score} / {qcm.qcmQuestions.length}</span>
//                                 </div>
//                                 <span className='text-base'>{qcm.lesson!.label}</span>
//                             </DialogTitle>
//                             <DialogDescription/>
//                         </DialogHeader>
//                         <QuestionnaireProgress
//                             className="w-full px-4"
//                             render={(props, state) => (
//                             <div {...props}>
//                                 <div className="mb-2 flex gap-1.5" aria-hidden="true">
//                                 {Array.from({ length: state.total }, (_, index) => (
//                                     <span
//                                     key={index}
//                                     className={
//                                         index < state.current
//                                         ? "h-1.5 flex-1 rounded-full bg-lime-600"
//                                         : "h-1.5 flex-1 rounded-full bg-muted"
//                                     }
//                                     />
//                                 ))}
//                                 </div>
//                                 <span>
//                                 Question {state.current} / {state.total}
//                                 </span>
//                             </div>
//                             )}
//                         />
//                         <p className='text-lg font-semibold my-6 px-4 '>{q.bankQuestion.question}</p>
//                         <div className="brand-v-scrollbar overflow-x-hidden overflow-y-auto px-4 ">
//                             <QuestionnaireChoices>
//                                 <QuestionnaireChoice value={AnswerChoice.a} defaultChecked = {answers[itemName] === AnswerChoice.a} disabled className={`${q.correct?'data-checked:bg-lime-600 data-checked:text-white' : 'data-checked:bg-red-500 data-checked:text-white'} ${q.bankQuestion.correctAnswer === AnswerChoice.a?'bg-lime-600 text-white' : ''}`}>
//                                     {q.bankQuestion.answerA}
//                                 </QuestionnaireChoice>
//                                 <QuestionnaireChoice value={AnswerChoice.b} defaultChecked = {answers[itemName] === AnswerChoice.b} disabled className={`${q.correct?'data-checked:bg-lime-600 data-checked:text-white' : 'data-checked:bg-red-500 data-checked:text-white'} ${q.bankQuestion.correctAnswer === AnswerChoice.b?'bg-lime-600 text-white' : ''}`}>
//                                     {q.bankQuestion.answerB}
//                                 </QuestionnaireChoice>
//                                 <QuestionnaireChoice value={AnswerChoice.c} defaultChecked = {answers[itemName] === AnswerChoice.c} disabled className={`${q.correct?'data-checked:bg-lime-600 data-checked:text-white' : 'data-checked:bg-red-500 data-checked:text-white'} ${q.bankQuestion.correctAnswer === AnswerChoice.c?'bg-lime-600 text-white' : ''}`}>
//                                     {q.bankQuestion.answerC}
//                                 </QuestionnaireChoice>
//                                 <QuestionnaireChoice value={AnswerChoice.d} defaultChecked = {answers[itemName] === AnswerChoice.d} disabled className={`${q.correct?'data-checked:bg-lime-600 data-checked:text-white' : 'data-checked:bg-red-500 data-checked:text-white'} ${q.bankQuestion.correctAnswer === AnswerChoice.d?'bg-lime-600 text-white' : ''}`}>
//                                     {q.bankQuestion.answerD}
//                                 </QuestionnaireChoice>
//                             </QuestionnaireChoices>
//                             <div className='mt-6'>
//                                 <span className='font-bold'>Explication</span>
//                                 <p className=' font-medium'>{q.bankQuestion.explanation}</p>
//                             </div>
//                             <QuestionnaireError/>
//                         </div>
//                     </QuestionnaireItem>
//                     )})
//             }
//           <DialogFooter className='flex flex-row px-4 justify-end w-full'>
//             {
//                 currentItemName === items[items.length - 1].name &&
//                 <DialogClose asChild className=''>
//                     <BrandButton type="button" variant="default" className='h-12 w-full lg:max-w-60'>
//                         Fermer
//                     </BrandButton>
//                 </DialogClose>
//             }
//             <QuestionnaireActions className='flex-1 flex justify-end'>
//                 {
//                     currentItemName !== items[items.length - 1].name &&
//                     <QuestionnaireSkip variant={'default'} className='w-full h-12 lg:max-w-60'>Question suivante</QuestionnaireSkip>
//                 }
//             </QuestionnaireActions>
//           </DialogFooter>
//         </Questionnaire>
//         }
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default QcmResultsQuestionnaire

// ---------------------------------------------------------------------

// import { AnswerChoice } from '@/api/api.types'
// import { studentApiCalls, type QcmEntry } from '@/api/student/apiCalls'
// import { BrandButton } from '@/components/brand-button'

// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import {
//   Questionnaire,
//   QuestionnaireActions,
//   QuestionnaireChoice,
//   QuestionnaireChoices,
//   QuestionnaireError,
//   QuestionnaireItem,
//   QuestionnaireNext,
//   QuestionnaireProgress,
//   QuestionnaireSubmit,
// } from "@/components/ui/questionnaire"
// import { DialogDescription } from '@radix-ui/react-dialog'
// import { useMutation} from '@tanstack/react-query'
// import { useMemo, useState } from 'react'
// import { toast } from 'sonner'


// const QcmQuestionnaire = ({qcm, onQcmSubmit, children} : {qcm : QcmEntry, onQcmSubmit : (qcm: QcmEntry) => void, children : React.ReactNode}) => {
//     const [open, setOpen] = useState(false);
//     const [savedAnswers, setSavedAnswers] = useState<Record<string, string>>({})
//     const [initialItem, setInitialItem] = useState<string>("");

//     const storageKey = `qcm-progress-${qcm.id}`;

//     const items = useMemo(() => {
//         return qcm.qcmQuestions.map((q) => ({
//         name: `${q.id}-${q.bankQuestion.id}`,
//         required: true
//         }));
//     }, [qcm]);


//     const submitMutation = useMutation({
//         mutationFn : (qcm : QcmEntry) => 
//             studentApiCalls.submitQcm(qcm),
//         onSuccess :(qcm) => {
//             if(!qcm){
//                 toast.error('Erreur lors de la soumission du Qcm.');
//                 return;
//             }
            
//             // toast(`QCM Complété ! Vous avez obtenu un résulat de : ${qcm.score}`);
//             toast.success("QCM complété", {
//                 description: `Vous avez obtenu une note de ${qcm.score}/10`,
//             })
//             console.log('qcm returned : ', qcm);

//             onQcmSubmit(qcm);
//             setOpen(false);
//             return;
//         },
//         onError : (err) => {
//             toast.error('Erreur lors de la soumission du Qcm.')
//             console.log('submit error : ',err) 
//         }
//     })

    

//     const handleOpenChange = (newOpen: boolean) => {
//         if (newOpen) {
//             const saved = localStorage.getItem(storageKey);
            
//             if (saved) {
//                 try {
//                     const parsed = JSON.parse(saved);
//                     setSavedAnswers(parsed);
//                     console.log('parsed : ', parsed)
//                     const firstUnanswered = items.find((item) => !parsed[item.name]);
//                     setInitialItem(firstUnanswered ? firstUnanswered.name : items[items.length - 1].name);
//                 } catch (error) {
//                     console.error("Failed to parse saved QCM progress", error);
//                     setSavedAnswers({});
//                     setInitialItem(items[0]?.name || "");
//                 }
//             } else {
//                 setSavedAnswers({});
//                 setInitialItem(items[0]?.name || "");
//             }
//         }
        
//         setOpen(newOpen);
//     };
    
//     const handleFormChange = (event: React.FormEvent<HTMLFormElement>) => {
//         const formData = new FormData(event.currentTarget);
//         const currentAnswers = Object.fromEntries(formData.entries()) as Record<string, string>;
//         localStorage.setItem(storageKey, JSON.stringify(currentAnswers));
//     };

//     function handleQcmSubmit(event: React.FormEvent<HTMLFormElement>) {
//         event.preventDefault()
//         const formData = new FormData(event.currentTarget)
        
//         const questionsWithAnswers = qcm.qcmQuestions.map(q => {
//             const itemName = `${q.id}-${q.bankQuestion.id}`;
//             return {
//                 ...q,
//                 correct : formData.get(itemName) === q.bankQuestion.correctAnswer,
//                 selectedChoice : formData.get(itemName) as AnswerChoice,
//             }
//         })

//         const score = questionsWithAnswers.filter(q => q.correct).length;
        
//         const newQcm : QcmEntry = {
//             ...qcm,
//             score,
//             completed : true,
//             qcmQuestions : questionsWithAnswers
//         }

//         submitMutation.mutate(newQcm);
//     }

//   return (
//     <Dialog open={open} onOpenChange={handleOpenChange}>
//       <DialogTrigger asChild>
//         {children}
//       </DialogTrigger>
//       <DialogContent className='w-full h-dvh p-0'>
//         {open &&
//         <Questionnaire
//           defaultItem={initialItem}
//           items={items}
//           onSubmit={handleQcmSubmit}
//           onChange={handleFormChange}
//           className='h-dvh pt-6 pb-4'
//         >
//             {
//                 qcm.qcmQuestions.map((q) => {
//                     const itemName = `${q.id}-${q.bankQuestion.id}`;
//                     return (
//                     <QuestionnaireItem name={itemName} key={itemName} className='h-[calc(100%-4rem)] px-2' required>
//                         <DialogHeader className='px-4'>
//                             <DialogTitle className='text-start flex flex-col gap-2'>
//                                 <span className='text-sm font-bold opacity-75'>QCM</span>
//                                 <span className='text-base'>{qcm.lesson!.label}</span>
//                             </DialogTitle>
//                             <DialogDescription/>
//                         </DialogHeader>
//                         <QuestionnaireProgress
//                             className="w-full px-4"
//                             render={(props, state) => (
//                             <div {...props}>
//                                 <div className="mb-2 flex gap-1.5" aria-hidden="true">
//                                 {Array.from({ length: state.total }, (_, index) => (
//                                     <span
//                                         key={index}
//                                         className={
//                                             index < state.current
//                                             ? "h-1.5 flex-1 rounded-full bg-lime-600"
//                                             : "h-1.5 flex-1 rounded-full bg-muted"
//                                         }
//                                     />
//                                 ))}
//                                 </div>
//                                 <span>
//                                 Question {state.current} / {state.total}
//                                 </span>
//                             </div>
//                             )}
//                         />
//                         <p className='text-lg font-semibold my-6 px-4'>{q.bankQuestion.question}</p>
//                         <div className="brand-v-scrollbar overflow-x-hidden overflow-y-auto px-4">
//                             <QuestionnaireChoices>
//                                 <QuestionnaireChoice value={AnswerChoice.a} defaultChecked = {savedAnswers[itemName] === AnswerChoice.a}>
//                                     {q.bankQuestion.answerA}
//                                 </QuestionnaireChoice>
//                                 <QuestionnaireChoice value={AnswerChoice.b} defaultChecked = {savedAnswers[itemName] === AnswerChoice.b}>
//                                     {q.bankQuestion.answerB}
//                                 </QuestionnaireChoice>
//                                 <QuestionnaireChoice value={AnswerChoice.c} defaultChecked = {savedAnswers[itemName] === AnswerChoice.c}>
//                                     {q.bankQuestion.answerC}
//                                 </QuestionnaireChoice>
//                                 <QuestionnaireChoice value={AnswerChoice.d} defaultChecked = {savedAnswers[itemName] === AnswerChoice.d}>
//                                     {q.bankQuestion.answerD}
//                                 </QuestionnaireChoice>
//                             </QuestionnaireChoices>
//                             <QuestionnaireError/>
//                         </div>
//                     </QuestionnaireItem>
//                     )})
//             }
//           <DialogFooter className='flex flex-row px-4'>
//             <DialogClose asChild className='flex-1 p-0'>
//               <BrandButton type="button" variant="outline" className='h-12'>
//                 Annuler
//               </BrandButton>
//             </DialogClose>
//             <QuestionnaireActions className='flex-1 flex'>
//               <QuestionnaireNext className='w-full h-12'>Confimer</QuestionnaireNext>
//               <QuestionnaireSubmit className='w-full h-12'>Envoyer</QuestionnaireSubmit>
//             </QuestionnaireActions>
//           </DialogFooter>
//         </Questionnaire>
//         }
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default QcmQuestionnaire

// ---------------------------------------------------------------------

// import type { BilanEntry, QcmEntry } from '@/api/student/apiCalls'
// import { Button } from '@/components/ui/button'
// import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
// import { ArrowRightIcon, RotateCwFadingClockIcon } from 'lucide-react'
// import StudentCarouselSeanceCard from './carousel-seance-card'
// import StudentSeancesListDrawer from './seances-list-drawer'

// const StudentSeanceHistoryCarousel = ({bilans, onQcmSubmit} : {bilans : BilanEntry[], onQcmSubmit : (qcm: QcmEntry) => void}) => {
//     if(bilans.length === 0){
//         return (
//             <div className='mt-12'>
//                 <div className='flex items-center justify-between'>
//                     <h3 className='font-semibold text-lg lg:text-xl text-zinc-900'>Historique des séances</h3>
//                     <span className='px-4 py-2 leading-4.5 rounded-full bg-white text-zinc-600 border border-zinc-300'>0 séances</span>
//                 </div>
//                 <p className='opacity-75'>Toutes les séances organisée durant l'année scolaire, au même endroit.</p>
//                 <Card className='border-2 border-dashed border-zinc-200 shadow-none h-64 flex flex-col items-center justify-center w-full rounded-xl bg-transparent mt-4 p-4'>
//                     <CardHeader className='flex flex-col items-center justify-center w-full'>
//                         <RotateCwFadingClockIcon className='size-10 opacity-70'/>
//                         <CardTitle className='text-base font-medium opacity-70 text-center text-balance'>Aucune séance enregistrée pour le moment.</CardTitle>
//                         <CardDescription className='text-pretty text-sm max-w-xl text-center'>Toutes les séance enregistrées seront affichées ici dès leur réalisation.</CardDescription>
//                     </CardHeader>   
//                 </Card>
//             </div>
//         )
//     }
  
//     return (
//         <div className='mt-12'>
//             <div className='flex items-center justify-between'>
//                 <h3 className='font-semibold text-lg lg:text-xl text-zinc-900'>Historique des séances</h3>
//                 <span className='px-4 py-2 leading-4.5 rounded-full bg-white text-zinc-900 border border-zinc-300'>{bilans.length} séances</span>
//             </div>
//             <p className='opacity-75 max-w-sm lg:max-w-xl text-balance text-start text-sm lg:text-base'>Toutes les séances organisée durant l'année scolaire, au même endroit.</p>
//             <Carousel
//                 opts={{align :'start'}}
//                 className='mt-2'
//             >
//                 <CarouselContent className='-ml-4 pt-4'>
//                     {
//                         bilans.slice(0, Math.min(bilans.length, 5)).map((bilan) => (
//                             <CarouselItem key={bilan.id} className="group pl-4 max-w-60 h-48 hover:-translate-y-2 transition-transform duration-100 ease-out">
//                                 <StudentCarouselSeanceCard onQcmSubmit = {onQcmSubmit} bilan = {bilan}/>
//                             </CarouselItem>
//                         ))
//                     }
//                 </CarouselContent>
//                 <div className='mt-4 flex justify-between items-center'>
//                     <div>
//                         <CarouselPrevious variant={'outline'}/>
//                         <CarouselNext variant={'outline'}/>
//                     </div>
//                     <StudentSeancesListDrawer   bilans = {bilans} onQcmSubmit={onQcmSubmit}>
//                         <Button variant={'outline'} className='tracking-tight'>Voir toutes les séances <ArrowRightIcon/></Button>
//                     </StudentSeancesListDrawer>
//                 </div>
//             </Carousel>
//         </div>
//   )
// }

// export default StudentSeanceHistoryCarousel

// ---------------------------------------------------------------------

// import type { BilanEntry, QcmEntry } from '@/api/student/apiCalls'
// import { CARD_STYLES, type Subject } from '@/lib/types/data.types';
// import { cn } from '@/lib/utils'
// import { format } from 'date-fns';
// import { fr } from 'date-fns/locale';
// import { AlertTriangleIcon, CalendarIcon, CalendarXIcon, ClockIcon, TrophyIcon, UserIcon } from 'lucide-react';
// import StudentSeanceDetailsDrawer from './seance-details-drawer';

// const StudentCarouselSeanceCard = ({bilan, onQcmSubmit} : {bilan : BilanEntry, onQcmSubmit : (qcm: QcmEntry) => void}) => {
//   if(!bilan.presence || !bilan.lesson){
//     return (
//       <div className={cn(`rounded-xl w-full h-full p-4 font-outfit flex flex-col justify-between group-hover:border border-red-500 bg-red-100 opacity-50 shadow-sm`)}>
//         <div className='flex justify-end font-medium text-sm'>
//           <CalendarXIcon className='text-red-500 size-8'/>
//         </div>
//         <h3 className='text-lg font-semibold tracking-tight text-red-600'>Absence</h3>
//         <div>
//           <p className='text-sm opacity-75 flex items-center gap-2 tracking-tight'><UserIcon className='size-4'/><span><span className='capitalize'>{bilan.submittedBy.firstName}</span> <span className='uppercase'>{bilan.submittedBy.lastName}</span></span></p>
//           <p className='text-sm opacity-75 leading-4 tracking-tight flex flex-col items-start'><span className='flex items-center justify-center gap-1'><CalendarIcon className='size-4'/> {format(bilan.date, 'd/MM/y', {locale : fr})}</span> <span className='flex items-center justify-center gap-1'><ClockIcon className='size-4'/> {bilan.seance.seanceDuration.label}</span></p>
//         </div>
//       </div>
//     )
//   }
//   const cardStyle = CARD_STYLES[bilan.lesson!.subject.label as Subject];
//   return (
//     <StudentSeanceDetailsDrawer onQcmSubmit={onQcmSubmit} bilan={bilan} cardStyle={cardStyle}>
//       <div className={cn(`rounded-xl w-full h-full p-4 font-outfit flex flex-col justify-between group-hover:border shadow-sm`, cardStyle.borderColor, cardStyle.bgColor)}>
//         <div className='flex justify-end font-medium text-sm'>
//           {bilan.qcm && !bilan.qcm.completed && <span className={cn('px-4 rounded-full border flex items-center gap-2', cardStyle.borderColor, cardStyle.iconBgColor)}><AlertTriangleIcon className='w-4'/> Qcm à faire</span>}
//           {bilan.qcm && bilan.qcm.completed && <span className={cn('px-4 rounded-full border flex items-center gap-2', cardStyle.borderColor, cardStyle.iconBgColor)}>Qcm : <TrophyIcon className='w-4'/> {bilan.qcm.score!}/{bilan.qcm.qcmQuestions.length}</span>}
//           {!bilan.qcm && <span className='px-4 rounded-full border'>Pas de QCM</span>}
//         </div>
//         <div>
//           <p className={cn('text-xs font-bold flex flex-col items-start uppercase leading-3', cardStyle.highlightTextColor)}><cardStyle.icon/><span>{cardStyle.label}</span></p>
//           <h3 className='text-base font-semibold tracking-tight max-w-48 truncate mt-1'>{bilan.lesson.label}</h3>
//         </div>
//         <div>
//           <p className='text-sm opacity-75 flex items-center gap-2 tracking-tight'><UserIcon className='size-4'/><span><span className='capitalize'>{bilan.submittedBy.firstName}</span> <span className='uppercase'>{bilan.submittedBy.lastName}</span></span></p>
//           <p className='text-sm opacity-75 leading-4 tracking-tight flex flex-col items-start'><span className='flex items-center justify-center gap-1'><CalendarIcon className='size-4'/> {format(bilan.date, 'd/MM/y', {locale : fr})}</span> <span className='flex items-center justify-center gap-1'><ClockIcon className='size-4'/> {bilan.seance.seanceDuration.label}</span></p>
//         </div>
//       </div>
//     </StudentSeanceDetailsDrawer>
//   )
// }

// export default StudentCarouselSeanceCard

// ---------------------------------------------------------------------

// import type { BilanEntry, QcmEntry } from '@/api/student/apiCalls'
// import { Button } from '@/components/ui/button'
// import { Drawer, DrawerClose, DrawerContent,DrawerDescription,DrawerHeader,DrawerTitle,DrawerTrigger } from '@/components/ui/drawer'
// import { useIsMobile } from '@/hooks/use-mobile'
// import { CARD_STYLES, type Subject } from '@/lib/types/data.types'
// import { cn } from '@/lib/utils'
// import { format } from 'date-fns'
// import { fr } from 'date-fns/locale'
// import { AlertTriangleIcon, ArrowLeftIcon, CalendarIcon, CalendarX,TrophyIcon, UserIcon} from 'lucide-react'
// import StudentSeanceDetailsDrawer from './seance-details-drawer'
// import { useMemo, useState } from 'react'

// const StudentSeancesListDrawer = ({bilans, onQcmSubmit, children} : {bilans : BilanEntry[], onQcmSubmit : (qcm: QcmEntry) => void, children : React.ReactNode}) => {
//     const isMobile = useIsMobile();
//     const [filter, setFilter] = useState<'all' | 'present' | 'absent'>('all')

//     const selectedBilans = useMemo(()=>{
//         if(filter === 'all') return bilans;
//         if(filter === 'present') return bilans.filter(b => b.presence);
//         if(filter === 'absent') return bilans.filter(b => !b.presence);
//     }, [filter, bilans])
//   return (
//     <Drawer direction={isMobile? 'left' : 'right'}>
//         <DrawerTrigger asChild>
//             {children}
//         </DrawerTrigger>
//         <DrawerContent className='h-dvh pl-4 pr-2 pb-2 font-outfit shadow-none border-none bg-zinc-100 md:rounded-t-xl'>
//             <DrawerHeader className='flex'>
//                 <DrawerClose asChild>
//                     <Button variant={'ghost'} className='w-fit h-12 opacity-75'><ArrowLeftIcon className='size-6'/> <span>Retour à l'historique</span></Button>
//                 </DrawerClose>
//                 <DrawerTitle className='font-bold text-xl  md:text-3xl tracking-tight'>Liste des séances</DrawerTitle>
//                 <DrawerDescription className='text-base'>{bilans.length} séances réalisées</DrawerDescription>
//                 <div className='mt-2 flex gap-2'>
//                     <span onClick={() => setFilter('all')} className={cn('px-4 py-2 border border-zinc-200 rounded-full', filter === 'all'? 'bg-zinc-900 text-white hover:bg-zinc-900' : 'bg-transparent text-zinc-900 hover:bg-zinc-200')}>Tout</span>
//                     <span onClick={() => setFilter('present')} className={cn('px-4 py-2 border border-zinc-200 rounded-full ', filter === 'present'? 'bg-zinc-900 text-white hover:bg-zinc-900' : 'bg-transparent text-zinc-900 hover:bg-zinc-200')}>Présence</span>
//                     <span onClick={() => setFilter('absent')} className={cn('px-4 py-2 border border-zinc-200 rounded-full', filter === 'absent'? 'bg-zinc-900 text-white hover:bg-zinc-900' : 'bg-transparent text-zinc-900 hover:bg-zinc-200')}>Absence</span>
//                 </div>
//             </DrawerHeader>
//             <div className="brand-v-scrollbar overflow-x-hidden overflow-y-auto px-2 flex flex-col gap-2 ">
//                 {
//                     selectedBilans && selectedBilans.map((bilan => {
//                         if(!bilan.presence || !bilan.lesson){
//                             return (
//                                 <div key={bilan.id} className={cn('w-full p-4 bg-white rounded-lg opacity-70')}>
//                                     <div className='flex gap-2 w-full'>
//                                         <CalendarX className={cn('size-14 p-3 rounded-xl bg-red-200 text-red-500')}/>
//                                         <div className='flex flex-col w-full'>
//                                             <h3 className='text-lg lg:text-xl font-semibold mt-2'>Absence</h3>
//                                         </div>
//                                     </div>
//                                     <div className='mt-2 flex justify-between'>
//                                         <p className='text-sm opacity-75 flex items-center gap-2 tracking-tight'><UserIcon className='size-4'/><span><span className='capitalize'>{bilan.submittedBy.firstName}</span> <span className='uppercase'>{bilan.submittedBy.lastName}</span></span></p>
//                                         <p className='text-sm opacity-75 leading-4 tracking-tight flex flex-col items-start'><span className='flex items-center justify-center gap-1'><CalendarIcon className='size-4'/> {format(bilan.date, 'd/MM/y', {locale : fr})}</span></p>
//                                     </div>
//                                 </div>
//                             )
//                         }else{
//                             const cardStyle = CARD_STYLES[bilan.lesson!.subject.label as Subject];
                            
//                             return (
//                                 <StudentSeanceDetailsDrawer key={bilan.id} onQcmSubmit={onQcmSubmit} bilan={bilan} cardStyle={cardStyle}>
//                                     <div className={cn('flex items-center gap-4 w-full p-4 rounded-lg bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all ease-out duration-100 cursor-pointer')}>
//                                         <div key={bilan.id} className={cn(' flex-1')}>
//                                             <div className='flex gap-2 w-full'>
//                                                 <cardStyle.icon className={cn('size-14 p-3 rounded-xl', cardStyle.iconBgColor, cardStyle.highlightTextColor)}/>
//                                                 <div className='flex flex-col w-full'>
//                                                     <div className='flex items-start justify-between w-full'>
//                                                         <span className={cn('font-bold tracking-tight uppercase text-sm',cardStyle.highlightTextColor)}>{cardStyle.label}</span>
//                                                         <div className='flex justify-end font-medium text-sm'>
//                                                             {bilan.qcm && !bilan.qcm.completed && <span className={cn('px-2 h-5 leading-1 tracking-tight rounded-full border flex items-center gap-2', cardStyle.borderColor, cardStyle.iconBgColor)}><AlertTriangleIcon className='w-4'/> Qcm à faire</span>}
//                                                             {bilan.qcm && bilan.qcm.completed && <span className={cn('px-2 h-5 leading-1 rounded-full border flex items-center gap-2', cardStyle.borderColor, cardStyle.iconBgColor)}>Qcm : <TrophyIcon className='w-4'/> {bilan.qcm.score!}/{bilan.qcm.qcmQuestions.length}</span>}
//                                                             {!bilan.qcm && <span className='px-2 h-5 leading-1 rounded-full border'>Pas de QCM</span>}
//                                                         </div>
//                                                     </div>
//                                                     <h3 className='text-lg lg:text-xl font-semibold mt-2 max-w-48 lg:max-w-full truncate'>{bilan.lesson.label}</h3>
//                                                 </div>
//                                             </div>
//                                             <div className='mt-2 flex justify-between'>
//                                                 <p className='text-sm opacity-75 flex items-center gap-2 tracking-tight'><UserIcon className='size-4'/><span><span className='capitalize'>{bilan.submittedBy.firstName}</span> <span className='uppercase'>{bilan.submittedBy.lastName}</span></span></p>
//                                                 <p className='text-sm opacity-75 leading-4 tracking-tight flex flex-col items-start'><span className='flex items-center justify-center gap-1'><CalendarIcon className='size-4'/> {format(bilan.date, 'd/MM/y', {locale : fr})}</span></p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </StudentSeanceDetailsDrawer>
//                             )
//                         }
                        
//                     }))
//                 }
//             </div>
//         </DrawerContent>
//     </Drawer>
//   )
// }

// export default StudentSeancesListDrawer

// ---------------------------------------------------------------------

// import type { BilanEntry } from '@/api/student/apiCalls'
// import { CalendarCheck2Icon, CalendarIcon, CalendarX2Icon, PieChartIcon } from 'lucide-react'

// const StudentSeanceStats = ({bilans} : {bilans : BilanEntry[]}) => {
//     let presentBilansCount : string | number = '', absentBilansCount : string | number = '', presenceRate : string | number = '';
//     if(bilans.length === 0){
//         presentBilansCount = '-';
//         absentBilansCount = '-';
//         presenceRate = '-';
//     }else{
//         presentBilansCount = bilans.filter(b => b.presence).length;
//         absentBilansCount = bilans.filter(b => !b.presence).length;
//         presenceRate = Math.round(100 * presentBilansCount/bilans.length)
//     }
//   return (
//     <div className='mt-12 grid xl:grid-cols-4 gap-4 grid-cols-2'>
//         <div className='rounded-xl p-6 shadow-sm bg-white flex flex-col gap-4'>
//             <div className='flex items-center justify-center gap-4'>
//                 <CalendarIcon className='text-indigo-500 size-8'/>
//                 <span className='text-indigo-500 text-4xl font-bold'>{bilans.length}</span>
//             </div>
//             <h4 className='opacity-75 text-sm text-center'>Séances réalisées</h4>
//         </div>
//         <div className='rounded-xl p-6 shadow-sm bg-white flex flex-col gap-4'>
//             <div className='flex items-center justify-center gap-4'>
//                 <CalendarCheck2Icon className='text-lime-600 size-8'/>
//                 <span className='text-lime-600 text-4xl font-bold'>{presentBilansCount}/{bilans.length}</span>
//             </div>
//             <h4 className='opacity-75 text-sm text-center'>Nombre de présences</h4>
//         </div>
//         <div className='rounded-xl p-6 shadow-sm bg-white flex flex-col gap-4'>
//             <div className='flex items-center justify-center gap-4'>
//                 <CalendarX2Icon className='text-red-500 size-8'/>
//                 <span className='text-red-500 text-4xl font-bold'>{absentBilansCount}/{bilans.length}</span>
//             </div>
//             <h4 className='opacity-75 text-sm text-center'>Nombre d'absences</h4>
//         </div>
//         <div className='rounded-xl p-6 shadow-sm bg-white flex flex-col gap-4'>
//             <div className='flex items-center justify-center gap-4'>
//                 <PieChartIcon className='text-amber-600 size-8'/>
//                 <span className='text-amber-600 text-4xl font-bold'>{presenceRate}%</span>
//             </div>
//             <h4 className='opacity-75 text-sm text-center'>Taux de présence</h4>
//         </div>
//     </div>
//   )
// }

// export default StudentSeanceStats