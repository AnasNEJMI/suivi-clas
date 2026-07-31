import { animatorApiCalls } from '@/api/animator/apiCalls'
import type { ScolarYearEntry, SeanceEntry } from '@/api/animator/types'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { generalInfoSchema } from '@/lib/schemas/bilans-general-info.schema'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { CheckIcon, ChevronDownIcon, EditIcon, TriangleAlertIcon, XIcon } from 'lucide-react'
import { useState, type Dispatch, type SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'
import type z from 'zod'

interface SeanceFormProps{
  className ?: string,
  isGeneralInfoFormEnabled : boolean,
  setIsGeneralInfoFormEnabled : Dispatch<SetStateAction<boolean>>,
  isDeletingSeance : boolean,
  setIsDeletingSeance : Dispatch<SetStateAction<boolean>>,
  isSubmittingSeance : boolean,
  setIsSubmittingSeance : Dispatch<SetStateAction<boolean>>,
  isFetchingSeance : boolean,
  setIsFetchingSeance : Dispatch<SetStateAction<boolean>>,
  animatorId : number,
  scolarYears : ScolarYearEntry[],
  currentSeance : SeanceEntry | null,
  setCurrentSeance : Dispatch<SetStateAction<SeanceEntry | null>>,
}

const SeanceForm = ({
  className,
  isGeneralInfoFormEnabled,
  setIsGeneralInfoFormEnabled,
  isDeletingSeance,
  setIsDeletingSeance,
  isSubmittingSeance,
  setIsSubmittingSeance,
  isFetchingSeance,
  setIsFetchingSeance,
  scolarYears,
  animatorId,
  currentSeance,
  setCurrentSeance} : SeanceFormProps) => {

  const [selectedScolarYear, setSelectedScolarYear] = useState(scolarYears[0])

  const form = useForm<z.infer<typeof generalInfoSchema>>({
    resolver : zodResolver(generalInfoSchema),
    defaultValues : {
      scolarYearId : selectedScolarYear.id,
      classId : -1,
      date : new Date(Date.now()),
    }
  })

  async function onSubmit(data : z.infer<typeof generalInfoSchema>){
    try{
      setIsFetchingSeance(true);
      
      const seance = await animatorApiCalls.fetchSeance({
        scolarYearId : data.scolarYearId,
        classId : data.classId,
        animatorId : animatorId,
        date : data.date,
      });

      console.log('seance fetch request successful, seance response is : ',JSON.stringify(seance, null, 2));
      
      setCurrentSeance(seance)
      setIsGeneralInfoFormEnabled(false);

    }catch(error){
      console.error(error);
    }finally{
      setIsFetchingSeance(false);
    }
  }

  

  const updateScolarYearId = () => {
    //todo
  }
  const updateDate = () => {
    //todo
  }
  
  const updateClassId = (value : string) => {
    console.log('new classId : ', value)
    form.setValue('classId', value? parseInt(value) : -1);
  }


  //submit form
  async function onSubmitSeance(data : z.infer<typeof generalInfoSchema>){
    try{
      console.log('submitting')
      setIsSubmittingSeance(true);
      
      const seanceRes = await animatorApiCalls.submitSeance({
        scolarYearId : data.scolarYearId,
        classId : data.classId,
        animatorId : animatorId,
        date : data.date,
      });

      if(seanceRes){
        console.log('submitted seance successfully : ', JSON.stringify(seanceRes, null, 2));
        setCurrentSeance(seanceRes)
      }

    }catch(error){
      console.error(error);
    }finally{
      setIsSubmittingSeance(false);
    }
  }
  
  
  async function onDeleteSeance(data : z.infer<typeof generalInfoSchema>){
    try{
      console.log('deleting')
      setIsDeletingSeance(true);
      
      const seance = await animatorApiCalls.deleteSeance({
        scolarYearId : data.scolarYearId,
        classId : data.classId,
        animatorId : animatorId,
        date : data.date,
      });

      if(seance){
        console.log('deleted seance successfully, deleted seance is : ', seance);
        setCurrentSeance(null);
      }
      
    }catch(error){
      console.error(error);
    }finally{
      setIsDeletingSeance(false);
    }
  }
  
  return (
    <>
      {/* general info form */}
      <Card className={cn(className, `font-outfit border-none shadow-card`)}>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <div className='flex justify-center gap-2'>
              <div className='w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white border border-white'>1</div>
              <span className='text-xl lg:text-2xl'>Informations Générales</span>
            </div>
            {!isGeneralInfoFormEnabled && <Button variant={'outline'} onClick={() => setIsGeneralInfoFormEnabled(true)}><EditIcon/></Button>}
          </CardTitle>
          <CardDescription>
            Merci de renseigner les informations générales suivantes et confirmer.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-2">
          <form id = 'form-general-info' onSubmit={form.handleSubmit(onSubmit)} className={`${isGeneralInfoFormEnabled? 'pointer-events-auto' : 'pointer-events-none opacity-70'}`}>
            <FieldGroup className='gap-4!'>
              <Controller
                name = 'scolarYearId'
                control={form.control}
                render = {({field, fieldState}) => (
                  <Field data-invalid = {fieldState.invalid}>
                    <div className='flex justify-between gap-6'>
                      <FieldLabel htmlFor="form-general-info-scolarYear">Année scolaire</FieldLabel>
                      <Select value={field.value.toString()} onValueChange={updateScolarYearId}>
                        <SelectTrigger
                          disabled = {isFetchingSeance}
                          className="w-full md:flex-1 md:max-w-xs text-base truncate h-10!">
                          <SelectValue placeholder = {field.value}/>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {
                              scolarYears.map((scolarYear, index) => (
                                <SelectItem key={index} value={scolarYear.id.toString()} className='text-base'>{scolarYear.label}</SelectItem>
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
                name = 'date'
                control={form.control}
                render = {({field, fieldState}) => (
                  <Field data-invalid = {fieldState.invalid}>
                    <div className='flex justify-between gap-6'>
                      <FieldLabel htmlFor="form-general-info-date">Date</FieldLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            size='lg'
                            variant="outline"
                            data-empty={!field.value}
                            className="flex-1 md:w-full md:max-w-xs data-[empty=true]:text-muted-foreground justify-between text-left font-normal text-base capitalize"
                          >
                            {field.value ? format(field.value, "PPP", {locale : fr}) : <span>Choisir une date</span>}
                            <ChevronDownIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            locale={fr}
                            id="form-general-info-date"
                            mode="single"
                            selected={field.value}
                            onSelect={updateDate}
                            className="rounded-lg border"
                            disabled = {isFetchingSeance}
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
                name = 'classId'
                control={form.control}
                render = {({field, fieldState}) => (
                  <Field data-invalid = {fieldState.invalid}>
                    <FieldLabel htmlFor="form-general-info-class">Classe</FieldLabel>
                    <ToggleGroup
                      type="single"
                      value={field.value.toString()}
                      onValueChange={updateClassId}
                      id="form-general-info-class"
                      aria-invalid={fieldState.invalid}
                      variant="outline"
                      spacing={1}
                      className='w-full items-center justify-start flex-wrap'
                    >
                      {
                        selectedScolarYear.classes.map((studentClass, index) => (
                          <ToggleGroupItem
                            key={index}  
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
            </FieldGroup>
            <Field orientation="horizontal" className="flex mt-12">
              <Button type="submit" size='lg' form="form-general-info" disabled = {isFetchingSeance} className="font-medium text-base py-6 flex-1">
                  {
                    isGeneralInfoFormEnabled && isFetchingSeance && 'Confirmation ...'
                  }
                  {
                    isGeneralInfoFormEnabled && !isFetchingSeance && 'Confirmer'
                  }
                  {
                    !isGeneralInfoFormEnabled && 
                    <div className='flex gap-2 items-center justify-center'>Confirmé<CheckIcon/></div>
                  }
              </Button>
            </Field>
          </form>
        </CardContent>
      </Card>
      
      {/* seance form */}
      <>
        {
          !isSubmittingSeance && !isDeletingSeance && currentSeance && !isGeneralInfoFormEnabled &&
          <Card className={cn(className, `font-outfit border-none shadow-card mt-6 bg-linear-240 from-25% from-lime-100 to-75% to-lime-200`)}>
            <CardHeader>
              <CardTitle className='flex gap-4'>
                <CheckIcon size={32} className='text-lime-500'/>
                <div className='flex justify-center gap-2'>
                  {/* <div className='w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white border border-white'>2</div> */}
                  Séance enregistrée
                </div>
              </CardTitle>
              <CardDescription>
              </CardDescription>
              <CardContent className="mt-2 px-0">
                <form id = 'delete-seance-form' onSubmit={form.handleSubmit(onDeleteSeance)}>
                    <Field orientation="horizontal" className="flex">
                      <Button type="submit" size='lg' form="delete-seance-form" disabled = {isDeletingSeance} className="font-medium text-base py-6 flex-1">
                          {
                            isDeletingSeance ? 'Suppression ...' : 'Supprimer'
                          }
                      </Button>
                    </Field>
                </form>
                <div className='flex items-center justify-start gap-2 text-red-600 opacity-75 mt-2'>
                  <span><TriangleAlertIcon/></span>Attention ! La suppression d'une séance entrainera la suppression des bilans qui lui sont associées.
                </div>
              </CardContent>
            </CardHeader>
          </Card>
        }
        {   
          !isSubmittingSeance && !isDeletingSeance && !currentSeance && !isGeneralInfoFormEnabled &&
          <Card className={cn(className, `font-outfit border-none shadow-card mt-6 bg-linear-240 from-25% from-red-200 to-75% to-red-500`)}>
            <CardHeader>
              <CardTitle className='flex gap-4'>
                <XIcon size={32} className='text-white'/>
                <div className='flex justify-center gap-2 text-white'>
                  {/* <div className='w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white border border-white'>2</div> */}
                  Séance pas enregistrée
                </div>
              </CardTitle>
              <CardDescription className='text-base text-white'>Appuyer sur 'Enregister' pour enregister cette séance.</CardDescription>
              <CardContent className='px-0'>
                <form id = 'submit-seance-form' onSubmit={form.handleSubmit(onSubmitSeance)}>
                    <Field orientation="horizontal" className="flex mt-4">
                      <Button type="submit" size='lg' form="submit-seance-form" disabled = {isSubmittingSeance} className="font-medium text-base py-6 flex-1">
                          {
                            isSubmittingSeance ? 'Enregistrement ...' : 'Enregistrer'
                          }
                      </Button>
                    </Field>
                </form>
              </CardContent>
            </CardHeader>
          </Card>
        }
        {
          (isSubmittingSeance || isDeletingSeance) &&
          <Card className={cn(className, `font-outfit mt-6 border-none shadow-card`)}>
            <CardHeader>
              <CardTitle><div className='w-60 h-8 rounded-lg bg-zinc-200 animate-pulse'></div></CardTitle>
              <CardDescription className='text-base text-primary flex flex-col gap-2 mt-4'>
                <div className='w-full h-8 bg-zinc-200 animate-pulse rounded-lg'></div>
                <div className='w-full h-8 bg-zinc-200 animate-pulse rounded-lg'></div>
                <div className='w-40 h-8 bg-zinc-200 animate-pulse rounded-lg'></div>
              </CardDescription>
            </CardHeader>
          </Card>

        }
      </>      
    </>
    
  )
}

export default SeanceForm