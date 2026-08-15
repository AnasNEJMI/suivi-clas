import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CheckCircleIcon, XCircle } from "lucide-react"

interface CompetencesAccordianProps {
  positive : string,
  negative : string,
  improvements : string
}
export function CompetencesAccordian({positive, negative, improvements} : CompetencesAccordianProps) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="bilan"
      className="flex-1 w-full"
    >
      <AccordionItem value="bilan">
        <AccordionTrigger className="font-semibold text-lg pt-0">Bilan Global</AccordionTrigger>
        <AccordionContent>
            <div className="flex gap-2">
                <CheckCircleIcon className="text-green-500 size-6"/>
                <p className="">{positive}</p>
            </div>
            <div className="flex gap-2 mt-4">
                <XCircle className="text-red-500 size-6"/>
                <p>{negative}</p>
            </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="improvements">
        <AccordionTrigger className="font-semibold text-lg">Axes d'améliorations</AccordionTrigger>
        <AccordionContent>{improvements}</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
