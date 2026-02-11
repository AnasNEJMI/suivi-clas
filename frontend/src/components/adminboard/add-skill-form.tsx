import { Controller, useForm, useWatch } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field'
import type z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {useEffect, useState, type SetStateAction } from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'
import { CLASS_NAMES} from '@/lib/types/data.types'
import type { User } from '@/api/auth'
import { Textarea } from '../ui/textarea'
import SuccessToast from '../toasts/success-toast'
import type { Skill } from '@/api/api.types'
import { addSkillSchema } from '@/lib/schemas/addSkill.schema'
import { Slider } from '../ui/slider'
import { requestAddSkill } from '@/api/admin'
import { useIsBigScreen } from '@/hooks/use-bigScreen'

interface AddSkillFormProps {
  className ?: string,
  users : User[],
  skills : Skill[]
}

const AddSkillForm = ({className, users, skills} : AddSkillFormProps) => {
    const [isAddingSkill, setIsAddingSkill] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState<User[]>([])
    const isBigScreen = useIsBigScreen();
    
    const form = useForm<z.infer<typeof addSkillSchema>>({
      resolver : zodResolver(addSkillSchema),
      defaultValues : {
        className : '',
        studentId : -1,
        autonomy : 0,
        discipline : 0,
        organisation : 0,
        ponctuality : 0,
        regularity : 0,
        respect : 0,
        preparation : 0,
        positive : '',
        negative : '',
        improvements : '',
      }
    })

    const skillClassName = useWatch({
      control: form.control,
      name: "className",
    });

    const skillStudentId = useWatch({
      control: form.control,
      name: "studentId",
    });

    useEffect(() => {
      const skill = skills.find(skill => skill.user.id === skillStudentId);

      if(skill){
        form.reset({
          ...form.getValues(),
          autonomy : skill.autonomy,
          discipline : skill.discipline,
          organisation : skill.organisation,
          ponctuality : skill.ponctuality,
          regularity : skill.regularity,
          respect : skill.respect,
          preparation : skill.preparation,
          positive : skill.positive,
          negative : skill.negative,
          improvements : skill.improvements,
        })
      }else{
        form.reset({
          ...form.getValues(),
          autonomy : 0,
          discipline : 0,
          organisation : 0,
          ponctuality : 0,
          regularity : 0,
          respect : 0,
          preparation : 0,
          positive : '',
          negative : '',
          improvements : '',
        })
      }
    }, [skills, form, skillStudentId])

    useEffect(() => {
      form.reset({
        ...form.getValues(),
        studentId : -1,
        autonomy : 0,
        discipline : 0,
        organisation : 0,
        ponctuality : 0,
        regularity : 0,
        respect : 0,
        preparation : 0,
        positive : '',
        negative : '',
        improvements : '',
      })
      filterAndUpdate(users,(user : User) => user.role === 'student' && user.class?.label === skillClassName, setSelectedStudents);
    }, [form, skillClassName, users])


    function filterAndUpdate<T>(array : T[], condition : (item : T) => boolean, update : (value: SetStateAction<T[]>) => void){
      const filtered = array.filter(lesson => condition(lesson));
      update(filtered);
    }

  
    async function onSubmit(data : z.infer<typeof addSkillSchema>){
      setIsAddingSkill(true);
      try{
        const skill = await requestAddSkill({
          userId : data.studentId,
          autonomy : data.autonomy,
          discipline : data.discipline,
          organisation : data.organisation,
          ponctuality : data.ponctuality,
          regularity : data.regularity,
          respect : data.respect,
          preparation : data.preparation,
          positive : data.positive,
          negative : data.negative,
          improvements : data.improvements,
        });

        console.log('bilan submitted successfully : ', JSON.stringify(skill, null));
        SuccessToast({
          message : 'Compétences soumis avec succès !',
        })
      }catch(error){
        console.error(error);
      }finally{
        setIsAddingSkill(false);
      }
    }

  return (
    <Card className={cn(className, 'font-outfit max-w-5xl')}>
        <CardHeader>
          <CardTitle>Ajouter/Modifier les compétences transversales</CardTitle>
          <CardDescription>
            Sumettre les données des compétences en respectant l'ordre établi.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-2">
          <form id = 'form-add-skill' onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name = 'className'
                control={form.control}
                render = {({field, fieldState}) => (
                  <Field data-invalid = {fieldState.invalid}>
                    <div className='flex justify-between gap-6'>
                      <FieldLabel htmlFor="form-add-skill-classname">Classe</FieldLabel>
                      <ToggleGroup
                        type="single"
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                        id="form-add-skill-classname"
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
                    <FieldLabel htmlFor="form-add-skill-student">Etudiant</FieldLabel>
                    <ToggleGroup
                      type="single"
                      value={field.value.toString()}
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      id="form-add-skill-student"
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
              <div className='flex flex-col lg:flex-row lg:justify-evenly gap-4'>
                <Controller
                    name = 'autonomy'
                    control={form.control}
                    render = {({field, fieldState}) => (
                    <Field data-invalid = {fieldState.invalid} className='flex-row lg:flex-col lg:w-min'>
                        <FieldLabel htmlFor="form-add-skill-autonomy"><span className='text-sm'>Autonomie</span></FieldLabel>
                        <Slider
                          id="form-add-skill-autonomy"
                          step={1}
                          min={0}
                          max={20}
                          value={[field.value]}
                          onValueChange={(values) => {field.onChange(values[0]);}}
                          onBlur={field.onBlur}
                          disabled = {skillClassName === '' || skillStudentId < 0 || isAddingSkill}
                          aria-invalid={fieldState.invalid}
                          className="lg:h-40 lg:w-min"
                          orientation={isBigScreen? 'horizontal': 'vertical'}
                        />
                        {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                    )}
                >
                </Controller>
                <Controller
                    name = 'discipline'
                    control={form.control}
                    render = {({field, fieldState}) => (
                    <Field data-invalid = {fieldState.invalid} className='flex-row lg:flex-col lg:w-min'>
                        <FieldLabel htmlFor="form-add-skill-discipline"><span className='text-sm'>Discipline</span></FieldLabel>
                        <Slider
                        id="form-add-skill-discipline"
                        step={1}
                        min={0}
                        max={20}
                        value={[field.value]}
                        onValueChange={(values) => {field.onChange(values[0]);}}
                        onBlur={field.onBlur}
                        disabled = {skillClassName === '' || skillStudentId < 0 || isAddingSkill}
                        aria-invalid={fieldState.invalid}
                        className="lg:h-40 lg:w-min"
                        orientation={isBigScreen? 'horizontal': 'vertical'}
                        />
                        {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                    )}
                >
                </Controller>
                <Controller
                    name = 'organisation'
                    control={form.control}
                    render = {({field, fieldState}) => (
                    <Field data-invalid = {fieldState.invalid} className='flex-row lg:flex-col lg:w-min'>
                        <FieldLabel htmlFor="form-add-skill-organisation"><span className='text-sm'>Organisation</span></FieldLabel>
                        <Slider
                        id="form-add-skill-organisation"
                        step={1}
                        min={0}
                        max={20}
                        value={[field.value]}
                        onValueChange={(values) => {field.onChange(values[0]);}}
                        onBlur={field.onBlur}
                        disabled = {skillClassName === '' || skillStudentId < 0 || isAddingSkill}
                        aria-invalid={fieldState.invalid}
                        className="lg:h-40 lg:w-min"
                        orientation={isBigScreen? 'horizontal': 'vertical'}
                        />
                        {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                    )}
                >
                </Controller>
                <Controller
                    name = 'ponctuality'
                    control={form.control}
                    render = {({field, fieldState}) => (
                    <Field data-invalid = {fieldState.invalid} className='flex-row lg:flex-col lg:w-min'>
                        <FieldLabel htmlFor="form-add-skill-ponctuality"><span className='text-sm'>Ponctualité</span></FieldLabel>
                        <Slider
                        id="form-add-skill-ponctuality"
                        step={1}
                        min={0}
                        max={20}
                        value={[field.value]}
                        onValueChange={(values) => {field.onChange(values[0]);}}
                        onBlur={field.onBlur}
                        disabled = {skillClassName === '' || skillStudentId < 0 || isAddingSkill}
                        aria-invalid={fieldState.invalid}
                        className="lg:h-40 lg:w-min"
                        orientation={isBigScreen? 'horizontal': 'vertical'}
                        />
                        {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                    )}
                >
                </Controller>
                <Controller
                    name = 'regularity'
                    control={form.control}
                    render = {({field, fieldState}) => (
                    <Field data-invalid = {fieldState.invalid} className='flex-row lg:flex-col lg:w-min'>
                        <FieldLabel htmlFor="form-add-skill-regularity"><span className='text-sm'>Régularité</span></FieldLabel>
                        <Slider
                          id="form-add-skill-regularity"
                          step={1}
                          min={0}
                          max={20}
                          value={[field.value]}
                          onValueChange={(values) => {field.onChange(values[0]);}}
                          onBlur={field.onBlur}
                          disabled = {skillClassName === '' || skillStudentId < 0 || isAddingSkill}
                          aria-invalid={fieldState.invalid}
                          className="lg:h-40 lg:w-min"
                          orientation={isBigScreen? 'horizontal': 'vertical'}
                        />
                        {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                    )}
                >
                </Controller>
                <Controller
                    name = 'preparation'
                    control={form.control}
                    render = {({field, fieldState}) => (
                    <Field data-invalid = {fieldState.invalid} className='flex-row lg:flex-col lg:w-min'>
                        <FieldLabel htmlFor="form-add-skill-preparation"><span className='text-sm'>Préparation</span></FieldLabel>
                        <Slider
                          id="form-add-skill-preparation"
                          step={1}
                          min={0}
                          max={20}
                          value={[field.value]}
                          onValueChange={(values) => {field.onChange(values[0]);}}
                          onBlur={field.onBlur}
                          disabled = {skillClassName === '' || skillStudentId < 0 || isAddingSkill}
                          aria-invalid={fieldState.invalid}
                          className="lg:h-40 lg:w-min"
                          orientation={isBigScreen? 'horizontal': 'vertical'}
                        />
                        {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                    )}
                >
                </Controller>
                <Controller
                    name = 'respect'
                    control={form.control}
                    render = {({field, fieldState}) => (
                    <Field data-invalid = {fieldState.invalid} className='flex-row lg:flex-col lg:w-min'>
                        <FieldLabel htmlFor="form-add-skill-respect"><span className='text-sm'>Respect</span></FieldLabel>
                        <Slider
                        id="form-add-skill-respect"
                        step={1}
                        min={0}
                        max={20}
                        value={[field.value]}
                        onValueChange={(values) => {field.onChange(values[0]);}}
                        onBlur={field.onBlur}
                        disabled = {skillClassName === '' || skillStudentId < 0 || isAddingSkill}
                        aria-invalid={fieldState.invalid}
                        className="lg:h-40 lg:w-min"
                        orientation={isBigScreen? 'horizontal': 'vertical'}
                        />
                        {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                    )}
                >
                </Controller>

              </div>
              <Controller
                name = 'positive'
                control={form.control}
                render = {({field, fieldState}) => (
                  <Field data-invalid = {fieldState.invalid}>
                    <FieldLabel htmlFor="form-add-skill-positive">Positif</FieldLabel>
                    <Textarea
                      {...field}
                      id="form-add-skill-positive"
                      placeholder="élements positifs"
                      disabled = {skillClassName === '' || skillStudentId < 0 || isAddingSkill}
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
              <Controller
                name = 'negative'
                control={form.control}
                render = {({field, fieldState}) => (
                  <Field data-invalid = {fieldState.invalid}>
                    <FieldLabel htmlFor="form-add-skill-negative">Négatifs</FieldLabel>
                    <Textarea
                      {...field}
                      id="form-add-skill-negative"
                      placeholder="élements négatifs"
                      disabled = {skillClassName === '' || skillStudentId < 0 || isAddingSkill}
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
              <Controller
                name = 'improvements'
                control={form.control}
                render = {({field, fieldState}) => (
                  <Field data-invalid = {fieldState.invalid}>
                    <FieldLabel htmlFor="form-add-skill-improvements">Axes d'amélioration</FieldLabel>
                    <Textarea
                      {...field}
                      id="form-add-skill-improvements"
                      placeholder="élements négatifs"
                      disabled = {skillClassName === '' || skillStudentId < 0 || isAddingSkill}
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
            <Button type="submit" size='lg' form="form-add-skill" disabled = {isAddingSkill} className="font-medium text-base py-6 flex-1">
                {
                  isAddingSkill ? 'Chargement ...' : 'Créer'
                }
            </Button>
          </Field>
        </CardFooter>
    </Card>
  )
}

export default AddSkillForm