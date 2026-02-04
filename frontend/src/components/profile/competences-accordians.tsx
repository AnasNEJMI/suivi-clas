import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CheckCircleIcon, XCircle } from "lucide-react"

export function CompetencesAccordian() {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="bilan"
      className="max-w-lg w-full"
    >
      <AccordionItem value="bilan">
        <AccordionTrigger className="font-semibold text-lg">Bilan Global</AccordionTrigger>
        <AccordionContent>
            <div className="flex gap-2">
                <CheckCircleIcon className="text-green-500 size-10"/>
                <p className="">Bilal est un élève sérieux et ponctuel. Son autonomie s'est améliorée considérablement depuis le début de l'année.</p>
            </div>
            <div className="flex gap-2 mt-4">
                <XCircle className="text-red-500 size-10"/>
                <p>Bilal ne respecte pas toujours les consignes du silence et du calme pendant les séances, ce qui peut déranger les autres élèves.</p>
            </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="improvements">
        <AccordionTrigger className="font-semibold text-lg">Axes d'améliorations</AccordionTrigger>
        <AccordionContent>
            <ul className="">
                <li>- Travailler plus régulièrement les mathématiques chez soi.</li>
                <li>- Se faire un rappel pour ne pas oublier d'apporter tous le matériel nécessaire pour mener à bien ses révisions.</li>
                <li>- Mieux organiser ses cahiers pour gagner du temps dans la recherche des documents.</li>
            </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
