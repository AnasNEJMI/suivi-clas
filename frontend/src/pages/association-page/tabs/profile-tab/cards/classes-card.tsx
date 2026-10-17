import type { ClassInfoEntry } from '@/api/association-member/apiCalls';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { GraduationCap, Users } from 'lucide-react';

// Generates M3 avatar initials
const getInitials = (firstName: string, lastName: string) => {
  const f = firstName ? firstName.charAt(0).toUpperCase() : '';
  const l = lastName ? lastName.charAt(0).toUpperCase() : '';
  return `${f}${l}` || '?';
};

const AssocClassesCard = ({ classes }: { classes: ClassInfoEntry[] }) => {
  if (!classes || classes.length === 0) {
    return (
      <Card className="mt-4 gap-0 flex-1 border border-border/60 shadow-sm rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-lg font-semibold tracking-tight">
            <div className="flex items-center justify-center size-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <GraduationCap className="size-5" />
            </div>
            <span>Mes Groupes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center p-8 text-center rounded-xl bg-muted/30 border border-dashed border-border/80">
            <GraduationCap className="size-10 text-muted-foreground/50 mb-2" />
            <p className="text-sm font-medium text-muted-foreground">Aucun groupe associé</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-4 gap-0 flex-1 border border-border/60 shadow-sm rounded-2xl overflow-hidden">
      {/* Header Container with Expressive M3 Icon Avatar */}
      <CardHeader className="pb-3 border-b border-border/40 bg-muted/10">
        <CardTitle className="flex items-center justify-between text-lg font-semibold tracking-tight">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <GraduationCap className="size-5" />
            </div>
            <div>
              <span>Mes Groupes</span>
              <p className="text-xs font-normal text-muted-foreground mt-0.5">
                {classes.length} {classes.length > 1 ? 'classes répertoriées' : 'classe répertoriée'}
              </p>
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-4">
        {/* Single Accordion Wrapper (Fixes nested Accordion anti-pattern) */}
        <Accordion type="multiple" className="w-full flex flex-col gap-2.5 pb-2">
          {classes.map((clas) => {
            const studentCount = clas.students?.length ?? 0;

            return (
              <AccordionItem
                key={clas.class.id}
                value={clas.class.id.toString()}
                className="border border-border/60 rounded-xl px-3 bg-card hover:bg-muted/20 transition-colors overflow-hidden"
              >
                <AccordionTrigger className="py-3 text-base hover:no-underline group">
                  <div className="w-full flex items-center justify-between gap-4 pr-2 text-left">
                    <span className="font-medium text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {clas.class.label}
                    </span>
                    
                    {/* Material 3 Badge for Secondary Metadata */}
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 shrink-0">
                      <Users className="size-3.5" />
                      {studentCount} {studentCount > 1 ? 'élèves' : 'élève'}
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pb-3 pt-1">
                  {studentCount > 0 ? (
                    <div className="flex flex-col gap-2 pt-1">
                      {/* Material 3 Assist/Entity Chips */}
                      {clas.students.map((student) => (
                        <div
                          key={student.id}
                          className={cn(
                            'inline-flex items-center gap-2 pl-1 pr-3 py-1 rounded-full text-nowrap w-fit',
                            'bg-muted/60 hover:bg-muted border border-border/50',
                            'text-xs font-medium text-foreground transition-all'
                          )}
                        >
                          <span className="flex items-center justify-center size-6 rounded-full bg-amber-600 text-white dark:bg-amber-500 text-[10px] font-bold shrink-0">
                            {getInitials(student.firstName, student.lastName)}
                          </span>
                          <span>
                            {student.firstName} {student.lastName}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground italic py-1">
                      Aucun élève inscrit dans cette classe.
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default AssocClassesCard;