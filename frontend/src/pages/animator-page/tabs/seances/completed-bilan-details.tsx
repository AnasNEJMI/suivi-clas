import type { SeanceDurationEntry, StudentEntry } from "@/api/animator/seances.types"
import { BrandButton } from "@/components/brand-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CARD_STYLES, type Subject } from "@/lib/types/data.types"
import { cn, getElapsedDays } from "@/lib/utils"
import QcmResultsQuestionnaire from "@/pages/student-page/bilans/qcm-results-questionnaire"
import { BookCheckIcon, CalendarIcon, CalendarX2Icon, Clock8Icon, InfoIcon, MessageCircleQuestionIcon, NotebookPenIcon, NotebookTextIcon, RotateCwFadingClockIcon } from "lucide-react"

interface AnimCompletedBilanDetailsProps{
    studentBilan : StudentEntry,
    seanceDuration : SeanceDurationEntry,
}
const AnimCompletedBilanDetails = ({studentBilan, seanceDuration} : AnimCompletedBilanDetailsProps) => {
    if(!studentBilan.bilan){
        return (
            <Card className='border-2 border-dashed border-zinc-200 shadow-none h-64 flex flex-col items-center justify-center w-full rounded-xl bg-transparent mt-4 p-4'>
                <CardHeader className='flex flex-col items-center justify-center w-full'>
                    <RotateCwFadingClockIcon className='size-10 opacity-70'/>
                    <CardTitle className='text-base font-medium opacity-70 text-center text-balance'>Aucun bilan n'a été soumis pour cet élève.</CardTitle>
                    <CardDescription className='text-pretty text-sm max-w-xl text-center'>Les details du bilan seront affichés ici dès son enregistrement.</CardDescription>
                </CardHeader>   
            </Card>
        )
    }
    
    const cardStyle = studentBilan.bilan.presence ? CARD_STYLES[studentBilan.bilan.lesson!.subject.label as Subject] : CARD_STYLES['none'];
    return (
    <div className="brand-v-scrollbar overflow-x-hidden overflow-y-auto px-2 flex flex-col">
        {
            studentBilan.bilan.presence && studentBilan.bilan.presence &&
            <Card className={cn("border-none shadow-card gap-0",cardStyle.bgColor)}>
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-1">
                        <BookCheckIcon/> Leçon abordée
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 mt-2">
                    <div className="flex items-center gap-4 justify-between"><span className="flex items-center gap-1 opacity-75">Matière</span> <span className={cn("flex items-center gap-1 px-2 broder",cardStyle.highlightTextColor, cardStyle.borderColor)}><cardStyle.icon className="size-4"/><span className="text-sm uppercase font-bold">{cardStyle.label}</span></span></div>
                    <div className="flex items-center gap-4 justify-between"><span className="flex items-center gap-1 opacity-75">Leçon</span> <span>{studentBilan.bilan.lesson!.label}</span></div>
                </CardContent>
            </Card>
        }
        {
            (!studentBilan.bilan.presence || !studentBilan.bilan.presence) &&
            <Card className={cn("border-none shadow-card gap-0",cardStyle.bgColor)}>
                <CardContent className="flex flex-col gap-2">
                    <div className="flex items-center gap-4 justify-center"><span className={cn("flex items-center gap-1 font-medium text-base", cardStyle.highlightTextColor)}><CalendarX2Icon/> Absence</span></div>
                </CardContent>
            </Card>
        }

        {
            studentBilan.bilan.presence && studentBilan.bilan.lesson &&
            <Card className={cn("border-none shadow-card gap-0 mt-4")}>
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-1">
                        <NotebookPenIcon/> Résumé de la séance
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 mt-2">
                    <p>{studentBilan.bilan.summary}</p>
                </CardContent>
            </Card>
        }

        {
            studentBilan.bilan.presence && studentBilan.bilan.lesson &&
            <Card className={cn("border-none shadow-card gap-0 mt-4")}>
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-1">
                        <MessageCircleQuestionIcon/> QCM
                    </CardTitle>
                    {
                        studentBilan.bilan.qcm &&
                        <CardDescription className="text-sm">Vous avez généré un QCM pour cette séance</CardDescription>
                    }
                    {
                        !studentBilan.bilan.qcm &&
                        <CardDescription className="text-sm">Vous m'avez pas généré un QCM pour cette séance</CardDescription>
                    }
                </CardHeader>
                {
                    studentBilan.bilan.qcm && 
                    <CardContent className="flex flex-col gap-2 w-full">
                        <div className="flex items-center gap-4 justify-between mt-4">
                            <span className="flex items-center gap-1 opacity-75"><NotebookTextIcon/> Résultats </span>
                            {
                            studentBilan.bilan.qcm.completed && 
                            <span>{studentBilan.bilan.qcm.score}/{studentBilan.bilan.qcm.qcmQuestions.length}</span>
                            }
                            {
                            !studentBilan.bilan.qcm.completed && 
                            <span className="text-end font-medium border rounded-full p-2 text-sm border-zinc-200">QCM encore à faire</span>
                            }
                        </div>
                        {
                            !studentBilan.bilan.qcm.completed &&
                            <div className="flex justify-end mt-4">
                                <QcmResultsQuestionnaire qcm={{...studentBilan.bilan.qcm, submittedBy : {id : 0, firstName : '', lastName : '', gender : 'm'}, date : new Date()}}>
                                    <BrandButton className="w-full max-w-sm">Voir les questions</BrandButton>
                                </QcmResultsQuestionnaire> 
                            </div>
                        }
                        {
                            studentBilan.bilan.qcm.completed &&
                            <div className="flex justify-end mt-4">
                                <QcmResultsQuestionnaire qcm={{...studentBilan.bilan.qcm, submittedBy : {id : 0, firstName : '', lastName : '', gender : 'm'}, date : new Date()}}>
                                    <BrandButton className="w-full max-w-sm">Voir les résultats</BrandButton>
                                </QcmResultsQuestionnaire> 
                            </div>
                        }
                    </CardContent>
                }
            </Card>
        }

        <Card className={cn("border-none shadow-card gap-0 mt-4")}>
            <CardHeader>
                <CardTitle className="text-base flex items-center gap-1">
                    <InfoIcon/> Informations générales
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 mt-2">
                <div className="flex items-center gap-4 justify-between"><span className="flex items-center gap-1 opacity-75"><CalendarIcon className="size-4"/> Date de la séance</span> <span>{getElapsedDays(studentBilan.bilan.date)}</span></div>
                <div className="flex items-center gap-4 justify-between"><span className="flex items-center gap-1 opacity-75"><Clock8Icon className="size-4"/> Durée de la séance</span> <span>{seanceDuration.label}</span></div>
            </CardContent>
        </Card>

    </div>
  )
}

export default AnimCompletedBilanDetails