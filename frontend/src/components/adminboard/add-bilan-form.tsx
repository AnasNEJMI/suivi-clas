import { Controller, useForm, useWatch } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field'
import type z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {useState, type SetStateAction } from 'react'
import { addBilanSchema } from '@/lib/schemas/addBilan.schema'
import { Calendar } from '../ui/calendar'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { format } from 'date-fns'
import { ChevronDownIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'
import { CLASS_NAMES} from '@/lib/types/data.types'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import type { User } from '@/api/auth'
import { requestAddBilan} from '@/api/admin'
import { Textarea } from '../ui/textarea'
import SuccessToast from '../toasts/success-toast'
import type { Lesson } from '@/api/api.types'

interface AddBilanFormProps {
  className ?: string,
  users : User[],
  lessons : Lesson[],
  subjects : string[]
}

const AddBilanForm = ({className, users, lessons, subjects} : AddBilanFormProps) => {
    const [isAddingBilan, setIsAddingBilan] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState<User[]>([])
    const [selectedLessons, setSelectedLessons] = useState<Lesson[]>([])
    
    const form = useForm<z.infer<typeof addBilanSchema>>({
      resolver : zodResolver(addBilanSchema),
      defaultValues : {
        date : new Date(),
        className : '',
        studentId : -1,
        subject : '',
        lessonId : -1,
        summary : '',
        presence : false,
      }
    })

    const bilanClassName = useWatch({
      control: form.control,
      name: "className",
    });

    const bilanStudentId = useWatch({
      control: form.control,
      name: "studentId",
    });

    const bilanSubject = useWatch({
      control: form.control,
      name: "subject",
    });
    
    const bilanPresence = useWatch({
      control: form.control,
      name: "presence",
    });

    const bilanLessonId = useWatch({
      control: form.control,
      name: "lessonId",
    });
    
    function updateFormValue<T extends string | number | boolean | Date>(
      label : "className" | "date" | "studentId" | "subject" | "lessonId" | "summary" | "presence",
      value : T,
      isInvalid : () => boolean = () => !value){

        console.log(`${label} : `, value);
        if(isInvalid()) return;
        form.setValue(label, value);
        console.log('form updated : ', form.getValues())
    }

    function filterAndUpdate<T>(array : T[], condition : (item : T) => boolean, update : (value: SetStateAction<T[]>) => void){
      const filtered = array.filter(lesson => condition(lesson));
      update(filtered);
    }

    const setClassName = (value : string) => {
        updateFormValue('className', value);
        form.setValue('studentId', -1);
        form.setValue('lessonId', -1);
        form.setValue('subject', '');
        form.setValue('summary', '');
        filterAndUpdate(users,(user : User) => user.role === 'student' && user.class?.label === value, setSelectedStudents);
        setSelectedLessons([]);
      }

    const setSubject = (value : string) => {
      updateFormValue('subject', value);
      form.setValue('lessonId', -1);
      form.setValue('summary', '');
      filterAndUpdate(lessons,(lesson : Lesson) => lesson.class?.label === bilanClassName && lesson.subject === value, setSelectedLessons);
    }

    const setPresence = (value : string) => {
       updateFormValue<boolean>('presence', value === 'présent'? true : false, () => false);
       form.setValue('lessonId', -1);
       form.setValue('subject', '');
       form.setValue('summary', '');
       setSelectedLessons([]);
    }

    const updateDate = (value : Date) => updateFormValue<Date>('date', value);
    const updateStudentId = (value : string) => updateFormValue<number>('studentId', parseInt(value));
    const updatelessonId = (value : string) => updateFormValue<number>('lessonId', parseInt(value));
  
  
    async function onSubmit(data : z.infer<typeof addBilanSchema>){
      setIsAddingBilan(true);
      try{
        const bilan = await requestAddBilan({
          userId : data.studentId,
          date : data.date,
          lessonId : data.lessonId,
          subject : data.subject,
          presence : data.presence,
          summary : data.summary,
        });

        console.log('bilan submitted successfully : ', JSON.stringify(bilan, null));
        SuccessToast({
          message : 'Bilan soumis avec succès !',
        })
      }catch(error){
        console.error(error);
      }finally{
        setIsAddingBilan(false);
      }
    }

  return (
    <Card className={cn(className, 'font-outfit')}>
        <CardHeader>
          <CardTitle>Ajouter un bilan</CardTitle>
          <CardDescription>
            Sumettre les données du bilan en respectant l'ordre établi.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-2">
          <form id = 'form-add-bilan' onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name = 'date'
                control={form.control}
                render = {({field, fieldState}) => (
                  <Field data-invalid = {fieldState.invalid}>
                    <div className='flex justify-between gap-6'>
                      <FieldLabel htmlFor="form-add-bilan-date">Date</FieldLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            size='lg'
                            variant="outline"
                            data-empty={!field.value}
                            className="flex-1 md:w-full md:max-w-xs data-[empty=true]:text-muted-foreground justify-between text-left font-normal text-base"
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <ChevronDownIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            id="form-add-bilan-date"
                            mode="single"
                            selected={field.value}
                            onSelect={updateDate}
                            className="rounded-lg border"
                            disabled = {isAddingBilan}
                            aria-invalid={fieldState.invalid}
                            required
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              >
              </Controller>
              <Controller
                name = 'className'
                control={form.control}
                render = {({field, fieldState}) => (
                  <Field data-invalid = {fieldState.invalid}>
                    <div className='flex justify-between gap-6'>
                      <FieldLabel htmlFor="form-add-bilan-classname">Classe</FieldLabel>
                      <ToggleGroup
                        type="single"
                        value={field.value}
                        onValueChange={setClassName}
                        id="form-add-bilan-classname"
                        aria-invalid={fieldState.invalid}
                        variant="outline"
                        className='w-full md:max-w-xs items-center justify-end'
                      >
                        {
                          CLASS_NAMES.map((className, index) => (
                            <ToggleGroupItem
                              key={index}  
                              value={className}
                              aria-label={className}
                              className="flex-1 flex h-10 flex-col items-center justify-center rounded-xl"
                            >
                              <span className="text-base leading-none font-light">{className}</span>
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
                name = 'studentId'
                control={form.control}
                render = {({field, fieldState}) => (
                  <Field data-invalid = {fieldState.invalid}>
                    <FieldLabel htmlFor="form-add-bilan-student">Etudiant</FieldLabel>
                    <ToggleGroup
                      type="single"
                      value={field.value.toString()}
                      onValueChange={updateStudentId}
                      id="form-add-bilan-student"
                      aria-invalid={fieldState.invalid}
                      variant="outline"
                      spacing={1}
                      className='w-full items-center justify-start flex-wrap'
                    >
                      {
                        selectedStudents.map((student, index) => (
                          <ToggleGroupItem
                            key={index}  
                            value={student.id.toString()}
                            aria-label={`${student.firstName} ${student.lastName}`}
                            className="flex h-8 px-2 flex-col items-center justify-center rounded-lg"
                          >
                            <span className="text-sm leading-none">{student.firstName} {student.lastName}</span>
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
                      <FieldLabel htmlFor="form-add-bilan-presence">Présence</FieldLabel>
                      <ToggleGroup
                        type="single"
                        value={field.value === true? 'présent': 'absent'}
                        onValueChange={setPresence}
                        id="form-add-bilan-presence"
                        aria-invalid={fieldState.invalid}
                        variant="outline"
                        className='w-full md:max-w-xs items-center justify-end'
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
                name = 'subject'
                control={form.control}
                render = {({field, fieldState}) => (
                  <Field data-invalid = {fieldState.invalid}>
                    <div className='flex justify-between gap-6'>
                      <FieldLabel htmlFor="form-add-bilan-subject">Matière</FieldLabel>
                      <ToggleGroup
                        type="single"
                        value={field.value}
                        onValueChange={setSubject}
                        id="form-add-bilan-subject"
                        aria-invalid={fieldState.invalid}
                        disabled = {bilanClassName === '' || bilanStudentId < 0 || !bilanPresence}
                        variant="outline"
                        className='w-full md:max-w-xs items-center justify-end'
                      >
                        {
                          subjects.map((subject, index) => (
                            <ToggleGroupItem
                              key={index}  
                              value={subject}
                              aria-label={subject}
                              className="flex-1 flex h-10 flex-col items-center justify-center rounded-xl"
                            >
                              <span className="text-sm leading-none font-light uppercase">{subject}</span>
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
                      <FieldLabel htmlFor="form-add-bilan-lesson">Leçon</FieldLabel>
                      <Select value={field.value.toString()} onValueChange={updatelessonId}>
                        <SelectTrigger
                          disabled = {bilanClassName === '' || bilanStudentId < 0 || bilanSubject === '' || !bilanPresence}
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
                    <FieldLabel htmlFor="form-add-bilan-summary">Bilan</FieldLabel>
                    <Textarea
                      {...field}
                      id="form-add-bilan-summary"
                      placeholder="Résumé de la séance"
                      disabled = {bilanClassName === '' || bilanStudentId < 0 || bilanSubject === '' || !bilanPresence || bilanLessonId < 0 || isAddingBilan}
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
            <Button type="submit" size='lg' form="form-add-bilan" disabled = {isAddingBilan} className="font-medium text-base py-6 flex-1">
                {
                  isAddingBilan ? 'Chargement ...' : 'Créer'
                }
            </Button>
          </Field>
        </CardFooter>
    </Card>
  )
}

export default AddBilanForm