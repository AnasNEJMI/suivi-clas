import { AnswerChoice } from '@/api/api.types';
import type { QcmEntry } from '@/api/student/apiCalls';
import { studentApiCalls } from '@/api/student/apiCalls';
import { BrandButton } from '@/components/brand-button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
} from '@/components/ui/questionnaire';
import { useMutation } from '@tanstack/react-query';
import { HelpCircleIcon, CheckCircle2Icon} from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

const QcmQuestionnaire = ({
  qcm,
  onQcmSubmit,
  children,
}: {
  qcm: QcmEntry;
  onQcmSubmit: (qcm: QcmEntry) => void;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [savedAnswers, setSavedAnswers] = useState<Record<string, string>>({});
  const [initialItem, setInitialItem] = useState<string>('');

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

  const onOpenChange = (newOpen: boolean) => {
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


  const handleSelectChoice = (itemName: string, choice: string) => {
    const updatedAnswers = {
      ...savedAnswers,
      [itemName]: choice,
    };
    setSavedAnswers(updatedAnswers);

    // Save selection to localStorage
    localStorage.setItem(
      storageKey,
      JSON.stringify({
        answers: updatedAnswers,
        lastItem: itemName,
      })
    );
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

  const totalAnswered = Object.keys(savedAnswers).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full h-dvh p-2 rounded-none overflow-hidden border-none bg-slate-50/95 dark:bg-slate-950 font-outfit shadow-2xl backdrop-blur-md">
        {open && (
          <Questionnaire
            defaultItem={initialItem || items[0]?.name}
            items={items}
            className="h-dvh pt-6"
            onSubmit={handleQcmSubmit}
            onChange={handleFormChange}
          >
            {qcm.qcmQuestions.map((q) => {
              const itemName = `${q.id}-${q.bankQuestion.id}`;
              const selectedAnswer = savedAnswers[itemName] || q.selectedChoice;
              const isAnswered = Boolean(selectedAnswer);

              return (
                <QuestionnaireItem
                  
                  name={itemName}
                  key={itemName}
                  className="h-[calc(100%-5rem)] px-4 md:px-8 overflow-y-auto brand-v-scrollbar"
                >
                  {/* Header Banner */}
                  <DialogHeader className="px-0 pb-2 mt-8">
                    <DialogTitle className="text-start flex flex-col gap-3">
                      <div className="flex items-center justify-between w-full gap-2">
                        <span className="text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200/60 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800/50">
                          QCM en cours
                        </span>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-slate-100 text-xs font-semibold shadow-sm dark:bg-slate-800">
                          <HelpCircleIcon className="size-3.5 text-indigo-400" />
                          <span>
                            Progression: <strong className="text-white">{totalAnswered}</strong> / {qcm.qcmQuestions.length}
                          </span>
                        </div>
                      </div>
                      <span className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
                        {qcm.lesson?.label}
                      </span>
                    </DialogTitle>
                    <DialogDescription />
                  </DialogHeader>

                  {/* Progress Indicator */}
                  <QuestionnaireProgress
                    className="w-full my-2"
                    render={(props, state) => (
                      <div {...props}>
                        <div className="mb-2 flex gap-1.5" aria-hidden="true">
                          {Array.from({ length: state.total }, (_, index) => (
                            <span
                              key={index}
                              className={
                                index < state.current
                                  ? 'h-2 flex-1 rounded-full bg-indigo-600 dark:bg-indigo-500 shadow-sm transition-all duration-300'
                                  : 'h-2 flex-1 rounded-full bg-slate-200/80 dark:bg-slate-800/80'
                              }
                            />
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
                          <span>
                            Question {state.current} sur {state.total}
                          </span>
                          {isAnswered ? (
                            <span className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1 font-semibold">
                              <CheckCircle2Icon className="size-3.5" /> Choix enregistré
                            </span>
                          ) : (
                            <span className="text-slate-400 dark:text-slate-500 font-medium">
                              Sélectionnez une réponse
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  />

                  {/* Question Stem Box */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 my-4">
                    <p className="text-lg font-bold text-slate-900 leading-snug">
                      {q.bankQuestion.question}
                    </p>
                  </div>

                  {/* Choice Buttons */}
                  <QuestionnaireChoices>
                    {[
                      { key: AnswerChoice.a, text: q.bankQuestion.answerA },
                      { key: AnswerChoice.b, text: q.bankQuestion.answerB },
                      { key: AnswerChoice.c, text: q.bankQuestion.answerC },
                      { key: AnswerChoice.d, text: q.bankQuestion.answerD },
                    ].map(({ key, text }) => {
                      const isSelected = selectedAnswer === key;

                      let choiceStyle =
                        'border-2 border-slate-200/90 bg-white text-slate-700 hover:border-indigo-300 hover:bg-slate-50/50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200 dark:hover:border-indigo-700 dark:hover:bg-slate-800/50';

                      if (isSelected) {
                        choiceStyle =
                          'border-2 border-indigo-600 bg-indigo-50/70 text-indigo-950 font-bold dark:bg-indigo-950/50 dark:text-indigo-100 dark:border-indigo-500 shadow-sm';
                      }

                      return (
                        <QuestionnaireChoice
                          key={key}
                          value={key}
                          defaultChecked={isSelected}
                          onClick={() => handleSelectChoice(itemName, key)}
                          className={`p-3 rounded-2xl text-sm md:text-base transition-all duration-200 flex flex-row items-center gap-4 cursor-pointer ${choiceStyle}`}
                        >
                          <span className="pr-3 leading-relaxed flex-1">{text}</span>
                          <div
                            className={`size-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                              isSelected
                                ? 'border-indigo-600 bg-indigo-600 text-white dark:border-indigo-500 dark:bg-indigo-500'
                                : 'border-slate-300 dark:border-slate-700'
                            }`}
                          >
                            {isSelected && <CheckCircle2Icon className="size-4" />}
                          </div>
                        </QuestionnaireChoice>
                      );
                    })}
                  </QuestionnaireChoices>

                  <QuestionnaireError />
                </QuestionnaireItem>
              );
            })}

            {/* Modal Bottom Actions */}
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
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QcmQuestionnaire;