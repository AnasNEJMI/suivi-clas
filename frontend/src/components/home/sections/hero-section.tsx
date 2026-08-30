import { Button } from '../../ui/button'
import { Link } from 'react-router'
const organisation = 'Fleurs du Lys'
const title = 'Bienvenue au pôle scientifique'
const desc = 'Cet espace est dédié au suivi des séances du pôle scientifique de Fleurs du Lys, vous offrant des bilans, des supports et de la méthodologie afin de mieux aborder vos révisions et vos éxamens.'


const HeroSection = () => {
  return (
    <section className="w-full h-[calc(100dvh+6rem)] rounded-b-[4rem] lg:rounded-b-[6rem] overflow-hidden pt-28 lg:pt-20 flex flex-col items-center justify-center bg-lime-300 px-6">
        <div className='flex flex-col justify-start items-center lg:flex-row lg:justify-between lg:items-start max-w-7xl gap-24 lg:gap-12 pb-6'>
            <div className='flex flex-col items-center lg:items-start'>
                <span className="bg-lime-100 py-1 px-4 font-bold text-lime-600 text-lg rounded-full border border-lime-300">{organisation}</span>
                <h1 className="text-4xl lg:text-5xl font-bold mt-4 text-center lg:text-start">{title}</h1>
                <p className="max-w-xl font-regular text-lg font-medium mt-6 text-balance text-center lg:text-start opacity-75">{desc}</p>
                <Link to='/a-propos' className='mt-8'>
                    <Button className='text-lg py-6 px-8'>À propos de nous</Button>
                </Link>
            </div>
        </div>
        
    </section>
  )
}

export default HeroSection