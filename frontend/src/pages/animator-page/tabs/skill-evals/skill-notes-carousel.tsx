import type { SkillEvalData } from '@/api/animator/skill-evals.types';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { SKILL_CAROUSEL_CARD_STYLES } from '@/lib/types/data.types';
import SkillCarouselCard from '@/pages/student-page/tabs/skill-evals/skill-carousel-card';
import { RotateCwFadingClockIcon } from 'lucide-react';

const AnimSkillNotesCarousel = ({skillEval} : {skillEval : SkillEvalData | null}) => {
    if(!skillEval) {
        return (
            <>
                <h3 className='mt-6 font-semibold text-lg lg:text-xl text-zinc-900'>Compétences Méthodologiques</h3>
                <Card className='border-2 border-dashed border-zinc-200 shadow-none h-64 flex flex-col items-center justify-center w-full rounded-xl bg-transparent mt-4 p-4'>
                    <CardHeader className='flex flex-col items-center justify-center w-full'>
                        <RotateCwFadingClockIcon className='size-10 opacity-70'/>
                        <CardTitle className='text-base font-medium opacity-70 text-center text-balance'>Aucune évaluation n'a encore été soumise pour le moment.</CardTitle>
                        <CardDescription className='text-pretty text-sm max-w-xl text-center'>les notes de l'évaluation seront affichées ici dès leur enregistrement.</CardDescription>
                    </CardHeader>   
                </Card>
            </>
        )
    }
    return (
    <div>
        <h3 className='mt-6 font-semibold text-lg lg:text-xl text-zinc-900'>Compétences Méthodologiques</h3>
        <Carousel
            opts={{align :'start'}}
            className='mt-2'
        >
            <CarouselContent className='-ml-4 pt-4'>
                <CarouselItem className="group pl-4 max-w-48 h-40 hover:-translate-y-1 transition-transform duration-100 ease-out">
                    <SkillCarouselCard cardStyle = {SKILL_CAROUSEL_CARD_STYLES['autonomy']}  score = {Math.round(skillEval.autonomy)}/>
                </CarouselItem>
                <CarouselItem className="group pl-4 max-w-48 h-40 hover:-translate-y-1 transition-transform duration-100 ease-out">
                    <SkillCarouselCard cardStyle = {SKILL_CAROUSEL_CARD_STYLES['discipline']}  score = {Math.round(skillEval.discipline )}/>
                </CarouselItem>
                <CarouselItem className="group pl-4 max-w-48 h-40 hover:-translate-y-1 transition-transform duration-100 ease-out">
                    <SkillCarouselCard cardStyle = {SKILL_CAROUSEL_CARD_STYLES['organisation']}  score = {Math.round(skillEval.organisation )}/>
                </CarouselItem>
                <CarouselItem className="group pl-4 max-w-48 h-40 hover:-translate-y-1 transition-transform duration-100 ease-out">
                    <SkillCarouselCard cardStyle = {SKILL_CAROUSEL_CARD_STYLES['ponctuality']}  score = {Math.round(skillEval.ponctuality )}/>
                </CarouselItem>
                <CarouselItem className="group pl-4 max-w-48 h-40 hover:-translate-y-1 transition-transform duration-100 ease-out">
                    <SkillCarouselCard cardStyle = {SKILL_CAROUSEL_CARD_STYLES['preparation']}  score = {Math.round(skillEval.preparation )}/>
                </CarouselItem>
                <CarouselItem className="group pl-4 max-w-48 h-40 hover:-translate-y-1 transition-transform duration-100 ease-out">
                    <SkillCarouselCard cardStyle = {SKILL_CAROUSEL_CARD_STYLES['regularity']}  score = {Math.round(skillEval.regularity )}/>
                </CarouselItem>
            </CarouselContent>
            <div className='mt-4 flex justify-between items-center'>
                <div>
                    <CarouselPrevious variant={'outline'}/>
                    <CarouselNext variant={'outline'}/>
                </div>
            </div>
        </Carousel>
    </div>
  )
}

export default AnimSkillNotesCarousel