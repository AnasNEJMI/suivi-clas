import type { Animator, AnimatorBaseDataResponse, ScolarYearEntry } from '@/api/animator/types';
import AnimatorCard from '@/components/animator-card';
import { BrandButton } from '@/components/brand-button';
import ScolarYearDropdown from '@/components/brand-dropdown';
import { SiteHeader } from '@/components/site-header'
import { useMemo, useState } from 'react';
import { Link, useRouteLoaderData } from 'react-router';


const AnimatorWelcome = () => {
  const {animator, baseData} = useRouteLoaderData("animator") as {animator : Animator, baseData : AnimatorBaseDataResponse};
  const [selectedScolarYear, setSelectedScolarYear] = useState<ScolarYearEntry>(baseData.scolarYears[0])
  
  const numSeances = useMemo(() =>{
    //todo 
    const num = 5
    return num;

  }, [selectedScolarYear])

  const numBilans = useMemo(() =>{
    //todo 
    const num = 5
    return num;

  }, [selectedScolarYear])
  
  return (
    <>
        <SiteHeader title='Tableau de bord'/>
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-6">
                <h1 className='font-semibold text-3xl md:text-4xl mt-4'>Bienvenue {animator.firstName} !👋</h1>
                <div className=' mt-12'>
                  <div className=' flex justify-between items-center'>
                    <h2 className='text-xl md:text-2xl font-bold'>Année scolaire</h2>
                    {
                        baseData.scolarYears.length > 0 &&
                        <ScolarYearDropdown scolarYears = {baseData.scolarYears} selectedValue={selectedScolarYear.label} onValueChange = {setSelectedScolarYear}/>
                    }
                  </div>
                  <div className='flex items-center justify-center gap-6 w-full mt-6 flex-col lg:flex-row'>
                    <AnimatorCard
                      title = 'Nombre de séances réalisées'
                      num = {numSeances}
                      subTitle = 'Dernière séance réalisée'
                      date = '03/05/2026'
                    />
                    <AnimatorCard
                      title = 'Nombre de bilans réalisés'
                      num = {numBilans}
                      subTitle = 'Dernier bilan soumis'
                      date = '03/05/2026' 
                    />
                  </div>
                </div>
                {/* <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
                </div>
                <DataTable data={data} /> */}

                <div className='mt-12'>
                  <h2 className='text-xl md:text-2xl font-bold'>Liens</h2>
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-2  mt-6'>
                    <Link to='/animateur/bilans' className='w-full'>
                        <BrandButton size='default' className='w-full py-8 text-lg  cursor-pointer'>
                            Soumettre une séance/bilan
                        </BrandButton>
                    </Link>
                    <Link to='/animateur/skills' className='w-full'>
                        <BrandButton size='default' className='w-full py-8 text-lg  cursor-pointer'>
                            Modifier des compétences
                        </BrandButton>
                    </Link>
                    <Link to='/animateur/bilans' className='w-full'>
                        <BrandButton size='default' className='w-full py-8 text-lg  cursor-pointer'>
                            Soumettre une observation
                        </BrandButton>
                    </Link>
                    <Link to='/animateur/bilans' className='w-full'>
                        <BrandButton size='default' className='w-full py-8 text-lg  cursor-pointer'>
                            Soumettre un lien de support
                        </BrandButton>
                    </Link>
                  </div>
                </div>
            </div>
            </div>
        </div>
    </>
  )
}

export default AnimatorWelcome