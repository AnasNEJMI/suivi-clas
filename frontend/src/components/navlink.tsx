import { cn } from '@/lib/utils'
import React from 'react'
import { Link } from 'react-router'

interface navLinkProps extends React.ComponentProps<typeof Link> {
    children : React.ReactNode,
    className ?: string,
}

const NavLink = ({children, className, ...props} : navLinkProps) => {
  return (
    <Link {...props} className={cn(className, 'text-xl font-bold py-2 w-full hover:bg-lime-100')}>
        {children}
    </Link>
  )
}

export default NavLink