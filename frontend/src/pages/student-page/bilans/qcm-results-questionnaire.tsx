import { AnswerChoice } from '@/api/api.types'
import type { QcmEntry } from '@/api/student/apiCalls'
import { BrandButton } from '@/components/brand-button'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
  QuestionnaireProgress,
  QuestionnaireSkip,
} from "@/components/ui/questionnaire"
import { useMemo, useState } from 'react'


const QcmResultsQuestionnaire = ({qcm} : {qcm : QcmEntry}) => {
    const [open, setOpen] = useState(false);
    const [currentItemName, setCurrentItemName] = useState(`${qcm.qcmQuestions[0].id}-${qcm.qcmQuestions[0].bankQuestion.id}`)
    const items = useMemo(() => {
        return qcm.qcmQuestions.map((q) => ({
        name: `${q.id}-${q.bankQuestion.id}`,
        required: false
        }));
    }, [qcm]);

    const answers = useMemo(() => {
        const rec : Record<string, string> = {};
        for(const q of qcm.qcmQuestions){
            rec[`${q.id}-${q.bankQuestion.id}`] = q.selectedChoice?? '';
        }
        return rec;
    },[qcm])

    const onOpenChange = (newOpen : boolean) => {
        setCurrentItemName(`${qcm.qcmQuestions[0].id}-${qcm.qcmQuestions[0].bankQuestion.id}`);
        setOpen(newOpen);
    }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <BrandButton className='w-full mt-4 text-base h-12'>Voir les résultats</BrandButton>
      </DialogTrigger>
      <DialogContent className='w-full h-dvh md:max-w-4xl md:h-fit'>
        {open &&
        <Questionnaire
          defaultItem={items[0].name}
          items={items}
          onItemChange={setCurrentItemName}
        >
            {
                qcm.qcmQuestions.map((q) => {
                    const itemName = `${q.id}-${q.bankQuestion.id}`;
                    return (
                    <QuestionnaireItem name={itemName} key={itemName} className='pb-18'>
                        <DialogHeader>
                            <DialogTitle className='text-start flex flex-col gap-2'>
                                <div className='flex items-center gap-4'>
                                    <span className='text-sm font-bold opacity-75'>QCM</span>
                                    <span className='font-bold text-sm px-4 py-1 rounded-md bg-zinc-900 text-white'>Note : {qcm.score} / {qcm.qcmQuestions.length}</span>
                                </div>
                                <span className='text-base'>{qcm.lesson!.label}</span>
                            </DialogTitle>
                            <DialogDescription/>
                        </DialogHeader>
                        <QuestionnaireProgress
                            className="w-full"
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
                        <p className='text-lg font-semibold my-6'>{q.bankQuestion.question}</p>
                        <QuestionnaireChoices>
                            <QuestionnaireChoice value={AnswerChoice.a} defaultChecked = {answers[itemName] === AnswerChoice.a} disabled className={`${q.correct?'data-checked:bg-lime-600 data-checked:text-white' : 'data-checked:bg-red-500 data-checked:text-white'} ${q.bankQuestion.correctAnswer === AnswerChoice.a?'bg-lime-600 text-white' : ''}`}>
                                {q.bankQuestion.answerA}
                            </QuestionnaireChoice>
                            <QuestionnaireChoice value={AnswerChoice.b} defaultChecked = {answers[itemName] === AnswerChoice.b} disabled className={`${q.correct?'data-checked:bg-lime-600 data-checked:text-white' : 'data-checked:bg-red-500 data-checked:text-white'} ${q.bankQuestion.correctAnswer === AnswerChoice.b?'bg-lime-600 text-white' : ''}`}>
                                {q.bankQuestion.answerB}
                            </QuestionnaireChoice>
                            <QuestionnaireChoice value={AnswerChoice.c} defaultChecked = {answers[itemName] === AnswerChoice.c} disabled className={`${q.correct?'data-checked:bg-lime-600 data-checked:text-white' : 'data-checked:bg-red-500 data-checked:text-white'} ${q.bankQuestion.correctAnswer === AnswerChoice.c?'bg-lime-600 text-white' : ''}`}>
                                {q.bankQuestion.answerC}
                            </QuestionnaireChoice>
                            <QuestionnaireChoice value={AnswerChoice.d} defaultChecked = {answers[itemName] === AnswerChoice.d} disabled className={`${q.correct?'data-checked:bg-lime-600 data-checked:text-white' : 'data-checked:bg-red-500 data-checked:text-white'} ${q.bankQuestion.correctAnswer === AnswerChoice.d?'bg-lime-600 text-white' : ''}`}>
                                {q.bankQuestion.answerD}
                            </QuestionnaireChoice>
                        </QuestionnaireChoices>
                        <div className='mt-6'>
                            <span className='font-bold'>Explication</span>
                            <p className=' font-medium'>{q.bankQuestion.explanation}</p>
                        </div>
                        <QuestionnaireError/>
                    </QuestionnaireItem>
                    )})
            }
          <DialogFooter className=' absolute bottom-6 left-0 px-6 w-full'>
            {
                currentItemName === items[items.length - 1].name &&
                <DialogClose asChild className=''>
                    <BrandButton type="button" variant="default" className='h-12 w-full'>
                        Fermer
                    </BrandButton>
                </DialogClose>
            }
            <QuestionnaireActions className='flex-1 flex'>
                {
                    currentItemName !== items[items.length - 1].name &&
                    <QuestionnaireSkip variant={'default'} className='w-full h-12'>Question suivante</QuestionnaireSkip>
                }
            </QuestionnaireActions>
          </DialogFooter>
        </Questionnaire>
        }
      </DialogContent>
    </Dialog>
  )
}

export default QcmResultsQuestionnaire