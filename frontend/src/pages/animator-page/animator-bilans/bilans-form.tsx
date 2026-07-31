import { animatorApiCalls } from '@/api/animator/apiCalls'
import type { LessonEntry, LessonsByLevelEntry, ScolarYearEntry, SeanceEntry, SeanceStudentEntry, StudentEntry, SubjectEntry } from '@/api/animator/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { bilanFormSchema } from '@/lib/schemas/bilans-bilan.schema'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckIcon } from 'lucide-react'
import { useState, type Dispatch, type SetStateAction} from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'
import type z from 'zod'

interface BilansFormProps{
  className ?: string,
  lessonsByLevel : LessonsByLevelEntry[],
  isGeneralInfoFormEnabled : boolean,
  isDeletingSeance : boolean,
  isSubmittingSeance : boolean,
  isFetchingSeance : boolean,
  animatorId : number,
  scolarYears : ScolarYearEntry[],
  currentSeance : SeanceEntry | null,
  setCurrentSeance :  Dispatch<SetStateAction<SeanceEntry | null>>
}

const BilansForm = ({
  className,
  lessonsByLevel,
  isGeneralInfoFormEnabled,
  isDeletingSeance,
  isSubmittingSeance,
  isFetchingSeance,
  scolarYears,
  animatorId,
  currentSeance,
  setCurrentSeance,
} : BilansFormProps) => {
  const [isSubmittingBilan, setIsSubmittingBilan] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<SubjectEntry[]>([])
  const [selectedLessons, setSelectedLessons] = useState<LessonEntry[]>([])
  const [selectedStudent, setSelectedStudent] = useState<SeanceStudentEntry | undefined>(undefined)
  const form = useForm<z.infer<typeof bilanFormSchema>>({
    resolver : zodResolver(bilanFormSchema),
    defaultValues : {
      studentId : -1,
      subjectId : -1,
      lessonId : -1,
      summary : '',
      presence : true,
    }
  })

  async function onSubmit(data : z.infer<typeof bilanFormSchema>){
    try{
      setIsSubmittingBilan(true);
      console.log('submitting this data : ', data);
      const bilan = await animatorApiCalls.submitBilan({
        animatorId,
        lessonId : data.lessonId,
        seanceId : currentSeance!.id,
        studentId : data.studentId,
        date : currentSeance!.date,
        presence : data.presence,
        summary: data.summary
      })

      if(bilan){
        console.log('submitted bilan successfully : ',bilan);
      }

      
      toast.success("Bilan soumis avec succès !")
      
      const newSeance = {
        id : currentSeance!.id,
        animatorId : currentSeance!.animatorId,
        classId : currentSeance!.classId,
        date : currentSeance!.date,
        scolarYearId : currentSeance!.scolarYearId,
        students : currentSeance!.students.map(student => {
          if(student.id === data.studentId){
            student.bilan = bilan;
          }
          return student;
        })
      }

      setCurrentSeance(newSeance);

    }catch(error){
      console.error(error);
    }finally{
      setIsSubmittingBilan(false);
    }
  }


  function updateFormValue<T extends string | number | boolean>(
    label :  "studentId" | "subjectId" | "lessonId" | "summary" | "presence",
    value : T,
    isInvalid : () => boolean = () => !value){

      console.log(`${label} : `, value);
      if(isInvalid()) return;
      form.setValue(label, value);
      console.log('form updated : ', form.getValues())
  }
  
  const setStudentId = (value : string) => {
    const studentId = parseInt(value);

    updateFormValue<number>('studentId', studentId);

    const studentEntry = currentSeance!.students.find((student) => student.id === studentId);
    console.log('studentEntry :',studentEntry)
    setSelectedStudent(studentEntry)
    if(studentEntry){
      const levelId = studentEntry.level.id
      const subjects = lessonsByLevel.find(l => l.id = levelId)!.subjects;
      setSelectedSubjects(subjects);
      
      if(studentEntry.bilan){
        form.setValue('summary', studentEntry.bilan.summary);
        form.setValue('presence', studentEntry.bilan.presence);
        if(studentEntry.bilan.lesson){
          const lessonId = studentEntry.bilan.lesson.id;
          const subjectId = studentEntry.bilan.lesson.subject!.id;
          const subjectEntry = subjects.find((sub) => sub.id === subjectId);
          console.log('subjectEntry : ',subjectEntry);
          if(subjectEntry){
            setSelectedLessons(subjectEntry.lessons);
            form.setValue('lessonId', lessonId);
            form.setValue('subjectId', subjectId);
          }
        }else{
          form.setValue('lessonId', -1);
          form.setValue('subjectId', -1);
        }
      }else{
        form.setValue('lessonId', -1);
        form.setValue('subjectId', -1);
        form.setValue('presence', true);
        form.setValue('summary', '');
      }
    }
  }
  const setPresence = (value : string) => {
    updateFormValue<boolean>('presence', value === 'présent'? true : false, () => false);
    form.setValue('lessonId', -1);
    form.setValue('subjectId', -1);
    form.setValue('summary', '');
  }

  const setSubjectId = (value : string) => {
    const subjectId = parseInt(value);
    updateFormValue('subjectId', parseInt(value));
    form.setValue('lessonId', -1);
    form.setValue('summary', '');

    const subjectEntry = selectedSubjects.find((sub) => sub.id === subjectId);

    if(subjectEntry){
      setSelectedLessons(subjectEntry.lessons);
    }
    
  }

  const updatelessonId = (value : string) => updateFormValue<number>('lessonId', parseInt(value));

  const bilanStudentId = useWatch({
    control: form.control,
    name: "studentId",
  });

  const bilanPresence = useWatch({
    control: form.control,
    name: "presence",
  });

  const bilanSubjectId = useWatch({
    control: form.control,
    name: "subjectId",
  });

  const bilanLessonId = useWatch({
    control: form.control,
    name: "lessonId",
  });

  return (
    <>
      {
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
      }
    </>
  )
}

export default BilansForm