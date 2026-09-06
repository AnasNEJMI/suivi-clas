import type { SkillsEvalEntry } from '@/api/student/apiCalls';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import SkillCarouselCard from './skill-carousel-card';
import {RotateCwFadingClockIcon} from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SKILL_CAROUSEL_CARD_STYLES } from '@/lib/types/data.types';

const SkillCarousel = ({skillsEvals} : {skillsEvals : SkillsEvalEntry[]}) => {
    
    if(skillsEvals.length === 0) {
        return (
            <>
                <h3 className='mt-6 font-semibold text-lg lg:text-xl text-zinc-900'>Compétences Méthodologiques</h3>
                <Card className='border-2 mt-4 border-dashed border-zinc-200 shadow-none h-64 flex flex-col items-center justify-center w-full rounded-xl bg-transparent p-4'>
                    <CardHeader className='flex flex-col items-center justify-center w-full'>
                        <RotateCwFadingClockIcon className='size-10 opacity-70'/>
                        <CardTitle className='text-base font-medium opacity-70 text-center text-balance'>Aucune évaluation de méthodologie n'est enregistrée pour le moment.</CardTitle>
                        <CardDescription className='text-pretty text-sm max-w-xl text-center'>Une fois les évaluations soumises, vous découvrirez votre moyenne sur chacunes des compétences évaluées.</CardDescription>
                    </CardHeader>
                </Card>
            </>
        )
    }


    const skillEvalTotal : SkillsEvalEntry = {...skillsEvals[0]};

    for (let i = 1; i < skillsEvals.length; i++) {
        const skillsEval = skillsEvals[i];
        skillEvalTotal.autonomy += skillsEval.autonomy;
        skillEvalTotal.discipline += skillsEval.discipline;
        skillEvalTotal.organisation += skillsEval.organisation;
        skillEvalTotal.ponctuality += skillsEval.ponctuality;
        skillEvalTotal.preparation += skillsEval.preparation;
        skillEvalTotal.regularity += skillsEval.regularity;
    }

  return (
    <>
        <h3 className='mt-6 font-semibold text-lg lg:text-xl text-zinc-900'>Compétences Méthodologiques</h3>
        <Carousel
            opts={{align :'start'}}
            className='mt-2'
        >
            <CarouselContent className='-ml-4 pt-4'>
                <CarouselItem className="group pl-4 max-w-48 h-40 hover:-translate-y-1 transition-transform duration-100 ease-out">
                    <SkillCarouselCard cardStyle = {SKILL_CAROUSEL_CARD_STYLES['autonomy']}  score = {Math.round(skillEvalTotal.autonomy/skillsEvals.length)}/>
                </CarouselItem>
                <CarouselItem className="group pl-4 max-w-48 h-40 hover:-translate-y-1 transition-transform duration-100 ease-out">
                    <SkillCarouselCard cardStyle = {SKILL_CAROUSEL_CARD_STYLES['discipline']}  score = {Math.round(skillEvalTotal.discipline/skillsEvals.length)}/>
                </CarouselItem>
                <CarouselItem className="group pl-4 max-w-48 h-40 hover:-translate-y-1 transition-transform duration-100 ease-out">
                    <SkillCarouselCard cardStyle = {SKILL_CAROUSEL_CARD_STYLES['organisation']}  score = {Math.round(skillEvalTotal.organisation/skillsEvals.length)}/>
                </CarouselItem>
                <CarouselItem className="group pl-4 max-w-48 h-40 hover:-translate-y-1 transition-transform duration-100 ease-out">
                    <SkillCarouselCard cardStyle = {SKILL_CAROUSEL_CARD_STYLES['ponctuality']}  score = {Math.round(skillEvalTotal.ponctuality/skillsEvals.length)}/>
                </CarouselItem>
                <CarouselItem className="group pl-4 max-w-48 h-40 hover:-translate-y-1 transition-transform duration-100 ease-out">
                    <SkillCarouselCard cardStyle = {SKILL_CAROUSEL_CARD_STYLES['preparation']}  score = {Math.round(skillEvalTotal.preparation/skillsEvals.length)}/>
                </CarouselItem>
                <CarouselItem className="group pl-4 max-w-48 h-40 hover:-translate-y-1 transition-transform duration-100 ease-out">
                    <SkillCarouselCard cardStyle = {SKILL_CAROUSEL_CARD_STYLES['regularity']}  score = {Math.round(skillEvalTotal.regularity/skillsEvals.length)}/>
                </CarouselItem>
            </CarouselContent>
            <div className='mt-4 flex justify-between items-center'>
                <div>
                    <CarouselPrevious variant={'outline'}/>
                    <CarouselNext variant={'outline'}/>
                </div>
            </div>
        </Carousel>
    </>
  )
}

export default SkillCarousel