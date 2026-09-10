import type { ClassVisitStats } from '@/api/association-member/apiCalls';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { GraduationCapIcon } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';

const AssocClassesCard = ({classes}:{classes : ClassVisitStats[]}) => {
  return (
    <Card className='mt-4 font-outfit gap-0 flex-1'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-lg'><GraduationCapIcon className='text-amber-600 size-6'/> Mes Groupes</CardTitle>
      </CardHeader>
        <CardContent className='mt-0'>
            <div className='flex flex-col gap-1 text-base w-full'>
                {
                    classes.map((clas, index) => (
                        <Fragment key={clas.class.id} >
                            <Accordion type='multiple'>
                                <AccordionItem value={clas.class.label}>
                                    <AccordionTrigger className='text-base items-center'>
                                        <div className={cn('w-full flex items-start justify-between gap-6')}>
                                            <span>{clas.class.label}</span>
                                            <span>{clas.students.length} élèves</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='flex flex-wrap gap-1 font-semibold text-sm'>
                                        {
                                            clas.students.map((student) => (
                                                <div className='px-2 py-1 rounded-md bg-zinc-100 border border-zinc-200'>
                                                    <span>{student.firstName}</span> <span>{student.lastName}</span>
                                                </div>
                                            ))
                                        }
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                            {index < classes.length - 1 && <Separator className='my-2'/>}
                        </Fragment>
                    ))
                }
            </div>
        </CardContent>
    </Card>
  )
}

export default AssocClassesCard