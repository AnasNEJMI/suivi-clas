import { AnswerChoice } from '@/api/api.types';
import type { QcmEntry } from '@/api/student/apiCalls';
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
  QuestionnaireProgress,
  QuestionnaireSkip,
} from '@/components/ui/questionnaire';
import { CheckCircle2Icon, LightbulbIcon, TrophyIcon, XCircleIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

const QcmResultsQuestionnaire = ({
  qcm,
  children,
}: {
  qcm: QcmEntry;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [currentItemName, setCurrentItemName] = useState(
    `${qcm.qcmQuestions[0].id}-${qcm.qcmQuestions[0].bankQuestion.id}`
  );

  const items = useMemo(() => {
    return qcm.qcmQuestions.map((q) => ({
      name: `${q.id}-${q.bankQuestion.id}`,
      required: false,
    }));
  }, [qcm]);

  const answers = useMemo(() => {
    const rec: Record<string, string> = {};
    for (const q of qcm.qcmQuestions) {
      rec[`${q.id}-${q.bankQuestion.id}`] = q.selectedChoice ?? '';
    }
    return rec;
  }, [qcm]);

  const onOpenChange = (newOpen: boolean) => {
    setCurrentItemName(`${qcm.qcmQuestions[0].id}-${qcm.qcmQuestions[0].bankQuestion.id}`);
    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full h-dvh p-2 rounded-none overflow-hidden border-none bg-slate-50 dark:bg-slate-950 font-outfit shadow-2xl">
        {open && (
          <Questionnaire
            defaultItem={items[0].name}
            items={items}
            onItemChange={setCurrentItemName}
            className="h-dvh pt-6"
          >
            {qcm.qcmQuestions.map((q) => {
              const itemName = `${q.id}-${q.bankQuestion.id}`;
              const isUserCorrect = q.correct;

              return (
                <QuestionnaireItem
                  name={itemName}
                  key={itemName}
                  className="h-[calc(100%-5rem)] px-4 md:px-6 overflow-y-auto brand-v-scrollbar"
                >
                  {/* Game Top Score Banner */}
                  <DialogHeader className="px-0 pb-2 mt-8">
                    <DialogTitle className="text-start flex flex-col gap-3">
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                          Révision du QCM
                        </span>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm">
                          <TrophyIcon className="size-4 text-amber-400 fill-amber-400" />
                          <span>
                            Score: {qcm.score} / {qcm.qcmQuestions.length}
                          </span>
                        </div>
                      </div>
                      <span className="text-lg font-extrabold text-slate-900">
                        {qcm.lesson?.label}
                      </span>
                    </DialogTitle>
                    <DialogDescription />
                  </DialogHeader>

                  {/* Segmented Step Progress Bar */}
                  <QuestionnaireProgress
                    className="w-full my-2"
                    render={(props, state) => (
                      <div {...props}>
                        <div className="mb-2 flex gap-2" aria-hidden="true">
                          {Array.from({ length: state.total }, (_, index) => (
                            <span
                              key={index}
                              className={
                                index < state.current
                                  ? 'h-2 flex-1 rounded-full bg-indigo-600 transition-all'
                                  : 'h-2 flex-1 rounded-full bg-slate-200 dark:bg-slate-800'
                              }
                            />
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                          <span>
                            Question {state.current} sur {state.total}
                          </span>
                          {isUserCorrect ? (
                            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                              <CheckCircle2Icon className="size-3.5" /> Réponse Correcte
                            </span>
                          ) : (
                            <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
                              <XCircleIcon className="size-3.5" /> À revoir
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  />

                  {/* Question Stem Box */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/80 my-4">
                    <p className="text-base font-bold text-slate-900 leading-snug">
                      {q.bankQuestion.question}
                    </p>
                  </div>

                  {/* Answer Choice Buttons with High Visual Contrast */}
                  <QuestionnaireChoices>
                    {[
                      { key: AnswerChoice.a, text: q.bankQuestion.answerA },
                      { key: AnswerChoice.b, text: q.bankQuestion.answerB },
                      { key: AnswerChoice.c, text: q.bankQuestion.answerC },
                      { key: AnswerChoice.d, text: q.bankQuestion.answerD },
                    ].map(({ key, text }) => {
                      const isCorrectAnswer = q.bankQuestion.correctAnswer === key;
                      const isSelected = answers[itemName] === key;

                      let choiceStyle =
                        'border-2 border-slate-200 bg-white text-slate-700 opacity-60';

                      if (isCorrectAnswer) {
                        choiceStyle =
                          'border-2 border-emerald-500 bg-emerald-50 text-emerald-950 font-bold opacity-100 shadow-sm';
                      } else if (isSelected && !isCorrectAnswer) {
                        choiceStyle =
                          'border-2 border-rose-500 bg-rose-50 text-rose-950 font-bold opacity-100';
                      }

                      return (
                        <QuestionnaireChoice
                          key={key}
                          value={key}
                          defaultChecked={isSelected}
                          disabled
                          className={`p-3 rounded-2xl text-sm transition-all flex items-center justify-between ${choiceStyle}`}
                        >
                          <span className="pr-2 flex-1">{text}</span>
                          {isCorrectAnswer && (
                            <CheckCircle2Icon className="size-5 text-emerald-600 shrink-0" />
                          )}
                          {isSelected && !isCorrectAnswer && (
                            <XCircleIcon className="size-5 text-rose-600 shrink-0" />
                          )}
                        </QuestionnaireChoice>
                      );
                    })}
                  </QuestionnaireChoices>

                  {/* Explanation Card */}
                  <div className="mt-5 p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-slate-800 dark:text-slate-200">
                    <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-extrabold text-xs uppercase tracking-wider mb-1.5">
                      <LightbulbIcon className="size-4 fill-amber-400 text-amber-600" />
                      Explication
                    </div>
                    <p className="text-xs md:text-sm font-medium leading-relaxed">
                      {q.bankQuestion.explanation}
                    </p>
                  </div>

                  <QuestionnaireError />
                </QuestionnaireItem>
              );
            })}

            {/* Modal Bottom Actions */}
            <DialogFooter className="px-6 py-6 pt-8 bg-white border-t border-slate-200 flex items-center justify-between gap-3 w-full">
              {currentItemName === items[items.length - 1].name ? (
                <DialogClose asChild>
                  <BrandButton
                    type="button"
                    variant="default"
                    className="h-12 w-full font-bold text-sm rounded-xl"
                  >
                    Fermer la révision
                  </BrandButton>
                </DialogClose>
              ) : (
                <QuestionnaireActions className="w-full flex justify-end">
                  <QuestionnaireSkip
                    variant="default"
                    className="w-full h-12 rounded-xl font-bold text-sm"
                  >
                    Question suivante ➔
                  </QuestionnaireSkip>
                </QuestionnaireActions>
              )}
            </DialogFooter>
          </Questionnaire>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QcmResultsQuestionnaire;