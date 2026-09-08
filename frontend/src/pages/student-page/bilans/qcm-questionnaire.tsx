import { AnswerChoice } from '@/api/api.types'
import { studentApiCalls, type QcmEntry } from '@/api/student/apiCalls'
import { BrandButton } from '@/components/brand-button'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnaireProgress,
  QuestionnaireSubmit,
} from "@/components/ui/questionnaire"
import { DialogDescription } from '@radix-ui/react-dialog'
import { useMutation} from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'


const QcmQuestionnaire = ({qcm, onQcmSubmit, children} : {qcm : QcmEntry, onQcmSubmit : (qcm: QcmEntry) => void, children : React.ReactNode}) => {
    const [open, setOpen] = useState(false);
    const [savedAnswers, setSavedAnswers] = useState<Record<string, string>>({})
    const [initialItem, setInitialItem] = useState<string>("");

    const storageKey = `qcm-progress-${qcm.id}`;

    const items = useMemo(() => {
        return qcm.qcmQuestions.map((q) => ({
        name: `${q.id}-${q.bankQuestion.id}`,
        required: true
        }));
    }, [qcm]);


    const submitMutation = useMutation({
        mutationFn : (qcm : QcmEntry) => 
            studentApiCalls.submitQcm(qcm),
        onSuccess :(qcm) => {
            if(!qcm){
                toast.error('Erreur lors de la soumission du Qcm.');
                return;
            }
            
            // toast(`QCM Complété ! Vous avez obtenu un résulat de : ${qcm.score}`);
            toast.success("QCM complété", {
                description: `Vous avez obtenu une note de ${qcm.score}/10`,
            })
            console.log('qcm returned : ', qcm);

            onQcmSubmit(qcm);
            setOpen(false);
            return;
        },
        onError : (err) => {
            toast.error('Erreur lors de la soumission du Qcm.')
            console.log('submit error : ',err) 
        }
    })

    

    const handleOpenChange = (newOpen: boolean) => {
        if (newOpen) {
            const saved = localStorage.getItem(storageKey);
            
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    setSavedAnswers(parsed);
                    console.log('parsed : ', parsed)
                    const firstUnanswered = items.find((item) => !parsed[item.name]);
                    setInitialItem(firstUnanswered ? firstUnanswered.name : items[items.length - 1].name);
                } catch (error) {
                    console.error("Failed to parse saved QCM progress", error);
                    setSavedAnswers({});
                    setInitialItem(items[0]?.name || "");
                }
            } else {
                setSavedAnswers({});
                setInitialItem(items[0]?.name || "");
            }
        }
        
        setOpen(newOpen);
    };
    
    const handleFormChange = (event: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget);
        const currentAnswers = Object.fromEntries(formData.entries()) as Record<string, string>;
        localStorage.setItem(storageKey, JSON.stringify(currentAnswers));
    };

    function handleQcmSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        
        const questionsWithAnswers = qcm.qcmQuestions.map(q => {
            const itemName = `${q.id}-${q.bankQuestion.id}`;
            return {
                ...q,
                correct : formData.get(itemName) === q.bankQuestion.correctAnswer,
                selectedChoice : formData.get(itemName) as AnswerChoice,
            }
        })

        const score = questionsWithAnswers.filter(q => q.correct).length;
        
        const newQcm : QcmEntry = {
            ...qcm,
            score,
            completed : true,
            qcmQuestions : questionsWithAnswers
        }

        submitMutation.mutate(newQcm);
    }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className='w-full h-dvh p-0'>
        {open &&
        <Questionnaire
          defaultItem={initialItem}
          items={items}
          onSubmit={handleQcmSubmit}
          onChange={handleFormChange}
          className='h-dvh pt-6 pb-4'
        >
            {
                qcm.qcmQuestions.map((q) => {
                    const itemName = `${q.id}-${q.bankQuestion.id}`;
                    return (
                    <QuestionnaireItem name={itemName} key={itemName} className='h-[calc(100%-4rem)] px-2' required>
                        <DialogHeader className='px-4'>
                            <DialogTitle className='text-start flex flex-col gap-2'>
                                <span className='text-sm font-bold opacity-75'>QCM</span>
                                <span className='text-base'>{qcm.lesson!.label}</span>
                            </DialogTitle>
                            <DialogDescription/>
                        </DialogHeader>
                        <QuestionnaireProgress
                            className="w-full px-4"
                            render={(props, state) => (
                            <div {...props}>
                                <div className="mb-2 flex gap-1.5" aria-hidden="true">
                                {Array.from({ length: state.total }, (_, index) => (
                                    <span
                                        key={index}
                                        className={
                                            index < state.current
                                            ? "h-1.5 flex-1 rounded-full bg-lime-600"
                                            : "h-1.5 flex-1 rounded-full bg-muted"
                                        }
                                    />
                                ))}
                                </div>
                                <span>
                                Question {state.current} / {state.total}
                                </span>
                            </div>
                            )}
                        />
                        <p className='text-lg font-semibold my-6 px-4'>{q.bankQuestion.question}</p>
                        <div className="brand-v-scrollbar overflow-x-hidden overflow-y-auto px-4">
                            <QuestionnaireChoices>
                                <QuestionnaireChoice value={AnswerChoice.a} defaultChecked = {savedAnswers[itemName] === AnswerChoice.a}>
                                    {q.bankQuestion.answerA}
                                </QuestionnaireChoice>
                                <QuestionnaireChoice value={AnswerChoice.b} defaultChecked = {savedAnswers[itemName] === AnswerChoice.b}>
                                    {q.bankQuestion.answerB}
                                </QuestionnaireChoice>
                                <QuestionnaireChoice value={AnswerChoice.c} defaultChecked = {savedAnswers[itemName] === AnswerChoice.c}>
                                    {q.bankQuestion.answerC}
                                </QuestionnaireChoice>
                                <QuestionnaireChoice value={AnswerChoice.d} defaultChecked = {savedAnswers[itemName] === AnswerChoice.d}>
                                    {q.bankQuestion.answerD}
                                </QuestionnaireChoice>
                            </QuestionnaireChoices>
                            <QuestionnaireError/>
                        </div>
                    </QuestionnaireItem>
                    )})
            }
          <DialogFooter className='flex flex-row px-4'>
            <DialogClose asChild className='flex-1 p-0'>
              <BrandButton type="button" variant="outline" className='h-12'>
                Annuler
              </BrandButton>
            </DialogClose>
            <QuestionnaireActions className='flex-1 flex'>
              <QuestionnaireNext className='w-full h-12'>Confimer</QuestionnaireNext>
              <QuestionnaireSubmit className='w-full h-12'>Envoyer</QuestionnaireSubmit>
            </QuestionnaireActions>
          </DialogFooter>
        </Questionnaire>
        }
      </DialogContent>
    </Dialog>
  )
}

export default QcmQuestionnaire