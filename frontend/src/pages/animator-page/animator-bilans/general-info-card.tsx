import type { ScolarYearEntry } from '@/api/animator/types'
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
import { format, isValid, parse } from 'date-fns'
import { fr } from 'date-fns/locale'
import { CheckIcon, ChevronDownIcon, EditIcon} from 'lucide-react'
import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router'
import type z from 'zod'

interface SeanceFormProps{
  className ?: string,
  scolarYears : ScolarYearEntry[],
}

function safeParseDateParam(str: string | null): Date {
    if (!str) return new Date()
    const parsed = parse(str, 'yyyy-MM-dd', new Date())
    return isValid(parsed) ? parsed : new Date()
}

const GeneralInfoCard = ({
  className,
  scolarYears,
} : SeanceFormProps) => {

  const [searchParams, setSearchParams] = useSearchParams();

  const isLocked = searchParams.has('scolarYearId')
                  && searchParams.has('classId')
                  && searchParams.has('date');
  
  const initialScolarYearId = Number(searchParams.get('scolarYearId')) || scolarYears[0]?.id;
  const initialClassId = Number(searchParams.get('classId')) || -1;
  const initialDateStr = searchParams.get('scolarYearId');


  const form = useForm<z.infer<typeof generalInfoSchema>>({
    resolver : zodResolver(generalInfoSchema),
    defaultValues : {
      scolarYearId : initialScolarYearId,
      classId : initialClassId,
      date : safeParseDateParam(initialDateStr)
    }
  })

  const scolarYearId = form.watch('scolarYearId');
  const selectedScolarYear = useMemo(
    () => scolarYears.find(year => year.id === scolarYearId) ?? scolarYears[0],
    [scolarYearId, scolarYears]
  )

  function onConfirm(data : z.infer<typeof generalInfoSchema>){
    setSearchParams(
      {
        scolarYearId : data.scolarYearId.toString(),
        classId : data.classId.toString(),
        date : format(data.date, 'yyyy-MM-dd'),
      },
      {replace : true}
    )
  }

  function OnEdit(){
    setSearchParams({}, {replace : true});
  }



  // async function onSubmit(data : z.infer<typeof generalInfoSchema>){
  //   try{
  //     setIsFetchingSeance(true);
      
  //     const seance = await animatorApiCalls.fetchSeance({
  //       scolarYearId : data.scolarYearId,
  //       classId : data.classId,
  //       animatorId : animatorId,
  //       date : data.date,
  //     });

  //     console.log('seance fetch request successful, seance response is : ',JSON.stringify(seance, null, 2));
      
  //     setCurrentSeance(seance)
  //     setIsGeneralInfoFormEnabled(false);

  //   }catch(error){
  //     console.error(error);
  //   }finally{
  //     setIsFetchingSeance(false);
  //   }
  // }

  

  // const updateScolarYearId = () => {
  //   //todo
  // }
  // const updateDate = () => {
  //   //todo
  // }
  
  // const updateClassId = (value : string) => {
  //   console.log('new classId : ', value)
  //   form.setValue('classId', value? parseInt(value) : -1);
  // }


  // async function onSubmitSeance(data : z.infer<typeof generalInfoSchema>){
  //   try{
  //     console.log('submitting')
  //     setIsSubmittingSeance(true);
      
  //     const seanceRes = await animatorApiCalls.submitSeance({
  //       scolarYearId : data.scolarYearId,
  //       classId : data.classId,
  //       animatorId : animatorId,
  //       date : data.date,
  //     });

  //     if(seanceRes){
  //       console.log('submitted seance successfully : ', JSON.stringify(seanceRes, null, 2));
  //       setCurrentSeance(seanceRes)
  //     }

  //   }catch(error){
  //     console.error(error);
  //   }finally{
  //     setIsSubmittingSeance(false);
  //   }
  // }
  
  
  // async function onDeleteSeance(data : z.infer<typeof generalInfoSchema>){
  //   try{
  //     console.log('deleting')
  //     setIsDeletingSeance(true);
      
  //     const seance = await animatorApiCalls.deleteSeance({
  //       scolarYearId : data.scolarYearId,
  //       classId : data.classId,
  //       animatorId : animatorId,
  //       date : data.date,
  //     });

  //     if(seance){
  //       console.log('deleted seance successfully, deleted seance is : ', seance);
  //       setCurrentSeance(null);
  //     }
      
  //   }catch(error){
  //     console.error(error);
  //   }finally{
  //     setIsDeletingSeance(false);
  //   }
  // }
  
  return (
      <Card className={cn(className, `font-outfit border-none shadow-card`)}>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <div className='flex justify-center gap-2'>
              <div className='w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white border border-white'>1</div>
              <span className='text-xl lg:text-2xl'>Informations Générales</span>
            </div>
            {isLocked && <Button variant={'outline'} onClick={OnEdit}><EditIcon/></Button>}
          </CardTitle>
          <CardDescription>
            Renseigner les informations générales suivantes et confirmez.
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
                            className="flex-1 md:w-full md:max-w-xs data-[empty=true]:text-muted-foreground justify-between text-left font-normal text-base capitalize"
                          >
                            {field.value  && isValid(field.value) ? format(field.value, "PPP", {locale : fr}) : <span>Choisir une date</span>}
                            <ChevronDownIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            locale={fr}
                            id="form-general-info-date"
                            mode="single"
                            selected={field.value}
                            onSelect={
                              (date) => field.onChange(date ?? new Date())
                            }
                            className="rounded-lg border"
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

export default GeneralInfoCard