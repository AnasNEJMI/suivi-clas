import type { User } from '@/api/auth'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils';

interface TabHeader extends React.ComponentProps<"section"> {
    student : User,
    description : string
    tabLabel : string,
}
const TabHeader = ({student,description,tabLabel, ...props} : TabHeader) => {
    const isMobile = useIsMobile();
  return (
    <section {...props}>
        <div className={cn('flex flex-col', !isMobile && 'pt-8')}>
            {isMobile && <span className='text-xs font-light opacity-50'>Éspace Étudiant - {tabLabel}</span>}
            <span className='font-bold md:text-3xl'>Bonjour <span>{student.firstName}</span> 👋 !</span>
            {!isMobile && <p className='opacity-50 max-w-xl text-balance leading-5'>{description}</p>}
        </div>
    </section>
  )
}

export default TabHeader