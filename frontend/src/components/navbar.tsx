import NavLink from './navlink'
import { Popover, PopoverContent, PopoverTitle, PopoverTrigger } from './ui/popover'
import { MenuIcon, XIcon } from 'lucide-react'
import { Separator } from './ui/separator'
import { cn } from '@/lib/utils'

interface NavBarProps extends React.ComponentProps<'div'>{
    className ? : string,
}

const links = [
    {
        label : "A Propos",
        to : '/a-propos',
    },
    {
        label : "Contact",
        to : '/contact',
    },
]

const usefulLinks = [
    {
        label : "Cours",
        to : '/liens/cours',
    },
    {
        label : "Exercices",
        to : '/liens/exercices',
    },
    {
        label : "Fiches",
        to : '/liens/fiches',
    },
]

const NavBar = ({className, ...props} : NavBarProps) => {
  return (
    <Popover {...props}>
        <PopoverTrigger className='group size-12 md:size-16 rounded-lg  data-[state=open]:bg-lime-100 data-[state=closed]:bg-lime-200 flex items-center justify-center md:hidden'>
            <MenuIcon className='size-6 group-data-[state=open]:hidden'/>
            <XIcon className='size-6 group-data-[state=closed]:hidden'/>
        </PopoverTrigger>
        <PopoverContent align='end' className={cn('bg-lime-200 translate-x-2 w-80', className)}>
            <PopoverTitle className='opacity-50 text-sm mt-4'>NAVIGATION</PopoverTitle>
            <ul className='my-2 flex flex-col '>
            {
                links.map((link, index) => (
                    <NavLink key = {index} to = {link.to} className='pl-4 rounded-lg'>{link.label}</NavLink>
                ))
            }
            </ul>
            <Separator className='bg-lime-100 my-4'/>
            <PopoverTitle className='opacity-50 text-sm mt-4'>LIENS UTILES</PopoverTitle>
            <ul className='my-2 flex flex-col'>
            {
                usefulLinks.map((usefulLink, index) => (
                    <NavLink key = {index} to = {usefulLink.to} className='pl-4 rounded-lg'>{usefulLink.label}</NavLink>
                ))
            }
            </ul>

            
        </PopoverContent>
    </Popover>
  )
}

export default NavBar