import { Controller, useForm, useWatch } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field'
import type z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {useEffect, useState, type SetStateAction } from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'
import { CLASS_NAMES, DOC_TYPES, type Subject} from '@/lib/types/data.types'
import SuccessToast from '../toasts/success-toast'
import type { Doc, Lesson} from '@/api/api.types'
import { addDocSchema } from '@/lib/schemas/addDoc.schema'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Input } from '../ui/input'
import { requestAddDoc } from '@/api/admin'

interface AddLessonFormProps {
  className ?: string,
  lessons : Lesson[],
  docs : Doc[],
  subjects : Subject[]
}

const AddSkillForm = ({className, lessons, docs, subjects} : AddLessonFormProps) => {
    const [isAddingDoc, setIsAddingDoc] = useState(false);
    const [selectedLessons, setSelectedLessons] = useState<Lesson[]>([])
    
    const form = useForm<z.infer<typeof addDocSchema>>({
      resolver : zodResolver(addDocSchema),
      defaultValues : {
        className : '',
        subject : '',
        type : '',
        lessonId : -1,
        link : '',
      }
    })

    const lessonClassName = useWatch({
      control: form.control,
      name: "className",
    });
    const lessonSubject = useWatch({
      control: form.control,
      name: "subject",
    });

    const lessonId = useWatch({
      control: form.control,
      name: "lessonId",
    });
    const lessonType = useWatch({
      control: form.control,
      name: "type",
    });

    useEffect(() => {
      const doc = docs.find(doc => doc.lesson.id === lessonId);

      if(doc){
        form.reset({
          ...form.getValues(),
          type : doc.type,
          link : doc.link,
        })
      }else{
        form.reset({
          ...form.getValues(),
          type : '',
          link : '',
        })
      }
    }, [docs, form, lessonId])

    useEffect(() => {
      form.reset({
        ...form.getValues(),
        type : '',
        lessonId : -1,
        link : '',
      })
      console.log('lessonSubject ', lessonSubject);
      filterAndUpdate(lessons,(lesson) => lesson.class.label === lessonClassName && lesson.subject === lessonSubject, setSelectedLessons);
    }, [form, lessonSubject, lessonClassName, lessons])


    useEffect(() => {
        console.log('subjects ', subjects);
        console.log('lessons ', lessons);
        console.log('selectedLessons ', selectedLessons);
    }, [subjects, lessons, selectedLessons])
    function filterAndUpdate<T>(array : T[], condition : (item : T) => boolean, update : (value: SetStateAction<T[]>) => void){
      const filtered = array.filter(lesson => condition(lesson));
      update(filtered);
    }

  
    async function onSubmit(data : z.infer<typeof addDocSchema>){
      setIsAddingDoc(true);
      try{
        const doc = docs.find(doc => doc.lesson.id === data.lessonId);
        const docId = doc? doc.id : undefined;

        const document = await requestAddDoc({
          docId : docId,
          lessonId : data.lessonId,
          type : data.type,
          link : data.link
        });

        console.log('bilan submitted successfully : ', JSON.stringify(document, null));
        SuccessToast({
          message : 'Compétences soumis avec succès !',
        })
      }catch(error){
        console.error(error);
      }finally{
        setIsAddingDoc(false);
      }
    }

  return (
    <Card className={cn(className, 'font-outfit w-full max-w-3xl')}>
        <CardHeader>
          <CardTitle>Ajouter/Modifier des documents</CardTitle>
          <CardDescription>
            Sumettre les données des documents en respectant l'ordre établi.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-2">
          <form id = 'form-add-doc' onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name = 'className'
                control={form.control}
                render = {({field, fieldState}) => (
                  <Field data-invalid = {fieldState.invalid}>
                    <div className='flex justify-between gap-6'>
                      <FieldLabel htmlFor="form-add-doc-classname">Classe</FieldLabel>
                      <ToggleGroup
                        type="single"
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                        id="form-add-doc-classname"
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
                name = 'subject'
                control={form.control}
                render = {({field, fieldState}) => (
                  <Field data-invalid = {fieldState.invalid}>
                    <div className='flex justify-between gap-6'>
                      <FieldLabel htmlFor="form-add-doc-subject">Matière</FieldLabel>
                      <ToggleGroup
                        type="single"
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                        id="form-add-doc-subject"
                        aria-invalid={fieldState.invalid}
                        disabled = {lessonClassName === ''}
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
                        <FieldLabel htmlFor="form-add-doc-lesson">Leçon</FieldLabel>
                        <Select value={field.value.toString()} onValueChange={(value) => field.onChange(parseInt(value))}>
                        <SelectTrigger
                            disabled = {lessonClassName === '' || lessonSubject === ''}
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
                    name = 'type'
                    control={form.control}
                    render = {({field, fieldState}) => (
                    <Field data-invalid = {fieldState.invalid}>
                        <div className='flex justify-between gap-6'>
                        <FieldLabel htmlFor="form-add-doc-type">Type</FieldLabel>
                        <ToggleGroup
                            type="single"
                            value={field.value}
                            onValueChange={(value) => field.onChange(value)}
                            id="form-add-doc-type"
                            aria-invalid={fieldState.invalid}
                            disabled = {lessonClassName === '' || lessonSubject === '' || lessonId < 0}
                            variant="outline"
                            className='w-full md:max-w-xs items-center justify-end'
                        >
                            {
                            DOC_TYPES.map((docType, index) => (
                                <ToggleGroupItem
                                key={index}  
                                value={docType}
                                aria-label={docType}
                                className="flex-1 flex h-10 flex-col items-center justify-center rounded-xl"
                                >
                                <span className="text-sm leading-none font-light uppercase">{docType}</span>
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
                    name = 'link'
                    control={form.control}
                    render = {({field, fieldState}) => (
                    <Field data-invalid = {fieldState.invalid}>
                        <FieldLabel htmlFor="form-add-doc-link">Lien</FieldLabel>
                        <Input
                        {...field}
                        id="form-add-doc-link"
                        type="url"
                        placeholder="Lien"
                        disabled = {lessonClassName === '' || lessonSubject === '' || lessonId < 0 || lessonType === ''}
                        aria-invalid={fieldState.invalid}
                        autoComplete='off'
                        required
                        className="bg-white focus-visible:ring-lime-500/50 focus-visible:border-lime-200  border-lime-200"
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
            <Button type="submit" size='lg' form="form-add-doc" disabled = {isAddingDoc} className="font-medium text-base py-6 flex-1">
                {
                  isAddingDoc ? 'Chargement ...' : 'Créer'
                }
            </Button>
          </Field>
        </CardFooter>
    </Card>
  )
}

export default AddSkillForm