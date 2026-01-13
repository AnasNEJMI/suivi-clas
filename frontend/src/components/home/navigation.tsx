import { routes } from "@/lib/data"
import { NavLink } from "react-router"

const Navigation = () => {
  return (
    <header className='fixed z-20 top-0 left-0 w-full py-4 px-6 bg-red-200'>
      <nav className='flex items-center justify-between w-full'>
        <NavLink to={'/'}>
          <div className='p-4 rounded-lg flex items-center justify-center font-secondary bg-white'></div>
        </NavLink>
        <ul className='hidden lg:flex items-center justify-center gap-8 font-serif'>
            {
                routes.map((route, index) => ( 
                    <li key={index}>
                        <NavLink to={route.path}>
                          {route.name}
                        </NavLink>
                    </li>
                ))
            }
        </ul>
      </nav>
    </header>
  )
}

export default Navigation