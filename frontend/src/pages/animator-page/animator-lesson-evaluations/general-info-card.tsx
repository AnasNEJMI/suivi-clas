import { lessonEvalGeneralInfoSchema } from '@/lib/schemas/lesson-evall-general-info.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router';
import type z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Button } from '@/components/ui/button';
import { CheckIcon, EditIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ScolarYearEntry } from '@/api/animator/types';

interface GeneralInfoCardProps{
  className ?: string,
  scolarYears : ScolarYearEntry[],
}

const LessonEvalGeneralInfoCard = ({
    className,
    scolarYears
} : GeneralInfoCardProps) => {

    const [searchParams, setSearchParams] = useSearchParams();

  const isLocked = searchParams.has('scolarYearId')
                  && searchParams.has('classId')
                  && searchParams.has('studentId');
  
  const initialScolarYearId = Number(searchParams.get('scolarYearId')) || scolarYears[0]?.id;
  const initialClassId = Number(searchParams.get('classId')) || -1;
  const initialStudentId = Number(searchParams.get('studentId')) || -1;


  const form = useForm<z.infer<typeof lessonEvalGeneralInfoSchema>>({
    resolver : zodResolver(lessonEvalGeneralInfoSchema),
    defaultValues : {
      scolarYearId : initialScolarYearId,
      classId : initialClassId,
      studentId : initialStudentId
    }
  })


    const scolarYearId = form.watch('scolarYearId');
    const selectedScolarYear = useMemo(
        () => scolarYears.find(year => year.id === scolarYearId) ?? scolarYears[0],
        [scolarYearId, scolarYears]
    )

    const classdId = form.watch('classId');
    const selectedClass = useMemo(
        () => selectedScolarYear.classes.find(c => c.id === classdId) ?? null,
        [selectedScolarYear, classdId]
    )

    function onConfirm(data : z.infer<typeof lessonEvalGeneralInfoSchema>){
        setSearchParams(
        {
            scolarYearId : data.scolarYearId.toString(),
            classId : data.classId.toString(),
            studentId : data.studentId.toString()
        },
        {replace : true}
        )
    }

    function OnEdit(){
        setSearchParams({}, {replace : true});
    }

  return (
    <Card className={cn(className, `font-outfit border-none shadow-card`)}>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <div className='flex justify-center gap-2'>
              <div className='w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white border border-white'>1</div>
              <span className='text-xl lg:text-2xl'>Élève</span>
            </div>
            {isLocked && <Button variant={'outline'} onClick={OnEdit}><EditIcon/></Button>}
          </CardTitle>
          <CardDescription>
            Sélectionnez l'élève concerné et appuyez sur 'Confirmer'.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-2">
          <form id = 'form-general-info' onSubmit={form.handleSubmit(onConfirm)} className={cn(isLocked && 'pointer-events-none opacity-70')}>
            <FieldGroup className='gap-4!'>
              <Controller
                name = 'scolarYearId'
                control={form.control}
                render = {({field, fieldState}) => (
                  <Field data-invalid = {fieldState.invalid}>
                    <div className='flex justify-between gap-6'>
                      <FieldLabel htmlFor="form-general-info-scolarYear">Année scolaire</FieldLabel>
                      <Select
                        value={field.value.toString()} 
                        onValueChange={(v) => {
                          field.onChange(parseInt(v));
                          form.setValue('classId', -1)
                        }}
                      >
                        <SelectTrigger
                          className="w-full md:flex-1 md:max-w-xs text-base truncate h-10!">
                          <SelectValue placeholder = {field.value}/>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {
                              scolarYears.map((scolarYear) => (
                                <SelectItem key={scolarYear.id} value={scolarYear.id.toString()} className='text-base'>{scolarYear.label}</SelectItem>
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
                name = 'classId'
                control={form.control}
                render = {({field, fieldState}) => (
                  <Field data-invalid = {fieldState.invalid}>
                    <FieldLabel htmlFor="form-general-info-class">Classe</FieldLabel>
                    <ToggleGroup
                      type="single"
                      value={field.value > 0 ? field.value.toString() : ''}
                      onValueChange={(v) => field.onChange(v ? parseInt(v) : -1)}
                      id="form-general-info-class"
                      aria-invalid={fieldState.invalid}
                      variant="outline"
                      spacing={1}
                      className='w-full items-center justify-start flex-wrap'
                    >
                      {
                        selectedScolarYear.classes.map((studentClass) => (
                          <ToggleGroupItem
                            key={studentClass.id}  
                            value={studentClass.id.toString()}
                            aria-label={`${studentClass.label}`}
                            className="flex h-16 px-4 flex-col gap-2 items-center justify-center rounded-lg"
                          >
                            <span className="text-base font-bold leading-none">{studentClass.label}</span>
                            <span className="text-sm leading-none">{studentClass.association.label}</span>
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
              {
                selectedClass &&
                <Controller
                    name = 'studentId'
                    control={form.control}
                    render = {({field, fieldState}) => (
                    <Field data-invalid = {fieldState.invalid}>
                        <FieldLabel htmlFor="form-general-info-student">Étudiant</FieldLabel>
                        <ToggleGroup
                        type="single"
                        value={field.value > 0 ? field.value.toString() : ''}
                        onValueChange={(v) => field.onChange(v ? parseInt(v) : -1)}
                        id="form-general-info-student"
                        aria-invalid={fieldState.invalid}
                        variant="outline"
                        spacing={1}
                        className='w-full items-center justify-start flex-wrap'
                        >
                        {
                            selectedClass.students.map((s) => (
                            <ToggleGroupItem
                                key={s.id}  
                                value={s.id.toString()}
                                aria-label={`${s.username}`}
                                className="flex h-10 px-4 gap-2 items-center justify-center rounded-lg"
                            >
                                <span className="text-base leading-none capitalize">{s.firstName}</span>
                                <span className="text-base leading-none uppercase">{s.lastName}</span>
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
              }
            </FieldGroup>
            <Field orientation="horizontal" className="flex mt-12">
              <Button type="submit" size='lg' form="form-general-info" className="font-medium text-base py-6 flex-1">
                  {
                    isLocked
                    ?<span className='flex items-center gap-2'>Confirmé <CheckIcon size={16} /></span>
                    :'Confirmer'
                  }
              </Button>
            </Field>
          </form>
        </CardContent>
      </Card>
  )
}

export default LessonEvalGeneralInfoCard