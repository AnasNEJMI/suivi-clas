import type { User } from '@/api/auth'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils';

interface TabHeaderProps extends React.ComponentProps<"section"> {
    user : User,
    title : string,
    subTitle : string,
    description : string,
}
const TabHeader = ({user,description,subTitle,title, ...props} : TabHeaderProps) => {
    const isMobile = useIsMobile();
  return (
    <section {...props}>
        <div className={cn('flex flex-col', !isMobile && 'pt-8')}>
            {isMobile && <span className='text-xs font-light opacity-50'>{title} - {subTitle}</span>}
            <span className='font-bold md:text-3xl'>Bonjour <span>{user.firstName}</span> 👋 !</span>
            {!isMobile && <p className='opacity-50 max-w-xl text-balance leading-5'>{description}</p>}
        </div>
    </section>
  )
}

export default TabHeader