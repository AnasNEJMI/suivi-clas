import { Separator } from "@/components/ui/separator";
import { School } from "lucide-react";

const footerLinks = {
  Plateforme: ['À Propos', 'Notre méthode'],
  Contact:    ['Nous contacter', 'Mentions légales'],
}

function FooterSection() {
  return (
    <footer className='px-6 mt-24 mb-6 w-full max-w-7xl'>
        <div className="bg-zinc-900 rounded-[1.5rem] md:rounded-[3rem] px-6 md:px-12 pt-16 pb-6">
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                    <div className='mb-2 flex items-center gap-2'>
                        <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white'>
                        <School className='h-4 w-4 text-white' aria-hidden />
                        </div>
                        <span className='text-xl font-medium text-zinc-200'>Suivi CLAS</span>
                    </div>
                    <p className=' md:max-w-72 text-sm md:text-base leading-[1.55] text-white/65'>
                        La plateforme qui réunit animateurs, élèves et associations autour d'un accompagnement scolaire de qualité.
                    </p>
                </div>
                <div className="flex justify-evenly items-center">
                    {Object.entries(footerLinks).map(([heading, links]) => (
                    <div key={heading} className="flex-1">
                        <h4 className='mb-2.5 text-sm md:text-base font-medium uppercase tracking-[.7px] text-white/90'>
                        {heading}
                        </h4>
                        {links.map((l) => (
                        <a key={l} href='#' className='mb-1.5 block text-xs md:text-sm text-white/75 font-medium transition-colors hover:text-white/90'>
                            {l}
                        </a>
                        ))}
                    </div>
                    ))}
                </div>
            </div>
            <Separator className="mt-12 opacity-20"/>
            <p className='mt-12 text-white/75 text-sm font-bold flex justify-between'>
                <span>Droits réservés © 2026</span>
                <span>Conçu par Anas NEJMI</span>
            </p>
        </div>
    </footer>
  )
}

export default FooterSection;