import { animatorApiCalls } from '@/api/animator/apiCalls'
import { animatorKeys } from '@/api/animator/query-keys'
import type {LessonsByLevelEntry, SeanceBilanEntry, SeanceEntry, SeanceQueryParams,} from '@/api/animator/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import SeanceStatusCards from './seance-status-cards'
import BilansSection from './bilans-section'

interface BilansFormProps{
  params:        SeanceQueryParams,
  lessonsByLevel: LessonsByLevelEntry[]
}

const SeancePanel = ({
  params,
  lessonsByLevel
} : BilansFormProps) => {
  
  const queryClient = useQueryClient();
  const queryKey = animatorKeys.detail(params);

  const {data : seance, isLoading, isError} = useQuery({
    queryKey,
    queryFn : () => animatorApiCalls.fetchSeance(params),
    staleTime : 0,
    gcTime : 45 * 60 * 1000
  })

  const submitMutation = useMutation({
    mutationFn : () => animatorApiCalls.submitSeance(params),
    onSuccess : () => {
      queryClient.invalidateQueries({queryKey});
      toast.success('Séance supprimée avec succès.');
    },
    onError : () => toast.error('Erreur lors de l\'enregistrement de la séance.'),
  })
  
  const deleteMutation = useMutation({
    mutationFn : () => animatorApiCalls.deleteSeance(params),
    onSuccess : () => {
      queryClient.setQueryData(queryKey, null);
      toast.success('Séance supprimée avec succès.');
    },
    onError : () => toast.error('Erreur lors de la suppression de la séance.'),
  })

  function handleBilanSubmitted(studentId : number, bilan : SeanceBilanEntry){
    queryClient.setQueryData<SeanceEntry | null>(queryKey, (prev) => 
      prev 
      ? {
        ...prev,
        students : prev.students.map(s => 
          s.id === studentId ? {...s, bilan} : s
        ),
      }
      : null
    )
  }

  return (
    <>
      <SeanceStatusCards
        seance = {seance ?? null}
        isLoading = {isLoading}
        isError = {isError}
        isSubmitting = {submitMutation.isPending}
        isDeleting = {deleteMutation.isPending}
        onSubmit = {() => submitMutation.mutate()}
        onDelete = {() => deleteMutation.mutate()}
        />
      {
        !isLoading && seance &&
        <BilansSection
          seance = {seance ?? null}
          animatorId = {params.animatorId}
          lessonsByLevel = {lessonsByLevel}
          onBilanSubmitted = {handleBilanSubmitted}  
        />
      }
      {/* {
        !isGeneralInfoFormEnabled && !isSubmittingSeance && !isFetchingSeance && !isDeletingSeance && currentSeance &&
        <Card className={cn(className, `font-outfit border-none shadow-card mt-6`)}>
          <CardHeader>
            <CardTitle className='flex items-center justify-between'>
              <div className='flex justify-center gap-2'>
                <div className='w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white border border-white'>2</div>
                <span className='text-xl lg:text-2xl'>Bilans</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-2">
            <form id = 'bilans-form' onSubmit={form.handleSubmit(onSubmit)} className = {``}>
              <FieldGroup className='gap-4!'>
                <Controller
                  name='studentId'
                  control={form.control}
                  render = {({field, fieldState}) => (
                    <Field data-invalid = {fieldState.invalid}>
                      <FieldLabel htmlFor="bilans-form-student">Etudiant</FieldLabel>
                      <ToggleGroup
                        type="single"
                        value={field.value.toString()}
                        onValueChange={setStudentId}
                        id="bilans-form-student"
                        aria-invalid={fieldState.invalid}
                        variant="outline"
                        spacing={1}
                        className='w-full items-center justify-start flex-wrap'
                      >
                        {
                          currentSeance?.students.map((student, index) => (
                            <ToggleGroupItem
                              key={index}  
                              value={student.id.toString()}
                              aria-label={`${student.firstName} ${student.lastName}`}
                              className="flex h-8 px-2 items-center justify-center rounded-lg"
                            >
                              <span className="text-sm leading-none">{student.firstName} {student.lastName}</span>
                              {
                                student.bilan && <CheckIcon className='text-lime-400' size={12}/>
                              }
                            </ToggleGroupItem>
                          ))
                        }
                      </ToggleGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                >
                </Controller>
                <Controller
                  name = 'presence'
                  control={form.control}
                  render = {({field, fieldState}) => (
                    <Field data-invalid = {fieldState.invalid}>
                      <div className='flex justify-between gap-6'>
                        <FieldLabel htmlFor="bilans-form-presence">Présence</FieldLabel>
                        <ToggleGroup
                          type="single"
                          value={field.value === true? 'présent': 'absent'}
                          onValueChange={setPresence}
                          id="bilans-form-presence"
                          disabled = { bilanStudentId < 0 }
                          aria-invalid={fieldState.invalid}
                          variant="outline"
                          className='w-full md:max-w-xs items-center justify-end gap-4'
                        >
                          {
                              ['présent', 'absent'].map((presence, index) => (
                              <ToggleGroupItem
                                key={index}  
                                value={presence}
                                aria-label={presence}
                                className="flex-1 flex h-10 flex-col items-center justify-center rounded-xl"
                              >
                                <span className="text-base leading-none font-light capitalize">{presence}</span>
                              </ToggleGroupItem>
                            ))
                          }
                        </ToggleGroup>
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                >
                </Controller>
                <Controller
                  name = 'subjectId'
                  control={form.control}
                  render = {({field, fieldState}) => (
                    <Field data-invalid = {fieldState.invalid}>
                      <div className='flex flex-col gap-6'>
                        <FieldLabel htmlFor="bilans-form-subject">Matière</FieldLabel>
                        <ToggleGroup
                          type="single"
                          value={field.value.toString()}
                          onValueChange={setSubjectId}
                          id="bilans-form-subject"
                          aria-invalid={fieldState.invalid}
                          disabled = {bilanStudentId < 0 || !bilanPresence || isSubmittingBilan}
                          variant="outline"
                          className=' items-center flex-wrap gap-2'
                        >
                          {
                            selectedSubjects.map((subject, index) => (
                              <ToggleGroupItem
                                key={index}  
                                value={subject.id.toString()}
                                aria-label={subject.label}
                                className="flex h-10 flex-col items-center justify-center rounded-xl"
                              >
                                <span className="text-sm leading-none font-light uppercase">{subject.label}</span>
                              </ToggleGroupItem>
                            ))
                          }
                        </ToggleGroup>
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                >
                </Controller>
                <Controller
                  name = 'lessonId'
                  control={form.control}
                  render = {({field, fieldState}) => (
                    <Field data-invalid = {fieldState.invalid}>
                      <div className='flex justify-between gap-6'>
                        <FieldLabel htmlFor="bilans-form-lesson">Leçon</FieldLabel>
                        <Select value={field.value.toString()} onValueChange={updatelessonId}>
                          <SelectTrigger
                            disabled = {bilanStudentId < 0 || bilanSubjectId < 0 || !bilanPresence || isSubmittingBilan}
                            className="w-full md:flex-1 md:max-w-xs text-base truncate h-10!">
                            <SelectValue placeholder = {field.value}/>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {
                                selectedLessons.map((lesson, index) => (
                                  <SelectItem key={index} value={lesson.id.toString()} className='text-base'>{lesson.label}</SelectItem>
                                ))
                              }
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                >
                </Controller>
                <Controller
                  name = 'summary'
                  control={form.control}
                  render = {({field, fieldState}) => (
                    <Field data-invalid = {fieldState.invalid}>
                      <FieldLabel htmlFor="bilans-form-summary">Bilan</FieldLabel>
                      <Textarea
                        {...field}
                        id="bilans-form-summary"
                        placeholder="Résumé de la séance"
                        disabled = { bilanStudentId < 0 || bilanSubjectId < 0 || !bilanPresence || bilanLessonId < 0 || isSubmittingBilan}
                        aria-invalid={fieldState.invalid}
                        autoComplete='off'
                        required
                        className="bg-white focus-visible:ring-lime-500/50 focus-visible:border-lime-200  border-zinc-200 text-base!"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                >
                </Controller>
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter>
            <Field orientation="horizontal" className="flex">
              <Button size='lg' type="button" variant="outline" onClick={() => form.reset()} className="font-medium text-base py-6 flex-1">
                  Annuler
              </Button>
              <Button type="submit" size='lg' form="bilans-form" disabled = {isSubmittingBilan} className="font-medium text-base py-6 flex-1">
                  {
                    isSubmittingBilan ? 'Chargement ...' : 'Soumettre'
                  }
              </Button>
            </Field>
          </CardFooter>
        </Card>
      } */}
    </>
  )
}

export default SeancePanel