import type { SkillCarouselCardStyle } from '@/lib/types/data.types'
import { cn } from '@/lib/utils'

const SkillCarouselCard = ({cardStyle, score}:{cardStyle : SkillCarouselCardStyle, score : number}) => {
  return (
    <div className={cn(`rounded-xl w-full h-full p-4 font-outfit flex flex-col items-center justify-between group-hover:border`, cardStyle.borderColor, cardStyle.bgColor)}>
        <cardStyle.icon className={cn('size-6', cardStyle.highlightTextColor)}/>
        <span className={cn('text-3xl font-bold', cardStyle.highlightTextColor)}>{score}/20</span>
        <h3 className='text-sm tracking-tight opacity-75'>{cardStyle.label}</h3>
    </div>
  )
}

export default SkillCarouselCard