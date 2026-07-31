import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'

interface AnimatorCardProps {
    title : string,
    num : number,
    subTitle : string,
    date : string
}
const AnimatorCard = ({title, num, subTitle, date} : AnimatorCardProps) => {
  return (
    <Card className="@container/card w-full grow">
        <CardHeader>
          <CardDescription>{title}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {num}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {subTitle}
          </div>
          <div className="text-muted-foreground">
           {date}
          </div>
        </CardFooter>
      </Card>
  )
}

export default AnimatorCard