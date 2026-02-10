import { Controller, useForm, useWatch } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field'
import type z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {useState, type SetStateAction } from 'react'
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
import { useIsMobile } from '@/hooks/use-mobile'

interface AddSkillFormProps {
  className ?: string,
  users : User[],
  skills : Skill[]
}

const AddSkillForm = ({className, users} : AddSkillFormProps) => {
    const [isAddingSkill, setIsAddingSkill] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState<User[]>([])
    const isMobile = useIsMobile();
    
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

    const bilanClassName = useWatch({
      control: form.control,
      name: "className",
    });

    const bilanStudentId = useWatch({
      control: form.control,
      name: "studentId",
    });
    
    function updateFormValue<T extends string | number>(
      label : "className" | "studentId" | "autonomy" | "discipline" | "organisation" | "ponctuality" | "regularity" | "respect" | "preparation" | "positive" | "negative" | "improvements",
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

    const updateClassName = (value : string) => {
        updateFormValue('className', value);
        form.setValue('studentId', -1);
        filterAndUpdate(users,(user : User) => user.role === 'student' && user.class?.label === value, setSelectedStudents);
        
        updateAutonomy([0]);
        updateDiscipline([0]);
        updateOrganisation([0]);
        updatePonctuality([0]);
        updateRegularity([0]);
        updateRespect([0]);
        updatePreparation([0]);
    }
    const updateStudentId = (value : string) => {
        updateFormValue('studentId', parseInt(value));
        updateAutonomy([0]);
        updateDiscipline([0]);
        updateOrganisation([0]);
        updatePonctuality([0]);
        updateRegularity([0]);
        updateRespect([0]);
        updatePreparation([0]);
    }

    // const updateStudentId = (value : string) => updateFormValue<number>('studentId', parseInt(value));
  
    const updateSkill = (
        label:"className" | "studentId" | "autonomy" | "discipline" | "organisation" | "ponctuality" | "regularity" | "respect" | "preparation" | "positive" | "negative" | "improvements",
        values : number[]
    ) => {
        form.setValue(label, values[0]);
        console.log('form updated : ', form.getValues())
    }

    const updateAutonomy = (values : number[]) => updateSkill('autonomy', values);
    const updateDiscipline = (values : number[]) => updateSkill('discipline', values);
    const updateOrganisation = (values : number[]) => updateSkill('organisation', values);
    const updatePonctuality = (values : number[]) => updateSkill('ponctuality', values);
    const updateRegularity = (values : number[]) => updateSkill('regularity', values);
    const updateRespect = (values : number[]) => updateSkill('respect', values);
    const updatePreparation = (values : number[]) => updateSkill('preparation', values);
  
    async function onSubmit(data : z.infer<typeof addSkillSchema>){
      setIsAddingSkill(true);
      try{
        // const bilan = await requestAddBilan({
        //   userId : data.studentId,
        //   date : data.date,
        //   lessonId : data.lessonId,
        //   subject : data.subject,
        //   presence : data.presence,
        //   summary : data.summary,
        // });

        console.log('bilan submitted successfully : ', JSON.stringify(data, null));
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
    <Card className={cn(className, 'font-outfit')}>
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
                        onValueChange={updateClassName}
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
                      onValueChange={updateStudentId}
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
              <div className='flex flex-col lg:flex-row lg:justify-between gap-4'>
                <Controller
                    name = 'autonomy'
                    control={form.control}
                    render = {({field, fieldState}) => (
                    <Field data-invalid = {fieldState.invalid} className='flex-row lg:flex-col lg:w-min'>
                        <FieldLabel htmlFor="form-add-skill-autonomy">Autonomie</FieldLabel>
                        <Slider
                        {...field}
                        id="form-add-skill-autonomy"
                        step={1}
                        min={0}
                        max={20}
                        value={[field.value]}
                        onValueChange={updateAutonomy}
                        disabled = {bilanClassName === '' || bilanStudentId < 0 || isAddingSkill}
                        aria-invalid={fieldState.invalid}
                        className="lg:h-40 lg:w-min"
                        orientation={isMobile? 'horizontal': 'vertical'}
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
                        <FieldLabel htmlFor="form-add-skill-discipline">Discipline</FieldLabel>
                        <Slider
                        {...field}
                        id="form-add-skill-discipline"
                        step={1}
                        min={0}
                        max={20}
                        value={[field.value]}
                        onValueChange={updateDiscipline}
                        disabled = {bilanClassName === '' || bilanStudentId < 0 || isAddingSkill}
                        aria-invalid={fieldState.invalid}
                        className="lg:h-40 lg:w-min"
                        orientation={isMobile? 'horizontal': 'vertical'}
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
                        <FieldLabel htmlFor="form-add-skill-organisation">Organisation</FieldLabel>
                        <Slider
                        {...field}
                        id="form-add-skill-organisation"
                        step={1}
                        min={0}
                        max={20}
                        value={[field.value]}
                        onValueChange={updateOrganisation}
                        disabled = {bilanClassName === '' || bilanStudentId < 0 || isAddingSkill}
                        aria-invalid={fieldState.invalid}
                        className="lg:h-40 lg:w-min"
                        orientation={isMobile? 'horizontal': 'vertical'}
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
                        <FieldLabel htmlFor="form-add-skill-ponctuality">Ponctualité</FieldLabel>
                        <Slider
                        {...field}
                        id="form-add-skill-ponctuality"
                        step={1}
                        min={0}
                        max={20}
                        value={[field.value]}
                        onValueChange={updatePonctuality}
                        disabled = {bilanClassName === '' || bilanStudentId < 0 || isAddingSkill}
                        aria-invalid={fieldState.invalid}
                        className="lg:h-40 lg:w-min"
                        orientation={isMobile? 'horizontal': 'vertical'}
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
                        <FieldLabel htmlFor="form-add-skill-regularity">Régularité</FieldLabel>
                        <Slider
                        {...field}
                        id="form-add-skill-regularity"
                        step={1}
                        min={0}
                        max={20}
                        value={[field.value]}
                        onValueChange={updateRegularity}
                        disabled = {bilanClassName === '' || bilanStudentId < 0 || isAddingSkill}
                        aria-invalid={fieldState.invalid}
                        className="lg:h-40 lg:w-min"
                        orientation={isMobile? 'horizontal': 'vertical'}
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
                        <FieldLabel htmlFor="form-add-skill-preparation">Préparation</FieldLabel>
                        <Slider
                        {...field}
                        id="form-add-skill-preparation"
                        step={1}
                        min={0}
                        max={20}
                        value={[field.value]}
                        onValueChange={updatePreparation}
                        disabled = {bilanClassName === '' || bilanStudentId < 0 || isAddingSkill}
                        aria-invalid={fieldState.invalid}
                        className="lg:h-40 lg:w-min"
                        orientation={isMobile? 'horizontal': 'vertical'}
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
                        <FieldLabel htmlFor="form-add-skill-respect">Respect</FieldLabel>
                        <Slider
                        {...field}
                        id="form-add-skill-respect"
                        step={1}
                        min={0}
                        max={20}
                        value={[field.value]}
                        onValueChange={updateRespect}
                        disabled = {bilanClassName === '' || bilanStudentId < 0 || isAddingSkill}
                        aria-invalid={fieldState.invalid}
                        className="lg:h-40 lg:w-min"
                        orientation={isMobile? 'horizontal': 'vertical'}
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
                      disabled = {bilanClassName === '' || bilanStudentId < 0 || isAddingSkill}
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
                      disabled = {bilanClassName === '' || bilanStudentId < 0 || isAddingSkill}
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
                      disabled = {bilanClassName === '' || bilanStudentId < 0 || isAddingSkill}
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